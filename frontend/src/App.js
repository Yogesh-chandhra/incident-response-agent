import { useState } from 'react';
import './App.css';

function App() {
    const [service, setService] = useState('');
    const [error, setError] = useState('');
    const [severity, setSeverity] = useState('P2');
    const [users, setUsers] = useState('');

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {
        if (!service || !error) {
            alert('Fill in all fields');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/incident', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    service,
                    errorMessage: error,
                    severity,
                    affectedUsers: parseInt(users) || 0
                })
            });

            const data = await response.json();
            setResult(data);
        } catch (err) {
            alert('Error: ' + err.message);
        }
        setLoading(false);
    };

    const handleResolve = async () => {
        if (!result) return;

        try {
            const response = await fetch('http://localhost:5000/api/resolve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    incidentId: result.incident.service + '_' + Date.now(),
                    service: result.incident.service,
                    rootCause: 'Auto-detected',
                    solution: result.analysis,
                    timeToResolve: 5
                })
            });

            const data = await response.json();
            alert('✓ ' + data.message);
            setResult(null);
        } catch (err) {
            alert('Error: ' + err.message);
        }
    };

    return (
        <div className="App">
            <h1>🚨 Incident Response Agent</h1>

            <div className="form-section">
                <h2>Report Incident</h2>

                <label>Service:
                    <select value={service} onChange={(e) => setService(e.target.value)}>
                        <option value="">Select service...</option>
                        <option value="payment-api">payment-api</option>
                        <option value="auth-service">auth-service</option>
                        <option value="notifications-queue">notifications-queue</option>
                        <option value="database-cluster">database-cluster</option>
                    </select>
                </label>

                <label>Error Message:
                    <textarea
                        value={error}
                        onChange={(e) => setError(e.target.value)}
                        placeholder="Paste error message here..."
                    />
                </label>

                <label>Severity:
                    <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
                        <option>P1</option>
                        <option>P2</option>
                        <option>P3</option>
                    </select>
                </label>

                <label>Affected Users:
                    <input
                        type="number"
                        value={users}
                        onChange={(e) => setUsers(e.target.value)}
                        placeholder="0"
                    />
                </label>

                <button onClick={handleAnalyze} disabled={loading}>
                    {loading ? '⏳ Analyzing...' : '🔍 Analyze Incident'}
                </button>
            </div>

            {result && (
                <div className="result-section">
                    <h2>Agent Analysis</h2>

                    {result.similarIncidents.length > 0 && (
                        <div className="card similar">
                            <h3>Similar Past Incidents ({result.similarIncidents.length})</h3>
                            {result.similarIncidents.map((inc) => (
                                <div key={inc.id} className="incident-item">
                                    <strong>{inc.id}</strong> - {inc.rootCause}
                                    <br /><small>Resolved in {inc.timeToResolveMinutes} min</small>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="card analysis">
                        <h3>Agent Recommendation</h3>
                        <pre>{result.analysis}</pre>
                    </div>

                    <button className="resolve-btn" onClick={handleResolve}>
                        ✓ Mark as Resolved & Learn
                    </button>
                </div>
            )}
        </div>
    );
}

export default App;