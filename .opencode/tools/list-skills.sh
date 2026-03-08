#!/bin/bash
# OpenCode Tool: List all skills
# description: List all skills in the portfolio
# arguments: none

API_URL="${PORTFOLIO_URL:-http://localhost:3000}"
API_KEY="${PORTFOLIO_API_KEY}"

response=$(curl -s -H "Authorization: Bearer $API_KEY" "$API_URL/api/skills")
echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
