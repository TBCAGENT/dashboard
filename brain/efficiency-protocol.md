# Efficiency Protocol - Cost Management

## Model Hierarchy

| Model | Cost | Use For |
|-------|------|---------|
| **Sonnet 4** (default) | $3/$15 per MTok | 90% of tasks |
| **Opus 4.5** (escalate) | $15/$75 per MTok | Complex reasoning only |

## When to Escalate to Opus

Only use Opus (`/model opus`) for:
1. **Complex multi-step reasoning** - Business strategy, architecture decisions
2. **Critical financial analysis** - Deal evaluation, investment decisions
3. **Debugging difficult issues** - When Sonnet fails after 2+ attempts
4. **Long-form creative writing** - If quality matters significantly

## When to Stay on Sonnet

- API calls and data processing
- SMS drafting and response handling
- Routine monitoring (heartbeats, crons)
- File operations and organization
- Simple Q&A and lookups
- Most coding tasks

## Escalation Pattern

```
1. Start task on Sonnet
2. If hitting limits → escalate to Opus for that specific task
3. Complete complex reasoning on Opus
4. Return to Sonnet for follow-up work
```

## Token Efficiency Rules

1. **Filter API responses** - Use jq to extract only needed fields
2. **Concise replies** - No fluff, get to the point
3. **Batch operations** - Combine related tasks
4. **Cache common data** - Don't re-fetch repeatedly

## Daily Budget Target

**$100/day maximum**

At current pricing:
- Sonnet-only day: ~$50-80 (heavy usage)
- Mixed day (90% Sonnet, 10% Opus): ~$80-120

## Commands

- `/model sonnet` - Switch to Sonnet (default)
- `/model opus` - Escalate to Opus
- `/status` - Check current model and usage
