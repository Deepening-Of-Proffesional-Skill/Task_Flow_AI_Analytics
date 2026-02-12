import React from 'react'
import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import {fetchAIAnalytics}  from './showTasks/services/fetchAIAnalytics.js';
import '../css/CohereInsights.css';

export default function CohereInsights() {
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadAnalytics = async () => {
            try {
                setLoading(true);
                const response = await fetchAIAnalytics();
                console.log("Cohere Analytics Response:", response.insights);
                setAnalyticsData(response.insights);
            } catch (error) {
                setError(error);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        loadAnalytics();
    }, []);

  return (
    <Container>
        {loading ? (
            <p>Loading AI analytics...</p>
        ) : error ? (
            <p className="text-danger">Error loading AI analytics: {error.message}</p>
        ) : analyticsData.insights > 0? (
            <div className='cohere-data-card-div'>
                <p>See data in console log for now. Will add UI later.</p>
            </div>
        ) : (
            <div className='cohere-data-card-div'>
                <p>{analyticsData?.message}</p>
            </div>
        )}
        
    </Container>
    
  )
}
