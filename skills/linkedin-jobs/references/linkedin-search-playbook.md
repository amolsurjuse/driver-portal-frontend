# LinkedIn Search Playbook

## Query Construction
Build each query from four blocks:
1. Title block: primary and adjacent titles.
2. Skill block: stack, tools, or methodologies.
3. Domain block: industry terms.
4. Exclusion block: unwanted roles or industries.

Pattern:
`("title1" OR "title2") AND (skill1 OR skill2) AND (domain1 OR domain2) NOT (exclude1 OR exclude2)`

## Starter Queries
1. Core title query:
`("Senior Backend Engineer" OR "Backend Engineer") AND (Java OR Spring Boot OR Kafka)`

2. Domain-focused query:
`("Backend Engineer" OR "Platform Engineer") AND (payments OR fintech) AND (microservices)`

3. Stretch query:
`("Software Engineer" OR "Platform Engineer") AND (distributed systems) AND (AWS OR GCP)`

## Filter Strategy
Apply filters in this order:
1. Date posted (`Past 24 hours` then `Past week`)
2. Location + remote preference
3. Experience level
4. Company size/type (if user preference exists)

## Result Triage
Tag each result:
- `A`: strong fit, apply now
- `B`: viable fit, apply after tailoring
- `C`: low fit or unclear, park

Promote only `A` and best `B` roles to scoring.
