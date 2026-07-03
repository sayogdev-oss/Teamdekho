# pip3 install requests
import requests
import json

API_KEY_SECRET = "teamdekhosfu_default_secret"
TeamDekho_URL = "https://sfu.teamdekho.com/api/v1/meeting"
# TeamDekho_URL = "http://localhost:3010/api/v1/meeting"

ROOM = "test"

headers = {
    "authorization": API_KEY_SECRET,
    "Content-Type": "application/json",
}

# Optional: redirect URL (leave empty for home page)
data = {
    # "redirect": "https://example.com/meeting-ended",
}

response = requests.delete(
    f"{TeamDekho_URL}/{ROOM}",
    headers=headers,
    json=data
)

print("Status code:", response.status_code)
data = json.loads(response.text)
print("result:", data)
