#!/bin/bash
# OpenCode Tool: Create a new project
# description: Create a new portfolio project
# arguments: title, description, techStack (comma-separated), liveUrl, repoUrl, featured

API_URL="${PORTFOLIO_URL:-http://localhost:3000}"
API_KEY="${PORTFOLIO_API_KEY}"

TITLE="${1:?Usage: create-project <title> <description> [techStack] [liveUrl] [repoUrl] [featured]}"
DESCRIPTION="${2:?Missing description}"
TECH_STACK="${3:-}"
LIVE_URL="${4:-}"
REPO_URL="${5:-}"
FEATURED="${6:-false}"

# Convert comma-separated tech stack to JSON array
if [ -n "$TECH_STACK" ]; then
  TECH_JSON=$(echo "$TECH_STACK" | python3 -c "import sys,json; print(json.dumps([s.strip() for s in sys.stdin.read().strip().split(',')]))")
else
  TECH_JSON="[]"
fi

BODY=$(python3 -c "
import json
print(json.dumps({
    'title': '''$TITLE''',
    'description': '''$DESCRIPTION''',
    'techStack': $TECH_JSON,
    'liveUrl': '''$LIVE_URL''',
    'repoUrl': '''$REPO_URL''',
    'featured': $FEATURED == 'true'
}))
")

response=$(curl -s -X POST \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d "$BODY" \
  "$API_URL/api/projects")

echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
