#!/bin/bash
# OpenCode Tool: Get or update profile
# description: Get the current profile or update it with JSON fields
# arguments: [json-fields] - if provided, updates profile; if omitted, gets profile

API_URL="${PORTFOLIO_URL:-http://localhost:3000}"
API_KEY="${PORTFOLIO_API_KEY}"

if [ -z "$1" ]; then
  # GET profile
  response=$(curl -s -H "Authorization: Bearer $API_KEY" "$API_URL/api/profile")
else
  # PUT profile update
  response=$(curl -s -X PUT \
    -H "Authorization: Bearer $API_KEY" \
    -H "Content-Type: application/json" \
    -d "$1" \
    "$API_URL/api/profile")
fi

echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
