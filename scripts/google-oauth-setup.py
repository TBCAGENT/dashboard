#!/usr/bin/env python3
"""
Google OAuth Setup for Arthur (arthur@blackboxalchemist.com)
Handles Calendar, Drive, and Gmail API access in one flow.

Usage:
  1. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET env vars
  2. Run: python3 google-oauth-setup.py
  3. Authorize in browser when prompted
  4. Credentials saved to ~/.config/google-arthur/credentials.json
"""

import os
import sys
import json

try:
    from google_auth_oauthlib.flow import InstalledAppFlow
except ImportError:
    print("Installing required packages...")
    os.system("pip3 install --user google-auth google-auth-oauthlib google-api-python-client")
    from google_auth_oauthlib.flow import InstalledAppFlow

SCOPES = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/gmail.readonly',
    'https://www.googleapis.com/auth/gmail.send',
]

CREDS_DIR = os.path.expanduser('~/.config/google-arthur')
CREDS_FILE = os.path.join(CREDS_DIR, 'credentials.json')
SECRETS_ENV = os.path.join(CREDS_DIR, 'secrets.env')

def main():
    client_id = os.getenv('GOOGLE_CLIENT_ID')
    client_secret = os.getenv('GOOGLE_CLIENT_SECRET')

    if not client_id or not client_secret:
        print("""
ERROR: Missing Google OAuth credentials.

To set up:
1. Go to https://console.cloud.google.com/
2. Create a new project (or use existing)
3. Enable these APIs:
   - Google Calendar API
   - Google Drive API
   - Gmail API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
   - Application type: Desktop app
   - Name: Arthur AI Assistant
5. Copy the Client ID and Client Secret
6. Run:
   export GOOGLE_CLIENT_ID='your-client-id'
   export GOOGLE_CLIENT_SECRET='your-client-secret'
   python3 google-oauth-setup.py
""")
        sys.exit(1)

    os.makedirs(CREDS_DIR, exist_ok=True)
    os.chmod(CREDS_DIR, 0o700)

    client_config = {
        "installed": {
            "client_id": client_id,
            "client_secret": client_secret,
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "redirect_uris": ["http://localhost"]
        }
    }

    print(f"Starting OAuth flow for arthur@blackboxalchemist.com...")
    print(f"Requesting access to: Calendar, Drive, Gmail")
    print(f"A browser window will open — sign in with arthur@blackboxalchemist.com\n")

    flow = InstalledAppFlow.from_client_config(client_config, SCOPES)
    creds = flow.run_local_server(port=0, login_hint="arthur@blackboxalchemist.com")

    # Save full credentials
    creds_data = {
        "client_id": client_id,
        "client_secret": client_secret,
        "refresh_token": creds.refresh_token,
        "token": creds.token,
        "token_uri": "https://oauth2.googleapis.com/token",
        "scopes": SCOPES,
        "account": "arthur@blackboxalchemist.com"
    }

    with open(CREDS_FILE, 'w') as f:
        json.dump(creds_data, f, indent=2)
    os.chmod(CREDS_FILE, 0o600)

    # Save as env vars for the google-calendar skill
    with open(SECRETS_ENV, 'w') as f:
        f.write(f"export GOOGLE_CLIENT_ID='{client_id}'\n")
        f.write(f"export GOOGLE_CLIENT_SECRET='{client_secret}'\n")
        f.write(f"export GOOGLE_REFRESH_TOKEN='{creds.refresh_token}'\n")
        f.write(f"export GOOGLE_ACCESS_TOKEN='{creds.token}'\n")
        f.write(f"export GOOGLE_CALENDAR_ID='primary'\n")
    os.chmod(SECRETS_ENV, 0o600)

    # Also save for gcalcli config
    gcalcli_dir = os.path.expanduser('~/.config/gcalcli')
    os.makedirs(gcalcli_dir, exist_ok=True)
    gcalcli_oauth = os.path.join(gcalcli_dir, 'oauth')
    with open(gcalcli_oauth, 'w') as f:
        json.dump({
            "client_id": client_id,
            "client_secret": client_secret,
            "refresh_token": creds.refresh_token,
            "token": creds.token,
            "token_uri": "https://oauth2.googleapis.com/token",
        }, f, indent=2)
    os.chmod(gcalcli_oauth, 0o600)

    print(f"\nSuccess! Credentials saved to:")
    print(f"  {CREDS_FILE}")
    print(f"  {SECRETS_ENV}")
    print(f"\nArthur now has access to:")
    print(f"  - Google Calendar (read/write)")
    print(f"  - Google Drive (read/write)")
    print(f"  - Gmail API (read/send)")
    print(f"\nTo load in shell: source {SECRETS_ENV}")
    print(f"\nFor OpenClaw, run:")
    print(f"  openclaw secret set GOOGLE_CLIENT_ID '{client_id}'")
    print(f"  openclaw secret set GOOGLE_CLIENT_SECRET '{client_secret}'")
    print(f"  openclaw secret set GOOGLE_REFRESH_TOKEN '{creds.refresh_token}'")

if __name__ == '__main__':
    main()
