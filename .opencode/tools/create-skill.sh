#!/bin/bash
# OpenCode Tool: Create a new skill
# description: Create a new skill entry
# arguments: name, category (FRONTEND|BACKEND|MOBILE|DEVOPS|TOOLS), proficiency (0-100)

API_URL="${PORTFOLIO_URL:-http://localhost:3000}"
API_KEY="${PORTFOLIO_API_KEY}"

NAME="${1:?Usage: create-skill <name> <category> [proficiency]}"
CATEGORY="${2:?Missing category (FRONTEND|BACKEND|MOBILE|DEVOPS|TOOLS)}"
PROFICIENCY="${3:-80}"

BODY=$(python3 -c "
import json
print(json.dumps({
    'name': '''$NAME''',
    'category': '''$CATEGORY''',
    'proficiency': int('$PROFICIENCY')
}))
")

response=$(curl -s -X POST \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d "$BODY" \
  "$API_URL/api/skills")

echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
