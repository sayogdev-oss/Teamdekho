#!/bin/bash

# Configuration
API_KEY_SECRET="teamdekhosfu_default_secret"
TeamDekho_URL="https://sfu.teamdekho.com/api/v1/join"
# Alternative URL for local testing:
# TeamDekho_URL="http://localhost:3010/api/v1/join"

# Request data with proper JSON formatting
REQUEST_DATA='{
    "room": "test",
    "roomPassword": false,
    "name": "teamdekhosfu",
    "avatar": false,
    "audio": false,
    "video": false,
    "screen": false,
    "chat": false,
    "hide": false,
    "notify": true,
    "duration": "unlimited",
    "token": {
        "username": "username",
        "password": "password",
        "presenter": true,
        "expire": "1h"
    }
}'

# Make the API request
curl -X POST "$TeamDekho_URL" \
    -H "Authorization: $API_KEY_SECRET" \
    -H "Content-Type: application/json" \
    -d "$REQUEST_DATA"