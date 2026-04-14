# Role Fit Scoring

Score each role on a 100-point rubric.

## Rubric
- Title and seniority alignment: 20
- Must-have skill match: 25
- Domain relevance: 15
- Location/work-mode fit: 10
- Compensation fit (if known): 10
- Achievement evidence match (resume proof): 15
- Application friction (visa, travel, clearance): 5

## Thresholds
- 80 to 100: Priority target
- 60 to 79: Secondary target
- Below 60: Skip unless user wants stretch roles

## Quick Scoring Procedure
1. Extract 5 to 8 explicit requirements from the job post.
2. Map each requirement to resume evidence.
3. Assign a score with one-line rationale per rubric category.
4. Compute total and confidence (`high`, `medium`, `low`).

## Output Format
Use this compact structure:

- `Role:`
- `Score:`
- `Confidence:`
- `Top strengths:`
- `Top gaps:`
- `Decision:` Apply now | Apply after edits | Skip
