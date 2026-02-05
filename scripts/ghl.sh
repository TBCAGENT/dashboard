#!/bin/bash
# GoHighLevel API helper script
# Usage: ghl.sh <command> [options]
#
# Commands:
#   contacts list [--limit N] [--query "search"]
#   contacts get <contactId>
#   contacts create --name "First Last" [--email "x"] [--phone "+1..."] [--tags "a,b"]
#   contacts update <contactId> [--name "x"] [--email "x"] [--phone "x"] [--tags "a,b"]
#   contacts delete <contactId>
#   contacts search "query"
#   message send <contactId> --body "text" [--type SMS|Email]
#   conversations list [--contactId <id>] [--limit N]
#   conversations get <conversationId>
#   pipelines list
#   opportunities list [--pipelineId <id>]
#   opportunities create --pipelineId <id> --stageId <id> --contactId <id> --name "Deal" [--value 1000]
#   calendars list
#   calendars slots <calendarId> --start "2026-02-05" --end "2026-02-06"
#   tags list
#   tags create --name "Tag Name"
#   custom-fields list
#   raw <METHOD> <path> [json body]

set -euo pipefail

source ~/.config/gohighlevel/secrets.env

API="$GHL_BASE_URL"
TOKEN="$GHL_API_KEY"
LOC="$GHL_LOCATION_ID"
VERSION="2021-07-28"

call() {
  local method="$1" path="$2" body="${3:-}"
  local sep="?"
  [[ "$path" == *"?"* ]] && sep="&"

  if [ "$method" = "GET" ] || [ "$method" = "DELETE" ]; then
    curl -s -X "$method" "${API}${path}${sep}locationId=${LOC}" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Version: $VERSION" \
      -H "Accept: application/json"
  else
    curl -s -X "$method" "${API}${path}" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Version: $VERSION" \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d "$body"
  fi
}

fmt() {
  python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    if isinstance(d, dict) and d.get('statusCode', 0) >= 400:
        print(f'ERROR [{d[\"statusCode\"]}]: {d.get(\"message\", json.dumps(d))}')
        sys.exit(1)
    print(json.dumps(d, indent=2))
except Exception as e:
    print(f'Parse error: {e}')
    sys.exit(1)
"
}

CMD="${1:-help}"
SUB="${2:-}"
shift 2 2>/dev/null || true

case "$CMD" in
  contacts)
    case "$SUB" in
      list)
        LIMIT=20; QUERY=""
        while [[ $# -gt 0 ]]; do
          case "$1" in
            --limit) LIMIT="$2"; shift 2 ;;
            --query) QUERY="$2"; shift 2 ;;
            *) shift ;;
          esac
        done
        URL="/contacts/?limit=$LIMIT"
        [ -n "$QUERY" ] && URL="$URL&query=$QUERY"
        call GET "$URL" | fmt
        ;;
      get)
        ID="$1"
        call GET "/contacts/$ID" | fmt
        ;;
      create)
        NAME=""; EMAIL=""; PHONE=""; TAGS=""
        while [[ $# -gt 0 ]]; do
          case "$1" in
            --name) NAME="$2"; shift 2 ;;
            --email) EMAIL="$2"; shift 2 ;;
            --phone) PHONE="$2"; shift 2 ;;
            --tags) TAGS="$2"; shift 2 ;;
            *) shift ;;
          esac
        done
        FIRST=$(echo "$NAME" | awk '{print $1}')
        LAST=$(echo "$NAME" | awk '{$1=""; print $0}' | xargs)
        BODY=$(python3 -c "
import json
d = {'locationId': '$LOC', 'firstName': '$FIRST', 'lastName': '$LAST'}
if '$EMAIL': d['email'] = '$EMAIL'
if '$PHONE': d['phone'] = '$PHONE'
if '$TAGS': d['tags'] = '$TAGS'.split(',')
print(json.dumps(d))
")
        call POST "/contacts/" "$BODY" | fmt
        ;;
      update)
        ID="$1"; shift
        NAME=""; EMAIL=""; PHONE=""; TAGS=""
        while [[ $# -gt 0 ]]; do
          case "$1" in
            --name) NAME="$2"; shift 2 ;;
            --email) EMAIL="$2"; shift 2 ;;
            --phone) PHONE="$2"; shift 2 ;;
            --tags) TAGS="$2"; shift 2 ;;
            *) shift ;;
          esac
        done
        BODY=$(python3 -c "
import json
d = {}
if '$NAME':
    parts = '$NAME'.split(' ', 1)
    d['firstName'] = parts[0]
    if len(parts) > 1: d['lastName'] = parts[1]
if '$EMAIL': d['email'] = '$EMAIL'
if '$PHONE': d['phone'] = '$PHONE'
if '$TAGS': d['tags'] = '$TAGS'.split(',')
print(json.dumps(d))
")
        call PUT "/contacts/$ID" "$BODY" | fmt
        ;;
      delete)
        ID="$1"
        call DELETE "/contacts/$ID" | fmt
        ;;
      search)
        QUERY="$1"
        call GET "/contacts/?query=$QUERY&limit=20" | fmt
        ;;
      *)
        echo "Usage: ghl.sh contacts [list|get|create|update|delete|search]"
        ;;
    esac
    ;;

  message)
    case "$SUB" in
      send)
        CONTACT_ID="$1"; shift
        BODY_TEXT=""; MSG_TYPE="SMS"
        while [[ $# -gt 0 ]]; do
          case "$1" in
            --body) BODY_TEXT="$2"; shift 2 ;;
            --type) MSG_TYPE="$2"; shift 2 ;;
            *) shift ;;
          esac
        done
        PAYLOAD=$(python3 -c "
import json
d = {
    'type': '$MSG_TYPE',
    'contactId': '$CONTACT_ID',
    'message': '''$BODY_TEXT'''
}
print(json.dumps(d))
")
        call POST "/conversations/messages" "$PAYLOAD" | fmt
        ;;
      *)
        echo "Usage: ghl.sh message send <contactId> --body \"text\" [--type SMS|Email]"
        ;;
    esac
    ;;

  conversations)
    case "$SUB" in
      list)
        CONTACT_ID=""; LIMIT=20
        while [[ $# -gt 0 ]]; do
          case "$1" in
            --contactId) CONTACT_ID="$2"; shift 2 ;;
            --limit) LIMIT="$2"; shift 2 ;;
            *) shift ;;
          esac
        done
        URL="/conversations/search?limit=$LIMIT"
        [ -n "$CONTACT_ID" ] && URL="$URL&contactId=$CONTACT_ID"
        call GET "$URL" | fmt
        ;;
      get)
        ID="$1"
        call GET "/conversations/$ID" | fmt
        ;;
      *)
        echo "Usage: ghl.sh conversations [list|get]"
        ;;
    esac
    ;;

  pipelines)
    call GET "/opportunities/pipelines" | fmt
    ;;

  opportunities)
    case "$SUB" in
      list)
        PIPELINE_ID=""
        while [[ $# -gt 0 ]]; do
          case "$1" in
            --pipelineId) PIPELINE_ID="$2"; shift 2 ;;
            *) shift ;;
          esac
        done
        URL="/opportunities/search"
        [ -n "$PIPELINE_ID" ] && URL="$URL?pipelineId=$PIPELINE_ID"
        call GET "$URL" | fmt
        ;;
      create)
        PIPELINE_ID=""; STAGE_ID=""; CONTACT_ID=""; OPP_NAME=""; VALUE=""
        while [[ $# -gt 0 ]]; do
          case "$1" in
            --pipelineId) PIPELINE_ID="$2"; shift 2 ;;
            --stageId) STAGE_ID="$2"; shift 2 ;;
            --contactId) CONTACT_ID="$2"; shift 2 ;;
            --name) OPP_NAME="$2"; shift 2 ;;
            --value) VALUE="$2"; shift 2 ;;
            *) shift ;;
          esac
        done
        PAYLOAD=$(python3 -c "
import json
d = {
    'pipelineId': '$PIPELINE_ID',
    'pipelineStageId': '$STAGE_ID',
    'contactId': '$CONTACT_ID',
    'name': '$OPP_NAME',
    'locationId': '$LOC',
    'status': 'open'
}
if '$VALUE': d['monetaryValue'] = float('$VALUE')
print(json.dumps(d))
")
        call POST "/opportunities/" "$PAYLOAD" | fmt
        ;;
      *)
        echo "Usage: ghl.sh opportunities [list|create]"
        ;;
    esac
    ;;

  calendars)
    case "$SUB" in
      list)
        call GET "/calendars/" | fmt
        ;;
      slots)
        CAL_ID="$1"; shift
        START=""; END=""
        while [[ $# -gt 0 ]]; do
          case "$1" in
            --start) START="$2"; shift 2 ;;
            --end) END="$2"; shift 2 ;;
            *) shift ;;
          esac
        done
        call GET "/calendars/$CAL_ID/free-slots?startDate=$START&endDate=$END" | fmt
        ;;
      *)
        echo "Usage: ghl.sh calendars [list|slots]"
        ;;
    esac
    ;;

  tags)
    case "$SUB" in
      list)
        call GET "/locations/$LOC/tags" | fmt
        ;;
      create)
        TAG_NAME=""
        while [[ $# -gt 0 ]]; do
          case "$1" in
            --name) TAG_NAME="$2"; shift 2 ;;
            *) shift ;;
          esac
        done
        call POST "/locations/$LOC/tags" "{\"name\": \"$TAG_NAME\"}" | fmt
        ;;
      *)
        echo "Usage: ghl.sh tags [list|create]"
        ;;
    esac
    ;;

  custom-fields)
    call GET "/locations/$LOC/customFields" | fmt
    ;;

  raw)
    METHOD="$SUB"
    PATH="$1"; shift
    BODY="${1:-}"
    if [ -n "$BODY" ]; then
      call "$METHOD" "$PATH" "$BODY" | fmt
    else
      call "$METHOD" "$PATH" | fmt
    fi
    ;;

  help|*)
    echo "GoHighLevel CLI - Arthur Integration"
    echo ""
    echo "Usage: ghl.sh <command> <subcommand> [options]"
    echo ""
    echo "Commands:"
    echo "  contacts list [--limit N] [--query \"search\"]"
    echo "  contacts get <contactId>"
    echo "  contacts create --name \"First Last\" [--email \"x\"] [--phone \"+1...\"] [--tags \"a,b\"]"
    echo "  contacts update <contactId> [--name \"x\"] [--email \"x\"] [--phone \"x\"]"
    echo "  contacts delete <contactId>"
    echo "  contacts search \"query\""
    echo "  message send <contactId> --body \"text\" [--type SMS|Email]"
    echo "  conversations list [--contactId <id>]"
    echo "  conversations get <conversationId>"
    echo "  pipelines list"
    echo "  opportunities list [--pipelineId <id>]"
    echo "  opportunities create --pipelineId <id> --stageId <id> --contactId <id> --name \"Deal\""
    echo "  calendars list"
    echo "  calendars slots <calendarId> --start \"2026-02-05\" --end \"2026-02-06\""
    echo "  tags list"
    echo "  tags create --name \"Tag Name\""
    echo "  custom-fields list"
    echo "  raw <METHOD> <path> [json body]"
    echo ""
    echo "Location: $LOC"
    ;;
esac
