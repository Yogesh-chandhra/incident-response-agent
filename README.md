# 🚨 AI Incident Response Agent

An AI-powered agent that analyzes production incidents in seconds, pulls up similar past incidents from memory, and gets smarter every time you resolve one.

## The Problem

DevOps and on-call engineers routinely burn 30+ minutes per incident just figuring out "have we seen this before, and what fixed it?" That knowledge usually lives in someone's head or a scattered Slack thread — not in a system that can surface it instantly.

## The Solution

This agent takes a bare-bones incident report (service, error message, severity, users affected), sends it to an LLM (via Groq) alongside relevant past incidents pulled from a real vector-backed memory bank ([Hindsight](https://github.com/vectorize-io/hindsight)), and returns an analysis plus a recommended fix — grounded in what actually worked before. When you mark an incident resolved, the outcome is written back into memory, so the next similar incident gets an even better answer.

## Features

- ✅ Simple incident intake form (service, error, severity, affected users)
- ✅ LLM-powered root-cause analysis via Groq
- ✅ Persistent agent memory via [Hindsight](https://github.com/vectorize-io/hindsight) — real retain/recall of past incidents, not just flat lookups
- ✅ Similarity-based recall against historical incidents
- ✅ "Mark as Resolved & Learn" — feeds the outcome back into memory
- ✅ Gets measurably faster/better with use

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React |
| Backend | Node.js + Express |
| LLM | Groq API |
| Memory | [Hindsight](https://github.com/vectorize-io/hindsight) (agent memory bank — retain/recall/reflect) |

## Architecture

```
┌─────────────┐      POST /api/incident      ┌──────────────┐      ┌────────────┐
│   React UI  │ ────────────────────────────▶ │ Node/Express │ ───▶ │  Groq LLM  │
│ (incident   │                                │   backend    │      └────────────┘
│   form)     │ ◀──────────────────────────── │              │
└─────────────┘        analysis result         │      │       │
       │                                       │      ▼       │
       │  POST /api/resolve                    │  Hindsight   │
       └──────────────────────────────────────▶│ memory bank  │
                                                │ (retain/recall)│
                                                └──────────────┘
```

## Quick Start

**1. Start Hindsight (memory backend)**
```bash
export OPENAI_API_KEY=your-key
docker run --rm -it --pull always -p 8888:8888 -p 9999:9999 \
  -e HINDSIGHT_API_LLM_API_KEY=$OPENAI_API_KEY \
  -e HINDSIGHT_API_LLM_MODEL=o3-mini \
  -v $HOME/.hindsight-docker:/home/hindsight/.pg0 \
  ghcr.io/vectorize-io/hindsight:latest
```
This runs the Hindsight API at `http://localhost:8888` and its UI at `http://localhost:9999`.

**2. Clone this repo and start the backend**
```bash
git clone https://github.com/USERNAME/incident-response-agent.git
cd incident-response-agent/backend
npm install
# add your Groq key and Hindsight connection details
echo "GROQ_API_KEY=your_key_here" > .env
echo "HINDSIGHT_API_URL=http://localhost:8888" >> .env
node server.js
```

**3. Start the frontend** (new terminal)
```bash
cd ../frontend
npm install
npm start
```

> ⚠️ Double-check `HINDSIGHT_API_URL` (and any other Hindsight-related variable names) against what your actual `backend/server.js` and `.env` use — update this section to match your real code before pushing.

Then open `http://localhost:3000`, fill out an incident, click **Analyze**, and once you're happy with the fix, click **Mark as Resolved & Learn**.

## Demo

📹 Demo video: [add link here]

## Links

- 📝 Blog post: [add link here]
- 💼 LinkedIn post: [add link here]

## Try It Yourself

Clone it, drop in your own Groq API key, and start feeding it real (or simulated) incidents. The more you resolve, the sharper its recommendations get.
