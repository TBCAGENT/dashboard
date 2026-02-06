# Asana Integration Skill

Manage projects, tasks, and team workflows in Asana for tbcpremium.com workspace.

## Script

`~/.openclaw/workspace/scripts/asana.sh`

## Workspace Info

- **User**: Luke Fontaine (luke@tbcpremium.com)
- **Workspace**: tbcpremium.com (GID: 1210382351336303)
- **Teams**: Acquisition Team, Dispo Team, Ops, Property Management

## Active Projects

| Project | GID |
|---------|-----|
| Buyers Club Dispo | 1210488619588788 |
| Task Manager | 1210492238082458 |
| Property Handoff | 1211332599757346 |
| Buyers Club Orders | 1211579345585362 |
| Goals | 1211892250551103 |
| Suite Properties x TBC. | 1212696942655041 |

## Commands

```bash
# Projects
asana.sh projects list
asana.sh projects get <projectId>
asana.sh projects create --name "x" [--team <teamId>]

# Tasks
asana.sh tasks list --project <projectId>
asana.sh tasks get <taskId>
asana.sh tasks create --project <id> --name "x" [--notes "x"] [--assignee "me"] [--due "2026-02-10"] [--section <sectionId>]
asana.sh tasks update <taskId> [--name "x"] [--completed true] [--due "x"] [--notes "x"]
asana.sh tasks delete <taskId>

# Subtasks
asana.sh subtasks list <taskId>
asana.sh subtasks create <parentTaskId> --name "x"

# Sections
asana.sh sections list --project <projectId>
asana.sh sections create --project <projectId> --name "x"

# Other
asana.sh comment <taskId> --text "x"
asana.sh search "query"
asana.sh tags list
asana.sh teams list
asana.sh raw <METHOD> <path> [json body]
```

## When to Use

- When Luke asks about tasks, projects, or work items
- When creating, updating, or checking off tasks
- When organizing work across teams
- When Luke says things like "add to asana", "create a task", "what's on my plate", "check my tasks"

## Behavior

- Default to listing active (non-archived) projects
- When creating tasks, ask which project if not specified
- Use `--assignee "me"` to assign to Luke unless told otherwise
- Show task completion status clearly
- When searching, use concise queries for best results
