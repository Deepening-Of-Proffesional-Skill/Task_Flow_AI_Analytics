import '../../css/home.css';
import DailyTasks from './DailyTasks';
import WeeklyTasks from './WeeklyTasks';

export default function Home() {
    const tasks = [
        {
            id: 1,
            title: "Design Landing Page",
            description: "Create a responsive landing page for the new product.",
            status: "In Progress",
            dueDate: "2026-01-27"
        },
        {
            id: 2,
            title: "Develop API Endpoints",
            description: "Build RESTful API endpoints for user authentication.",
            status: "Not Started",
            dueDate: "2026-02-05"
        },
        {
            id: 3,
            title: "Set Up Database",
            description: "Configure the PostgreSQL database for the application.",
            status: "Completed",
            dueDate: "2026-01-28"
        },
        {
            id: 4,
            title: "Implement User Dashboard",
            description: "Create a user dashboard to display account information and activity.",
            status: "In Progress",
            dueDate: "2026-01-28"
        },
        {
            id: 5,
            title: "Write Unit Tests",
            description: "Develop unit tests for the API endpoints and database interactions.",
            status: "Not Started",
            dueDate: "2026-02-05"
        },
        {
            id: 6,
            title: "Deploy to Staging",
            description: "Deploy the application to the staging environment for testing.",
            status: "Blocked",
            dueDate: "2026-02-20"
        },
        {
            id: 7,
            title: "Conduct User Testing",
            description: "Organize user testing sessions to gather feedback on the new features.",
            status: "Not Started",
            dueDate: "2026-02-25"
        },
        {
            id: 8,
            title: "Optimize Performance",
            description: "Improve the performance of the application based on user feedback.",
            status: "Not Started",
            dueDate: "2026-03-01"
        }
    ];
    
    const sortedTasks = [...tasks].sort(
        (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
    );

    

  return (
    <div className='py-4'>
        <h1>Task List</h1>
        
        <DailyTasks sortedTasks={sortedTasks} />
        <WeeklyTasks sortedTasks={sortedTasks} />
        
    </div>
  )
}
