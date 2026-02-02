import { useState, useEffect } from 'react';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample task data - Replace with API call
  useEffect(() => {
    const fetchTasks = async () => {
      // Simulated data - replace with actual API call
      const sampleTasks = [
        {
          id: 1,
          title: 'Design Homepage Layout',
          description: 'Create a modern and responsive homepage layout with hero section and feature cards',
          assignedTo: 'John Doe',
          status: 'in-progress',
          priority: 'high',
          dueDate: '2026-02-10',
          tags: ['Design', 'Frontend'],
          progress: 65
        },
        {
          id: 2,
          title: 'API Integration',
          description: 'Integrate RESTful API endpoints for user authentication and data management',
          assignedTo: 'Jane Smith',
          status: 'completed',
          priority: 'high',
          dueDate: '2026-02-05',
          tags: ['Backend', 'API'],
          progress: 100
        },
        {
          id: 3,
          title: 'Database Optimization',
          description: 'Optimize database queries and add proper indexing for better performance',
          assignedTo: 'Mike Johnson',
          status: 'todo',
          priority: 'medium',
          dueDate: '2026-02-15',
          tags: ['Database', 'Performance'],
          progress: 0
        },
        {
          id: 4,
          title: 'Write Unit Tests',
          description: 'Create comprehensive unit tests for all components and utility functions',
          assignedTo: 'Sarah Williams',
          status: 'in-progress',
          priority: 'medium',
          dueDate: '2026-02-12',
          tags: ['Testing', 'Quality'],
          progress: 40
        },
        {
          id: 5,
          title: 'User Dashboard Enhancement',
          description: 'Add charts and analytics to the user dashboard for better insights',
          assignedTo: 'David Brown',
          status: 'todo',
          priority: 'low',
          dueDate: '2026-02-20',
          tags: ['Frontend', 'UI/UX'],
          progress: 0
        },
        {
          id: 6,
          title: 'Security Audit',
          description: 'Conduct security audit and implement recommended security measures',
          assignedTo: 'Emma Davis',
          status: 'in-progress',
          priority: 'high',
          dueDate: '2026-02-08',
          tags: ['Security', 'Backend'],
          progress: 75
        }
      ];
      
      setTimeout(() => {
        setTasks(sampleTasks);
        setLoading(false);
      }, 500);
    };

    fetchTasks();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'todo':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-orange-100 text-orange-700';
      case 'low':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'in-progress':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'todo':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-secondary to-[#1e2875] fixed h-screen left-0 top-0">
        <div className="flex items-center gap-3 px-5 py-5 mb-10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <circle cx="12" cy="12" r="10" fill="#5b7fff"/>
          </svg>
          <span className="text-white text-xl font-bold">TaskMe</span>
        </div>
        
        <nav className="flex flex-col">
          <a href="/" className="flex items-center gap-3 px-5 py-3.5 text-white/70 cursor-pointer transition-all border-l-[3px] border-transparent hover:bg-white/10 hover:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="3" width="7" height="7" strokeWidth="2"/>
              <rect x="14" y="3" width="7" height="7" strokeWidth="2"/>
              <rect x="3" y="14" width="7" height="7" strokeWidth="2"/>
              <rect x="14" y="14" width="7" height="7" strokeWidth="2"/>
            </svg>
            <span className="text-[15px] font-medium">Dashboard</span>
          </a>
          
          <div className="flex items-center gap-3 px-5 py-3.5 text-white cursor-pointer transition-all border-l-[3px] border-white bg-primary/30">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeWidth="2"/>
            </svg>
            <span className="text-[15px] font-medium">Tasks</span>
          </div>
          
          <div className="flex items-center gap-3 px-5 py-3.5 text-white/70 cursor-pointer transition-all border-l-[3px] border-transparent hover:bg-white/10 hover:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2"/>
            </svg>
            <span className="text-[15px] font-medium">Team</span>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="ml-64 flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white px-8 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Team Tasks</h1>
            <p className="text-sm text-gray-500">Manage and track all team assignments</p>
          </div>
          
          <div className="flex items-center gap-5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
              <span className="text-white font-bold text-sm">CA</span>
            </div>
          </div>
        </header>

        {/* Tasks Content */}
        <div className="p-8 bg-gray-50 min-h-screen">
          {/* Filters and Search */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex flex-col gap-6">
              {/* Search Bar */}
              <div className="flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-lg w-full max-w-2xl">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF">
                  <circle cx="11" cy="11" r="8" strokeWidth="2"/>
                  <path d="M21 21l-4.35-4.35" strokeWidth="2"/>
                </svg>
                <input 
                  type="text" 
                  placeholder="Search tasks..." 
                  className="border-none bg-transparent outline-none flex-1 text-sm text-gray-700 placeholder-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-3 flex-wrap">
                <button 
                  onClick={() => setFilter('all')}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    filter === 'all' 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  All Tasks
                </button>
                <button 
                  onClick={() => setFilter('todo')}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    filter === 'todo' 
                      ? 'bg-blue-500 text-white shadow-md' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  To Do
                </button>
                <button 
                  onClick={() => setFilter('in-progress')}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    filter === 'in-progress' 
                      ? 'bg-yellow-500 text-white shadow-md' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  In Progress
                </button>
                <button 
                  onClick={() => setFilter('completed')}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    filter === 'completed' 
                      ? 'bg-green-500 text-white shadow-md' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>
          </div>

          {/* Tasks Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <div className="mb-5">
                <p className="text-sm text-gray-600 font-medium">Showing {filteredTasks.length} of {tasks.length} tasks</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredTasks.map((task) => (
                  <div 
                    key={task.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100"
                  >
                    {/* Card Header */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100">
                            {getStatusIcon(task.status)}
                          </div>
                          <div className={`px-3 py-1 rounded-md text-xs font-semibold ${getStatusColor(task.status)}`}>
                            <span className="capitalize">{task.status.replace('-', ' ')}</span>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-md text-xs font-bold uppercase ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                        {task.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 leading-relaxed mb-6">
                        {task.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-semibold text-gray-700">Progress</span>
                          <span className="text-sm font-bold text-gray-900">{task.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-primary to-[#667eea] h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center">
                            <span className="text-white font-bold text-xs">
                              {task.assignedTo.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{task.assignedTo}</p>
                            <p className="text-xs text-gray-500">Assigned</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">
                            {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                          <p className="text-xs text-gray-500">Due Date</p>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex gap-2 flex-wrap mt-4">
                        {task.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-gray-50 rounded-md text-xs text-gray-700 font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredTasks.length === 0 && (
                <div className="text-center py-20">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">No tasks found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tasks;
