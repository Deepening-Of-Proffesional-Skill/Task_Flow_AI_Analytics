import React from 'react'
import { useEffect, useState } from 'react'
import { Container, Row, Col, ListGroup, Badge, Card } from 'react-bootstrap';
import {fetchAIAnalytics}  from './showTasks/services/fetchAIAnalytics.js';
import '../css/CohereInsights.css';
import NoTasks from './showTasks/NoTasks';

export default function CohereInsights() {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadAnalytics = async () => {
            try {
                setLoading(true);
                const response = await fetchAIAnalytics();
                console.log("Cohere Analytics Response:", response);
                setAnalyticsData(response);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        loadAnalytics();
    }, []);

  return (
    <Container>
        {loading ? (
            <div className="loading-card p-4">                
                <p className="mt-4 fs-5  ">
                    Analyzing your tasks with AI...
                </p>
                <p className="text-muted small ">
                    This usually takes just a few seconds
                </p>
                <div className="spinner-border text-info" style={{ width: '3.5rem', height: '3.5rem' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        ) : error ? (
            <p className="error-message">{error}</p>
        ) : analyticsData?.insights?.message ? (
            <div className='cohere-data-card-div'>
                <p>{analyticsData?.insights?.message}</p>
                <NoTasks />
            </div>
         ) : analyticsData?.insights && !analyticsData.message? (
            <Container fluid className="cohere-insights-container py-4">
                <Row className="g-4">
                    {/* Motivational Messages */}
                    <Col lg={6}>
                        <Card className="insight-card h-100">
                            <Card.Header className="insight-header">
                                <h5 className="mb-0">Today&apos;s Motivation</h5>
                            </Card.Header>
                            <Card.Body>
                                {analyticsData.insights.motivational_messages.length > 0 ? (
                                    <ListGroup variant="flush">
                                        {analyticsData.insights.motivational_messages.map((msg, idx) => (
                                            <ListGroup.Item key={idx} className="bg-transparent border-0 py-3">
                                                <div className="d-flex align-items-start">
                                                    <span className="me-3 fs-4">✨</span>
                                                    <p className="mb-0 text-light">{msg}</p>
                                                </div>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                ) : (
                                    <p className="text-muted">No motivational messages available yet.</p>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Forecast & Recommendation */}
                    <Col lg={6}>
                        <Card className="insight-card h-100">
                            <Card.Header className="insight-header">
                                <h5 className="mb-0">Weekly Forecast</h5>
                            </Card.Header>
                            <Card.Body>
                                <div className="mb-4">
                                    <h6 className="text-info mb-2">Predicted completions this week</h6>
                                    <div className="display-6 fw-bold text-light">
                                        {analyticsData.insights.forecast?.predicted_weekly_completion ?? '?'}
                                    </div>
                                </div>
                                <h6 className="recommand-head ">Recommendation</h6>
                                <p className="text-light">
                                    {analyticsData.insights.forecast?.recommendation || "Keep going — you're building great habits!"}
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Productivity Patterns */}
                    <Col lg={12}>
                        <Card className="insight-card">
                            <Card.Header className="insight-header">
                                <h5 className="mb-0">Your Productivity Patterns</h5>
                            </Card.Header>
                            <Card.Body>
                                <Row className="g-4">
                                    <Col md={6} xs={12} >
                                        <h6 className="mb-3">Most productive day</h6>
                                        {analyticsData.insights.patterns.most_productive_days?.length > 0 ? (
                                            <div className="d-flex flex-wrap gap-2">
                                                {analyticsData.insights.patterns.most_productive_days.map((day, i) => (
                                                    <Badge key={i} bg="success" className="px-3 py-2 fs-6">
                                                        {day}
                                                    </Badge>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-muted">Not enough data yet</p>
                                        )}
                                    </Col>

                                    <Col md={6} xs={12}>
                                        <h6 className="mb-3">Least productive days</h6>
                                        {analyticsData.insights.patterns.least_productive_days?.length > 0 ? (
                                            <div className="d-flex flex-wrap gap-2">
                                                {analyticsData.insights.patterns.least_productive_days.map((day, i) => (
                                                    <Badge key={i} bg="secondary" className="px-3 py-2 fs-6">
                                                        {day}
                                                    </Badge>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-muted">Not enough data yet</p>
                                        )}
                                    </Col>

                                    <Col md={6} xs={12}>
                                        <h6 className="mb-3">Top categories completed</h6>
                                        {analyticsData.insights.patterns.top_completed_categories?.length > 0 ? (
                                            <div className="d-flex flex-wrap gap-2">
                                                {analyticsData.insights.patterns.top_completed_categories.map((cat, i) => (
                                                    <Badge key={i} bg="info" className="px-3 py-2 fs-6">
                                                        {cat}
                                                    </Badge>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-muted">No categories tracked yet</p>
                                        )}
                                    </Col>

                                    <Col md={6} xs={12}>
                                        <h6 className="mb-3">Average completion time</h6>
                                        <Badge bg="info" className="px-3 py-2 fs-6">
                                            {analyticsData.insights.patterns.average_completion_time_hours ?? 0} hours
                                        </Badge>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Priority Suggestions */}
                    <Col lg={6}>
                        <Card className="insight-card h-100">
                            <Card.Header className="insight-header">
                                <h5 className="mb-0">Priority Suggestions</h5>
                            </Card.Header>
                            <Card.Body>
                                {analyticsData.insights.priority_suggestions.length > 0 ? (
                                    <ListGroup variant="flush">
                                        {analyticsData.insights.priority_suggestions.map((suggestion, idx) => (
                                            <ListGroup.Item key={idx} className="bg-transparent border-0 py-3">
                                                <div className="d-flex align-items-start">
                                                    <span className="me-3 fs-4 text-warning">⚡</span>
                                                    <p className="mb-0 text-light">{suggestion}</p>
                                                </div>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                ) : (
                                    <p className="text-muted">No urgent suggestions right now.</p>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Quick Tips */}
                    <Col lg={6}>
                        <Card className="insight-card h-100">
                            <Card.Header className="insight-header">
                                <h5 className="mb-0">Quick Productivity Tips</h5>
                            </Card.Header>
                            <Card.Body>
                                {analyticsData.insights.tips.length > 0 ? (
                                    <ListGroup variant="flush">
                                        {analyticsData.insights.tips.map((tip, idx) => (
                                            <ListGroup.Item key={idx} className="bg-transparent border-0 py-3">
                                                <div className="d-flex align-items-start">
                                                    <span className="me-3 fs-4 text-info">💡</span>
                                                    <p className="mb-0 text-light">{tip}</p>
                                                </div>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                ) : (
                                    <p className="text-muted">More tips will appear as you use the app.</p>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
            </Container>
        ): null}        
    </Container>
    
  )
}
