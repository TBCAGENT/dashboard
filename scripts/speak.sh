#!/bin/bash
# Generate speech using ElevenLabs and optionally send as WhatsApp voice note
# Usage: speak.sh <text> [--send <phone>] [--play] [--file <output.mp3>]
# Examples:
#   speak.sh "Hello sir, how may I assist you?"                    # just generate
#   speak.sh "Good morning Luke" --play                            # generate and play locally
#   speak.sh "Your meeting starts in 10 minutes" --send +13397931673  # send as WhatsApp voice note
#   speak.sh "Report ready" --file /tmp/report.mp3                 # save to specific file

TEXT="$1"
shift

if [ -z "$TEXT" ]; then
  echo "Usage: speak.sh <text> [--send <phone>] [--play] [--file <output.mp3>]"
  exit 1
fi

source ~/.config/elevenlabs/secrets.env

VOICE_ID="${ELEVENLABS_VOICE_ID:-3MYE8EKer63bPDk874wF}"
MODEL="${ELEVENLABS_MODEL:-eleven_multilingual_v2}"
OUTPUT="/tmp/arthur_speech_$$.mp3"
SEND_TO=""
PLAY=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    --send) SEND_TO="$2"; shift 2 ;;
    --play) PLAY=true; shift ;;
    --file) OUTPUT="$2"; shift 2 ;;
    *) shift ;;
  esac
done

# Use streaming endpoint — single continuous generation, no chunking, no voice drift
JSON_BODY=$(python3 -c "
import json, sys
text = sys.stdin.read()
print(json.dumps({
    'text': text,
    'model_id': '$MODEL',
    'voice_settings': {
        'stability': 0.75,
        'similarity_boost': 0.85,
        'style': 0.0,
        'use_speaker_boost': True
    }
}))
" <<< "$TEXT")

curl -s -X POST "https://api.elevenlabs.io/v1/text-to-speech/$VOICE_ID/stream" \
  -H "xi-api-key: $ELEVENLABS_API_KEY" \
  -H "Content-Type: application/json" \
  -d "$JSON_BODY" --output "$OUTPUT"

SIZE=$(stat -f%z "$OUTPUT" 2>/dev/null || stat -c%s "$OUTPUT" 2>/dev/null)
if [ "$SIZE" -lt 1000 ]; then
  echo "ERROR: Audio generation failed"
  cat "$OUTPUT"
  exit 1
fi

echo "Generated: $OUTPUT ($(( SIZE / 1024 ))KB)"

if [ "$PLAY" = true ]; then
  afplay "$OUTPUT" &
  echo "Playing..."
fi

if [ -n "$SEND_TO" ]; then
  openclaw message send --channel whatsapp --target "$SEND_TO" --media "$OUTPUT" -m "🦞" 2>&1
  echo "Sent voice note to $SEND_TO"
fi
