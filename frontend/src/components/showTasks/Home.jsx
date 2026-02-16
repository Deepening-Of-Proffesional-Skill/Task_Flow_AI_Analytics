import React from "react";
import '../../css/home.css';
import DailyTasks from './DailyTasks';
import WeeklyTasks from './WeeklyTasks';
import { useState } from 'react';
import '../../css/tabs.css';
import SearchTasks from "./SearchTasks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { fetchTasks } from "./services/fetchAllTasksService";

export default function Home() {
    const [activeTab, setActiveTab] = useState('daily');
    const navigate = useNavigate();
    const [allTasks, setAllTasks] = useState([]);
    const [errorTask, setErrorTask] = useState(null);

    //authentication check
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        console.log("Auth Token:", token);
        if (!token) {
        navigate("/"); //Redirect to login if no token is found
        }
    }, [navigate]);

    //fetch tasks from backend
    useEffect(() => {
        const getTasks = async () => {
            try {
                const tasks = await fetchTasks();
                setAllTasks(tasks);
            } catch (error) {
                setErrorTask('Failed to fetch tasks. Please try again later.');
                console.error('Error fetching tasks:', error);
            }
        };

        getTasks();
    }, []);

    // Sort tasks by due date
    const sortedTasks = [...allTasks].sort(
        (a, b) => new Date(a.deadline) - new Date(b.deadline)
    );

    

  return (
    <div className='py-4'>
        <h1>My Tasks</h1>

        {errorTask && (
            <div className="alert alert-danger mb-3">
                {errorTask}
            </div>
        )}
        <div className='tabs-container'> 
            <div className="mode-switch" role="tablist">
                <button 
                    type='button'
                    id="tab-daily"
                    className={`mode-btn ${activeTab === 'daily' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('daily')}
                    aria-selected={activeTab === 'daily'}
                    aria-controls="daily-panel"
                    role="tab"
                >
                    Daily Tasks
                </button>
                <button 
                    type='button'
                    id="tab-weekly"
                    className={`mode-btn ${activeTab === 'weekly' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('weekly')}
                    aria-selected={activeTab === 'weekly'}
                    aria-controls="weekly-panel"
                    role="tab"
                >
                    Weekly Tasks
                </button>
                <button 
                    type='button'
                    id="tab-search"
                    className={`mode-btn ${activeTab === 'search' ? 'active' : ''}`} 
                    onClick={() => setActiveTab('search')}
                    aria-selected={activeTab === 'search'}
                    aria-controls="search-panel"
                    role="tab"
                >
                    Search Tasks
                </button>
            </div>
        </div>
        
        <div
            id="daily-panel"
            role="tabpanel"
            aria-labelledby='tab-daily'
            hidden={activeTab !== 'daily'}
        >            
            <DailyTasks sortedTasks={sortedTasks} />
        </div>
        <div
            id="weekly-panel"
            role="tabpanel"
            aria-labelledby='tab-weekly'
            hidden={activeTab !== 'weekly'}
        >
            <WeeklyTasks sortedTasks={sortedTasks} />
        </div>  
        <div
            id="search-panel"
            role="tabpanel"
            aria-labelledby='tab-search'
            hidden={activeTab !== 'search'}
        >
            <SearchTasks />
        </div>        
    </div>
  )
}
