#!/bin/bash

# Fetch API key from environment variables
API_KEY="$OPENAI"

if [ -z "$API_KEY" ]; then
  echo "Error: OPENAI_API_KEY is not set. Please set it in your environment variables."
  exit 1
fi

# Make a GET request to OpenAI's API to fetch engines
curl -X GET "https://api.openai.com/v1/engines" \
-H "Authorization: Bearer $API_KEY"
