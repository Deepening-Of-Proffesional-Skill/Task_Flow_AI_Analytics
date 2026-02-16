import React from 'react'
import { useState } from 'react'
import { Form } from 'react-bootstrap';
import '../css/AIInsights.css';
import CohereAnalytics from './CohereInsights';

export default function AIInsights() {
    const [aiModel, setAiModel] = useState('select'); 
  return (
    <div className="ai-analytics-page">
        <div className="analytics-header mb-4 mb-md-5 text-center text-md-start">
            <div>
                <h1 className="mb-2">AI Insights</h1>
                <p className="text-muted mb-4 mb-md-4 fs-5 text-center ">
                    Get powerful insights and analytics about your tasks powered by AI.
                </p>
            </div>
            
            <div className="model-selector " style={{ maxWidth: '320px' }}>
                <Form.Label 
                    htmlFor="aiModelSelect" 
                    className="form-label fw-medium mb-2 d-block text-start"
                >
                    Select AI Model:
                </Form.Label>
                <Form.Select 
                    id="aiModelSelect"
                    value={aiModel}
                    onChange={(e) => setAiModel(e.target.value)}
                    className="form-select shadow-sm"
                >
                    <option value="select">Select</option>
                    <option value="cohere">Cohere</option>
                    <option value="openai">Gemini</option>
                </Form.Select>
            </div>
        </div>
                
        

        <div className="content-area">
            {!aiModel || aiModel === 'select' ? (
                <p className="lead text-center text-muted py-5">
                    Select an AI model above to start analyzing your tasks...
                </p>
                ) : (
                    <CohereAnalytics />
                )
            }
            
        </div>
    </div>
  );
}
