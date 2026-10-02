# Incident Response Agent

AI-powered incident response system that learns from past production incidents and recommends solutions instantly.

## Problem

DevOps teams waste 30+ minutes analyzing every production incident. They search logs, remember past incidents, dig through documentation. It's slow and error-prone.

## Solution

An AI agent that:
- Analyzes incidents in seconds
- Finds similar past incidents automatically
- Recommends the exact fix that worked before
- Learns from each resolved incident

## Results

**30 minutes → 5 minutes**

What used to take half an hour now takes 5 minutes. The agent gets smarter with every incident.

## Features

✅ AI-powered incident analysis using Groq LLM  
✅ Searches past incidents for similar patterns  
✅ Recommends proven solutions  
✅ Learns and remembers each resolution  
✅ Beautiful dark mode dashboard  
✅ Real-time analysis  

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js + Express
- **AI:** Groq LLM (openai/gpt-oss-120b)
- **Memory:** Persistent JSON storage
- **UI:** Dark mode with modern design

## Demo

Watch the system in action: [YouTube Demo](https://youtu.be/JkR8q_3S3R4?si=cviIkTm1IdQhs7zk)

## Quick Start

### Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### Run Locally

**Terminal 1 - Backend**
```bash
cd backend
node server.js
```

**Terminal 2 - Frontend**
```bash
cd frontend
npm start
```

Open http://localhost:3000

## How It Works

1. **Report Incident** - Enter service, error message, severity, affected users
2. **AI Analysis** - Groq LLM analyzes the incident
3. **Search History** - System finds similar past incidents
4. **Recommendation** - Agent recommends the proven solution
5. **Learn** - When resolved, the system learns and remembers

## Available Services

- payment-api
- auth-service
- notifications-queue
- database-cluster

(Easily customizable for your infrastructure)

## API Endpoints

- `GET /api/incidents` - Get all incidents
- `POST /api/incident` - Analyze new incident
- `POST /api/resolve` - Mark incident as resolved and learn

## Custom Setup & Deployment

Need this deployed to your infrastructure? I offer custom setup, integration with your tools, and team training.

**Contact for pricing and availability.**

---

Built with care by Yogesh Chandhra
Open source | MIT License
