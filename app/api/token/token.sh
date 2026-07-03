#!/bin/bash

API_KEY_SECRET="teamdekhosfu_default_secret"
TeamDekho_URL="https://sfu.teamdekho.com/api/v1/token"
#TeamDekho_URL="http://localhost:3010/api/v1/token"

curl $TeamDekho_URL \
    --header "authorization: $API_KEY_SECRET" \
    --header "Content-Type: application/json" \
    --data '{"username":"username","password":"password","presenter":"true", "expire":"1h"}' \
    --request POST