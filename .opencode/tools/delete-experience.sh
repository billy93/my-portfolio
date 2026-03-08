#!/bin/bash
# OpenCode Tool: Delete an experience entry
# description: Delete an experience entry by ID
# arguments: id

API_URL="${PORTFOLIO_URL:-http://localhost:3000}"
API_KEY="${PORTFOLIO_API_KEY}"

ID="${1:?Usage: delete-experience <id>}"

response=$(curl -s -X DELETE \
  -H "Authorization: Bearer $API_KEY" \
  "$API_URL/api/experience/$ID")

echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
