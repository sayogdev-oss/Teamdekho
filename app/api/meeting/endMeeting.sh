#!/bin/bash

API_KEY_SECRET="teamdekhosfu_default_secret"
TeamDekho_URL="https://sfu.teamdekho.com/api/v1/meeting"
# TeamDekho_URL="http://localhost:3010/api/v1/meeting"

ROOM="test"

# Optional: redirect URL (leave empty object for home page)
# BODY='{"redirect": "https://example.com/meeting-ended"}'
BODY='{}'

curl "$TeamDekho_URL/$ROOM" \
    --header "authorization: $API_KEY_SECRET" \
    --header "Content-Type: application/json" \
    --data "$BODY" \
    --request DELETE
