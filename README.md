# Incident Response Agent

An AI agent that helps you work through production incidents. You give it the error, it checks your team's past incidents for similar ones, and it suggests a fix based on what worked before. When you resolve an incident, it saves the fix so it can use it next time.

Demo video: https://youtu.be/JkR8q_3S3R4

[![Demo](https://img.youtube.com/vi/JkR8q_3S3R4/maxresdefault.jpg)](https://youtu.be/JkR8q_3S3R4)

<!-- add screenshots in docs/ and link them here -->

## The problem

When something breaks in production, a lot of time goes into the same routine: search the logs, try to remember if this happened before, dig through old docs or chat history. It's slow, and the knowledge usually sits in one person's head.

## What this does about it

- Analyzes an incident from the service, error message, severity and number of affected users
- Looks through past incidents for similar patterns
- Suggests a fix, using what worked before when there's a match
- Saves each resolution so the next analysis has more to work with

In my own testing, an analysis that would normally take me a while to piece together comes back in a few seconds. I haven't measured it on real production incidents yet, so treat any big time-saving claim with some skepticism until you try it on yours.

## Features

- Login per team, with 3 demo accounts (see below)
- Dashboard: total incidents, average response time, incidents learned from, P1 count
- Incident form and AI analysis through Groq
- Incident history with similar-incident matching
- Resolve flow that saves the fix for later
- Pricing page (Free, Pro at ₹2,999/month, Enterprise on request)
- Dark mode UI

## Tech stack

- Frontend: React
- Backend: Node.js + Express
- AI: Groq (`openai/gpt-oss-120b`)
- Storage: browser localStorage (JSON), kept separately for each team

## Running it locally

You need Node.js and a free Groq API key from console.groq.com.

Install dependencies:

```
cd backend
npm install

cd ../frontend
npm install
```

Create `backend/.env` and add your key:

```
GROQ_API_KEY=your_key_here
```

Terminal 1, backend:

```
cd backend
node server.js
```

Terminal 2, frontend:

```
cd frontend
npm start
```

Then open http://localhost:3000. The backend runs on port 5000.

## Demo logins

| Email | Password |
|---|---|
| team1@demo.com | demo123 |
| team2@demo.com | demo123 |
| team3@demo.com | demo123 |

Each team sees only its own incident history.

## How it works

1. You report an incident: service, error message, severity, affected users.
2. The backend looks for similar past incidents from your team.
3. Groq analyzes the incident with that history as context.
4. You get a root cause and a recommended fix.
5. When you mark it resolved, the fix is saved for next time.

## Services included

- payment-api
- auth-service
- notifications-queue
- database-cluster

These are just examples. Swap in your own services in the code.

## API

- `GET /api/incidents` returns all incidents
- `POST /api/incident` analyzes a new incident
- `POST /api/resolve` marks an incident resolved and saves what was learned

## Limitations

Incident history is saved in the browser (localStorage), so it stays in one browser and isn't shared across devices or people yet. A proper database is the first thing I'd add. It's also a solo project, so there are rough edges.

## What's next

- Slack integration
- Real database instead of localStorage
- Log file upload

If you'd want one of these, tell me, and that's what I'll build first.

## Custom setup

If you want this set up on your own infrastructure, connected to your tools, or customized for your services, I can help with that. Message me on LinkedIn or open an issue to talk about it.

## About

Built by Yogesh Chandhra, a B.Tech student and indie developer from Vijayawada. Open source, MIT license.
