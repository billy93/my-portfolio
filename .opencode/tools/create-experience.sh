#!/bin/bash
# OpenCode Tool: Create a new experience entry
# description: Create a new work experience entry
# arguments: company, role, description, startDate (YYYY-MM-DD), endDate (YYYY-MM-DD or empty), current (true/false)

API_URL="${PORTFOLIO_URL:-http://localhost:3000}"
API_KEY="${PORTFOLIO_API_KEY}"

COMPANY="${1:?Usage: create-experience <company> <role> <description> <startDate> [endDate] [current]}"
ROLE="${2:?Missing role}"
DESCRIPTION="${3:?Missing description}"
START_DATE="${4:?Missing startDate (YYYY-MM-DD)}"
END_DATE="${5:-}"
CURRENT="${6:-false}"

BODY=$(python3 -c "
import json
data = {
    'company': '''$COMPANY''',
    'role': '''$ROLE''',
    'description': '''$DESCRIPTION''',
    'startDate': '${START_DATE}T00:00:00.000Z',
    'current': '$CURRENT' == 'true'
}
if '''$END_DATE''':
    data['endDate'] = '${END_DATE}T00:00:00.000Z'
print(json.dumps(data))
")

response=$(curl -s -X POST \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d "$BODY" \
  "$API_URL/api/experience")

echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
