#!/bin/bash
# Asana API helper script
# Usage: asana.sh <command> [options]
#
# Commands:
#   me                                          — Show current user info
#   workspaces                                  — List workspaces
#   projects list                               — List all projects
#   projects create --name "x" [--team <id>]    — Create a project
#   projects get <projectId>                    — Get project details
#   tasks list --project <id>                   — List tasks in a project
#   tasks get <taskId>                          — Get task details
#   tasks create --project <id> --name "x" [--notes "x"] [--assignee "me"] [--due "2026-02-10"]
#   tasks update <taskId> [--name "x"] [--completed true] [--due "x"] [--notes "x"]
#   tasks delete <taskId>                       — Delete a task
#   subtasks list <taskId>                      — List subtasks
#   subtasks create <parentTaskId> --name "x"   — Create a subtask
#   sections list --project <id>                — List sections
#   sections create --project <id> --name "x"   — Create a section
#   comment <taskId> --text "x"                 — Add a comment
#   search "query"                              — Search tasks
#   tags list                                   — List tags
#   teams list                                  — List teams
#   raw <METHOD> <path> [json body]             — Raw API call

set -euo pipefail

source ~/.config/asana/secrets.env

API="https://app.asana.com/api/1.0"
TOKEN="$ASANA_API_TOKEN"
WORKSPACE="1210382351336303"

call() {
  local method="$1" path="$2" body="${3:-}"

  if [ "$method" = "GET" ] || [ "$method" = "DELETE" ]; then
    curl -s -X "$method" "${API}${path}" \
      -H "Authorization: Bearer $TOKEN" \
      -H "Accept: application/json"
  else
    curl -s -X "$method" "${API}${path}" \
      -H "Authorization: Bearer $TOKEN" \
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
    if 'errors' in d:
        for e in d['errors']:
            print(f'ERROR: {e.get(\"message\", str(e))}')
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
  me)
    call GET "/users/me?opt_fields=name,email,workspaces.name" | fmt
    ;;

  workspaces)
    call GET "/workspaces" | fmt
    ;;

  projects)
    case "$SUB" in
      list)
        call GET "/projects?workspace=$WORKSPACE&opt_fields=name,color,archived,created_at&limit=100" | fmt
        ;;
      create)
        NAME=""; TEAM=""
        while [[ $# -gt 0 ]]; do
          case "$1" in
            --name) NAME="$2"; shift 2 ;;
            --team) TEAM="$2"; shift 2 ;;
            *) shift ;;
          esac
        done
        BODY="{\"data\":{\"name\":\"$NAME\",\"workspace\":\"$WORKSPACE\""
        [ -n "$TEAM" ] && BODY="$BODY,\"team\":\"$TEAM\""
        BODY="$BODY}}"
        call POST "/projects" "$BODY" | fmt
        ;;
      get)
        ID="$1"
        call GET "/projects/$ID?opt_fields=name,notes,color,created_at,modified_at,archived,members.name,owner.name" | fmt
        ;;
      *)
        echo "Usage: asana.sh projects [list|create|get]"
        ;;
    esac
    ;;

  tasks)
    case "$SUB" in
      list)
        PROJECT=""
        while [[ $# -gt 0 ]]; do
          case "$1" in
            --project) PROJECT="$2"; shift 2 ;;
            *) shift ;;
          esac
        done
        call GET "/tasks?project=$PROJECT&opt_fields=name,completed,due_on,assignee.name,notes&limit=100" | fmt
        ;;
      get)
        ID="$1"
        call GET "/tasks/$ID?opt_fields=name,notes,completed,due_on,assignee.name,projects.name,tags.name,custom_fields" | fmt
        ;;
      create)
        PROJECT=""; NAME=""; NOTES=""; ASSIGNEE=""; DUE=""; SECTION=""
        while [[ $# -gt 0 ]]; do
          case "$1" in
            --project) PROJECT="$2"; shift 2 ;;
            --name) NAME="$2"; shift 2 ;;
            --notes) NOTES="$2"; shift 2 ;;
            --assignee) ASSIGNEE="$2"; shift 2 ;;
            --due) DUE="$2"; shift 2 ;;
            --section) SECTION="$2"; shift 2 ;;
            *) shift ;;
          esac
        done
        BODY=$(python3 -c "
import json
d = {'name': '''$NAME''', 'projects': ['$PROJECT']}
if '''$NOTES''': d['notes'] = '''$NOTES'''
if '''$ASSIGNEE''': d['assignee'] = '''$ASSIGNEE'''
if '''$DUE''': d['due_on'] = '''$DUE'''
if '''$SECTION''': d['memberships'] = [{'project': '$PROJECT', 'section': '$SECTION'}]
print(json.dumps({'data': d}))
")
        call POST "/tasks" "$BODY" | fmt
        ;;
      update)
        ID="$1"; shift
        NAME=""; NOTES=""; COMPLETED=""; DUE=""
        while [[ $# -gt 0 ]]; do
          case "$1" in
            --name) NAME="$2"; shift 2 ;;
            --notes) NOTES="$2"; shift 2 ;;
            --completed) COMPLETED="$2"; shift 2 ;;
            --due) DUE="$2"; shift 2 ;;
            *) shift ;;
          esac
        done
        BODY=$(python3 -c "
import json
d = {}
if '''$NAME''': d['name'] = '''$NAME'''
if '''$NOTES''': d['notes'] = '''$NOTES'''
if '''$COMPLETED''': d['completed'] = '''$COMPLETED'''.lower() == 'true'
if '''$DUE''': d['due_on'] = '''$DUE'''
print(json.dumps({'data': d}))
")
        call PUT "/tasks/$ID" "$BODY" | fmt
        ;;
      delete)
        ID="$1"
        call DELETE "/tasks/$ID" | fmt
        ;;
      *)
        echo "Usage: asana.sh tasks [list|get|create|update|delete]"
        ;;
    esac
    ;;

  subtasks)
    case "$SUB" in
      list)
        ID="$1"
        call GET "/tasks/$ID/subtasks?opt_fields=name,completed,due_on,assignee.name" | fmt
        ;;
      create)
        PARENT="$1"; shift
        NAME=""
        while [[ $# -gt 0 ]]; do
          case "$1" in
            --name) NAME="$2"; shift 2 ;;
            *) shift ;;
          esac
        done
        call POST "/tasks/$PARENT/subtasks" "{\"data\":{\"name\":\"$NAME\"}}" | fmt
        ;;
      *)
        echo "Usage: asana.sh subtasks [list|create]"
        ;;
    esac
    ;;

  sections)
    case "$SUB" in
      list)
        PROJECT=""
        while [[ $# -gt 0 ]]; do
          case "$1" in
            --project) PROJECT="$2"; shift 2 ;;
            *) shift ;;
          esac
        done
        call GET "/projects/$PROJECT/sections?opt_fields=name" | fmt
        ;;
      create)
        PROJECT=""; NAME=""
        while [[ $# -gt 0 ]]; do
          case "$1" in
            --project) PROJECT="$2"; shift 2 ;;
            --name) NAME="$2"; shift 2 ;;
            *) shift ;;
          esac
        done
        call POST "/projects/$PROJECT/sections" "{\"data\":{\"name\":\"$NAME\"}}" | fmt
        ;;
      *)
        echo "Usage: asana.sh sections [list|create]"
        ;;
    esac
    ;;

  comment)
    TASK_ID="$SUB"
    TEXT=""
    while [[ $# -gt 0 ]]; do
      case "$1" in
        --text) TEXT="$2"; shift 2 ;;
        *) shift ;;
      esac
    done
    call POST "/tasks/$TASK_ID/stories" "{\"data\":{\"text\":\"$TEXT\"}}" | fmt
    ;;

  search)
    QUERY="$SUB"
    call GET "/workspaces/$WORKSPACE/tasks/search?text=$QUERY&opt_fields=name,completed,due_on,assignee.name,projects.name&limit=25" | fmt
    ;;

  tags)
    call GET "/tags?workspace=$WORKSPACE&opt_fields=name&limit=100" | fmt
    ;;

  teams)
    call GET "/organizations/$WORKSPACE/teams?opt_fields=name&limit=100" | fmt
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
    echo "Asana CLI - Arthur Integration"
    echo ""
    echo "Usage: asana.sh <command> <subcommand> [options]"
    echo ""
    echo "Commands:"
    echo "  me                                          Show current user"
    echo "  workspaces                                  List workspaces"
    echo "  projects list                               List all projects"
    echo "  projects create --name \"x\"                  Create a project"
    echo "  projects get <id>                           Get project details"
    echo "  tasks list --project <id>                   List tasks in project"
    echo "  tasks get <id>                              Get task details"
    echo "  tasks create --project <id> --name \"x\"      Create a task"
    echo "  tasks update <id> [--completed true]        Update a task"
    echo "  tasks delete <id>                           Delete a task"
    echo "  subtasks list <taskId>                      List subtasks"
    echo "  subtasks create <parentId> --name \"x\"       Create subtask"
    echo "  sections list --project <id>                List sections"
    echo "  sections create --project <id> --name \"x\"   Create section"
    echo "  comment <taskId> --text \"x\"                 Add a comment"
    echo "  search \"query\"                              Search tasks"
    echo "  tags list                                   List tags"
    echo "  teams list                                  List teams"
    echo "  raw <METHOD> <path> [json body]             Raw API call"
    echo ""
    echo "Workspace: $WORKSPACE (tbcpremium.com)"
    ;;
esac
