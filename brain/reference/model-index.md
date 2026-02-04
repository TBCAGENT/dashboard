# 🧠 Model Index — Efficiency Guide

*Arthur's reference for choosing the right model for each task.*

---

## Currently Available Models

### Anthropic (Claude)

| Model | Cost (per 1M tokens) | Best For | Avoid For |
|-------|---------------------|----------|-----------|
| **Claude Opus 4.5** | ~$15 in / $75 out | Complex coding, architecture decisions, nuanced analysis, long-form writing, difficult debugging | Simple Q&A, quick lookups, routine tasks |
| **Claude Sonnet 4** | ~$3 in / $15 out | General coding, everyday tasks, summaries, most conversations | Only when Opus-level reasoning is truly needed |

### OpenAI

| Model | Cost (per 1M tokens) | Best For | Avoid For |
|-------|---------------------|----------|-----------|
| **GPT-4o** | ~$2.50 in / $10 out | Multimodal (images), general tasks, quick analysis, drafts | Heavy coding sessions |
| **o3-mini** | Variable (reasoning tokens) | Math, logic puzzles, structured reasoning | Simple conversations, creative writing |

---

## Task → Model Mapping

### 💻 Development & Coding
| Task | Recommended | Why |
|------|-------------|-----|
| Building new features | **Opus 4.5** | Best code quality, fewer iterations |
| Debugging complex issues | **Opus 4.5** | Deep reasoning, pattern recognition |
| Quick code fixes | **Sonnet 4** | Fast, good enough for simple edits |
| Code review | **Sonnet 4** | Sufficient for most reviews |
| Boilerplate generation | **Sonnet 4** or **GPT-4o** | Don't need premium for templates |

### 💬 Conversation & General
| Task | Recommended | Why |
|------|-------------|-----|
| Quick questions | **Sonnet 4** | Fast, cheap, accurate |
| Casual chat | **Sonnet 4** | No need for Opus here |
| Research summaries | **Sonnet 4** | Good comprehension at lower cost |
| Complex analysis | **Opus 4.5** | When nuance matters |

### 📝 Writing & Content
| Task | Recommended | Why |
|------|-------------|-----|
| Quick drafts | **Sonnet 4** or **GPT-4o** | Speed over perfection |
| Important documents | **Opus 4.5** | Quality matters |
| Editing/proofreading | **Sonnet 4** | Sufficient for polish |
| Creative writing | **Opus 4.5** | Better voice, nuance |

### 🧮 Reasoning & Analysis
| Task | Recommended | Why |
|------|-------------|-----|
| Math/logic problems | **o3-mini** | Built for structured reasoning |
| Strategic planning | **Opus 4.5** | Nuanced long-term thinking |
| Data analysis | **Sonnet 4** or **GPT-4o** | Good enough for most cases |
| Decision frameworks | **Opus 4.5** | When stakes are high |

### 🖼️ Multimodal (Images)
| Task | Recommended | Why |
|------|-------------|-----|
| Image analysis | **GPT-4o** | Strong vision capabilities |
| Screenshots/UI review | **GPT-4o** | Fast visual parsing |

---

## Cost Comparison (Relative)

```
Cheapest ◄─────────────────────────────────► Most Expensive

Sonnet 4  →  GPT-4o  →  o3-mini*  →  Opus 4.5
   $3          $2.50      varies        $15      (input per 1M)
   $15         $10        varies        $75      (output per 1M)
```
*o3-mini cost varies based on reasoning depth

---

## Arthur's Default Strategy

1. **Start with Sonnet 4** for most tasks
2. **Escalate to Opus 4.5** when:
   - Building something new/complex
   - Debugging is taking multiple attempts
   - Quality really matters (important docs, architecture)
   - Task requires deep reasoning
3. **Use GPT-4o** for:
   - Image/screenshot analysis
   - Quick multimodal tasks
4. **Use o3-mini** for:
   - Pure logic/math problems
   - When structured reasoning helps

---

## Models NOT Currently Configured (Consider Adding)

| Model | Cost | Why Add It |
|-------|------|------------|
| **Claude Haiku 3.5** | ~$0.25/$1.25 | Ultra-cheap for simple tasks, 5-10x cheaper than Sonnet |
| **GPT-4o-mini** | ~$0.15/$0.60 | Extremely cheap, good for bulk simple tasks |

Adding these would give us a true "cheap tier" for basic Q&A and simple operations.

---

## How to Switch Models

You can change my model per-session with `/model <model-id>`:
- `/model anthropic/claude-sonnet-4`
- `/model anthropic/claude-opus-4-5`
- `/model openai/gpt-4o`
- `/model openai/o3-mini`

Or I can spawn sub-agents with different models for specific tasks.

---

*Last updated: 2026-02-01*
*Will refine based on actual usage patterns.*
