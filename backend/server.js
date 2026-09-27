const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const incidentsPath = path.join(__dirname, '../data/incidents.json');
let incidents = require(incidentsPath);

app.get('/api/incidents', (req, res) => {
    res.json(incidents);
});

app.post('/api/incident', async (req, res) => {
    try {
        const { service, errorMessage, severity, affectedUsers } = req.body;
        const similarIncidents = incidents.filter(inc => inc.service === service).slice(0, 3);
        const analysis = await analyzeIncident({ service, errorMessage, severity, affectedUsers, similarIncidents });
        res.json({ incident: { service, errorMessage, severity, affectedUsers }, similarIncidents, analysis, timestamp: new Date() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/resolve', async (req, res) => {
    try {
        const { incidentId, service, rootCause, solution, timeToResolve } = req.body;
        const newIncident = {
            id: `LEARNED_${Date.now()}`,
            service,
            errorMessage: rootCause,
            rootCause,
            resolution: [solution],
            timeToResolveMinutes: timeToResolve || 5,
            timestamp: new Date().toISOString(),
            learned: true
        };
        incidents.push(newIncident);
        fs.writeFileSync(incidentsPath, JSON.stringify(incidents, null, 2));
        console.log(`✓ Incident learned and stored`);
        res.json({ success: true, message: 'Agent learned this incident!' });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

async function analyzeIncident(data) {
    try {
        const prompt = `You are a DevOps incident response expert.

SERVICE: ${data.service}
ERROR: ${data.errorMessage}
SEVERITY: ${data.severity}
AFFECTED USERS: ${data.affectedUsers}

SIMILAR PAST INCIDENTS:
${data.similarIncidents.map(i => `- ${i.id}: ${i.rootCause} (Fixed in ${i.timeToResolveMinutes}min)`).join('\n')}

Provide in 4 sections:
1. ROOT CAUSE HYPOTHESIS
2. RECOMMENDED FIX (3-4 steps)
3. CONFIDENCE LEVEL (High/Medium/Low)
4. PREVENTION

Be direct.`;

        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: 'openai/gpt-oss-120b',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 400
            },
            { headers: { 'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, 'Content-Type': 'application/json' } }
        );
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('Groq error:', error.message);
        return 'Analysis failed. Check similar past incidents above.';
    }
}

app.listen(process.env.PORT || 5000, () => {
    console.log(`✓ Server running on port ${process.env.PORT || 5000}`);
});