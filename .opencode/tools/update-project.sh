#!/bin/bash
# OpenCode Tool: Update a project
# description: Update an existing portfolio project by ID
# arguments: id, fields as JSON

API_URL="${PORTFOLIO_URL:-http://localhost:3000}"
API_KEY="${PORTFOLIO_API_KEY}"

ID="${1:?Usage: update-project <id> <json-fields>}"
FIELDS="${2:?Missing JSON fields, e.g. '{\"title\":\"New Title\"}'}"

response=$(curl -s -X PUT \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d "$FIELDS" \
  "$API_URL/api/projects/$ID")

echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
