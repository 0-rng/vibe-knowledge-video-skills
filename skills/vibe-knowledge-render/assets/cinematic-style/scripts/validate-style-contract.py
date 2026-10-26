"""Validate technical shot structure, never taste or historical image approval."""
import argparse
import json
import math
from pathlib import Path


def number(x):
    return isinstance(x, (int, float)) and not isinstance(x, bool) and math.isfinite(x)


def validate(data, for_full_video=False):
    # Keep the old argument for callers; image-approval gates were retired by user.
    errors = []
    if not isinstance(data, dict):
        return ['Plan must be an object']
    project = data.get('project', {})
    if not isinstance(project, dict):
        return ['project must be an object']
    for key in ['width', 'height', 'fps']:
        value = project.get(key)
        if not number(value) or value <= 0 or (key != 'fps' and not isinstance(value, int)):
            errors.append(f'project.{key}: positive {"integer" if key != "fps" else "number"} required')
    if errors:
        return errors
    width, height = project['width'], project['height']
    if not isinstance(project.get('styleVersion'), str) or not project['styleVersion'].strip():
        errors.append('project.styleVersion: record the applicable style version')
    if not isinstance(project.get('chineseFont'), str) or not project['chineseFont'].strip():
        errors.append('project.chineseFont: explicit real font required')
    if project.get('textRendering') not in {'live-html-svg', 'live-canvas', 'live-fonts'}:
        errors.append('Text must use real fonts in HTML/SVG/Canvas')
    # No keyframeReview check, mandatory scene template, metaphor or changed background.
    shots = data.get('shots', [])
    if not isinstance(shots, list) or not shots:
        return errors + ['No independent shot plans']
    ids = set()
    for i, shot in enumerate(shots):
        where = f'shots[{i}]'
        if not isinstance(shot, dict):
            errors.append(f'{where}: object required')
            continue
        sid = shot.get('id')
        if not isinstance(sid, str) or not sid.strip() or sid in ids:
            errors.append(f'{where}: missing/duplicate ID')
        else:
            ids.add(sid)
        for key in ['space', 'subject']:
            if not isinstance(shot.get(key), str) or not shot[key].strip():
                errors.append(f'{where}: missing {key}')
        composition = shot.get('composition', {})
        if not isinstance(composition, dict):
            errors.append(f'{where}: composition must be an object')
            composition = {}
        for field in ['textSafeRect', 'subjectRect']:
            rect = composition.get(field, [])
            if not isinstance(rect, list) or len(rect) != 4 or not all(number(x) for x in rect):
                errors.append(f'{where}: invalid {field}')
                continue
            x, y, w, h = rect
            if x < 0 or y < 0 or w <= 0 or h <= 0 or x + w > width or y + h > height:
                errors.append(f'{where}: {field} out of frame')
        duration = shot.get('durationSeconds', 0)
        if not number(duration) or duration <= 0:
            errors.append(f'{where}: positive duration required')
            duration = 0
        events = shot.get('temporal', [])
        if not isinstance(events, list) or not events:
            errors.append(f'{where}: no temporal design')
            events = []
        for event in events:
            if not isinstance(event, dict):
                errors.append(f'{where}: temporal event must be an object')
                continue
            start, end = event.get('start'), event.get('end')
            if not number(start) or not number(end) or not 0 <= start < end <= duration:
                errors.append(f'{where}: event outside shot or invalid timing')
            if not isinstance(event.get('action'), str) or not event['action'].strip():
                errors.append(f'{where}: empty temporal action')
        if shot.get('generatedText', False):
            errors.append(f'{where}: generated image text is forbidden')
        if shot.get('dataStatus') == 'sourced' and not shot.get('dataSources'):
            errors.append(f'{where}: missing data source')
        if shot.get('dataStatus') == 'illustrative' and not shot.get('illustrativeLabel'):
            errors.append(f'{where}: illustrative data must be labeled')
    return errors


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('plan', type=Path)
    parser.add_argument('--for-full-video', action='store_true', help='Compatibility flag; no fixed-image approval gate')
    args = parser.parse_args()
    try:
        errors = validate(json.loads(args.plan.read_text()), args.for_full_video)
    except (OSError, ValueError, TypeError, KeyError, AttributeError) as exc:
        errors = [f'Invalid plan structure: {exc}']
    if errors:
        print('\n'.join(errors))
        raise SystemExit(1)
    print('Shot structure valid. Historical image approvals are not gates; creative authorization and actual media review remain separate.')
