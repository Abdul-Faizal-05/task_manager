import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch user-specific tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
          console.error('No user found in localStorage');
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:5000/api/tasks/member/${user.id}`);
        const data = await response.json();

        if (response.ok) {
          setTasks(data.tasks);
        } else {
          console.error('Failed to fetch tasks:', data.message);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-gray-200 text-black border-black';
      case 'pending':
        return 'bg-gray-100 text-gray-700 border-gray-400';
      default:
        return 'bg-white text-gray-600 border-gray-300';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-black text-white';
      case 'medium':
        return 'bg-gray-600 text-white';
      case 'low':
        return 'bg-gray-300 text-black';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Priority order for sorting (high = 1, medium = 2, low = 3)
  const priorityOrder = { 'high': 1, 'medium': 2, 'low': 3 };

  const filteredTasks = tasks
    .filter(task => {
      const matchesFilter = filter === 'all' || task.status === filter;
      const matchesSearch = (task.title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (task.description?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (task.teamName?.toLowerCase() || '').includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'pending':
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
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-black fixed h-screen left-0 top-0">
        <div className="flex items-center gap-3 px-5 py-5 mb-10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" />
          </svg>
          <span className="text-white text-xl font-bold">TaskMe</span>
        </div>

        <nav className="flex flex-col">
          <a href="/home" className="flex items-center gap-3 px-5 py-3.5 text-white/70 cursor-pointer transition-all border-l-[3px] border-transparent hover:bg-white/10 hover:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="3" width="7" height="7" strokeWidth="2" />
              <rect x="14" y="3" width="7" height="7" strokeWidth="2" />
              <rect x="3" y="14" width="7" height="7" strokeWidth="2" />
              <rect x="14" y="14" width="7" height="7" strokeWidth="2" />
            </svg>
            <span className="text-[15px] font-medium">Dashboard</span>
          </a>

          <div className="flex items-center gap-3 px-5 py-3.5 text-white cursor-pointer transition-all border-l-[3px] border-white bg-white/10">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeWidth="2" />
            </svg>
            <span className="text-[15px] font-medium">Tasks</span>
          </div>

          <div className="flex items-center gap-3 px-5 py-3.5 text-white/70 cursor-pointer transition-all border-l-[3px] border-transparent hover:bg-white/10 hover:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" />
            </svg>
            <span className="text-[15px] font-medium">Team</span>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="ml-64 flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white px-8 py-4 flex justify-between items-center border-b-2 border-black sticky top-0 z-50">
          <div>
            <h1 className="text-2xl font-bold text-black">Team Tasks</h1>
            <p className="text-sm text-gray-500">Manage and track all team assignments</p>
          </div>

          <div className="flex items-center gap-5">
            <div className="w-10 h-10 rounded-none bg-black flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
              <span className="text-white font-bold text-sm">CA</span>
            </div>
          </div>
        </header>

        {/* Tasks Content */}
        <div className="p-8 bg-gray-50 min-h-screen">
          {/* Filters and Search */}
          <div className="bg-white border-2 border-black rounded-none p-6 mb-6">
            <div className="flex flex-col gap-6">
              {/* Search Bar */}
              <div className="flex items-center gap-3 bg-gray-100 px-5 py-3 rounded-none w-full max-w-2xl border border-gray-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666">
                  <circle cx="11" cy="11" r="8" strokeWidth="2" />
                  <path d="M21 21l-4.35-4.35" strokeWidth="2" />
                </svg>
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="border-none bg-transparent outline-none flex-1 text-sm text-black placeholder-gray-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-5 py-2.5 rounded-none text-sm font-medium transition-all border-2 ${filter === 'all'
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-gray-300 hover:border-black'
                    }`}
                >
                  All Tasks
                </button>
                <button
                  onClick={() => setFilter('pending')}
                  className={`px-5 py-2.5 rounded-none text-sm font-medium transition-all border-2 ${filter === 'pending'
                      ? 'bg-gray-600 text-white border-gray-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-gray-600'
                    }`}
                >
                  Pending
                </button>

                <button
                  onClick={() => setFilter('completed')}
                  className={`px-5 py-2.5 rounded-none text-sm font-medium transition-all border-2 ${filter === 'completed'
                      ? 'bg-gray-400 text-white border-gray-400'
                      : 'bg-white text-gray-500 border-gray-300 hover:border-gray-400'
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
              <div className="animate-spin rounded-none h-12 w-12 border-b-2 border-black"></div>
            </div>
          ) : (
            <>
              <div className="mb-5">
                <p className="text-sm text-gray-600 font-medium">Showing {filteredTasks.length} of {tasks.length} tasks</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredTasks.map((task) => (
                  <Link
                    key={task._id || task.id}
                    to={`/task/${task._id || task.id}`}
                    className="bg-white border-2 border-black rounded-none hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer block"
                  >
                    {/* Card Header */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-none flex items-center justify-center bg-gray-100 border border-gray-300">
                            {getStatusIcon(task.status)}
                          </div>
                          <div className={`px-3 py-1 rounded-none text-xs font-semibold border ${getStatusColor(task.status)}`}>
                            <span className="capitalize">{task.status.replace('-', ' ')}</span>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-none text-xs font-bold uppercase ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-black mb-3 group-hover:underline transition-all">
                        {task.title}
                      </h3>

                      <p className="text-sm text-gray-600 leading-relaxed mb-6">
                        {task.description}
                      </p>

                      {/* Team Name */}
                      {task.teamName && (
                        <div className="mb-4">
                          <p className="text-xs text-gray-500">Team</p>
                          <p className="text-sm font-semibold text-black">{task.teamName}</p>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-3">
                          {task.members && task.members.length > 0 ? (
                            <>
                              <div className="flex -space-x-2">
                                {task.members.slice(0, 3).map((member, idx) => (
                                  <div key={idx} className="w-9 h-9 rounded-none bg-black flex items-center justify-center border-2 border-white">
                                    <span className="text-white font-bold text-xs">
                                      {member.username ? member.username.substring(0, 2).toUpperCase() : 'TM'}
                                    </span>
                                  </div>
                                ))}
                                {task.members.length > 3 && (
                                  <div className="w-9 h-9 rounded-none bg-gray-300 flex items-center justify-center border-2 border-white">
                                    <span className="text-black font-bold text-xs">+{task.members.length - 3}</span>
                                  </div>
                                )}
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-black">{task.members.length} Member{task.members.length > 1 ? 's' : ''}</p>
                                <p className="text-xs text-gray-500">Assigned</p>
                              </div>
                            </>
                          ) : (
                            <div>
                              <p className="text-sm font-semibold text-black">No members</p>
                              <p className="text-xs text-gray-500">Unassigned</p>
                            </div>
                          )}
                        </div>

                        <div className="text-right">
                          <p className="text-sm font-semibold text-black">
                            {task.endDate ? new Date(task.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No due date'}
                          </p>
                          <p className="text-xs text-gray-500">Due Date</p>
                        </div>
                      </div>

                      {/* Duration */}
                      {task.duration && (
                        <div className="mt-4 flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-xs text-gray-600">Duration: {task.duration} days</span>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>

              {filteredTasks.length === 0 && (
                <div className="text-center py-20">
                  <h3 className="text-xl font-bold text-black mb-2">No tasks found</h3>
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
