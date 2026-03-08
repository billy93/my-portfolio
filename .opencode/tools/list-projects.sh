#!/bin/bash
# OpenCode Tool: List all portfolio projects
# description: List all projects in the portfolio
# arguments: none

API_URL="${PORTFOLIO_URL:-http://localhost:3000}"
API_KEY="${PORTFOLIO_API_KEY}"

response=$(curl -s -H "Authorization: Bearer $API_KEY" "$API_URL/api/projects")
echo "$response" | python3 -m json.tool 2>/dev/null || echo "$response"
