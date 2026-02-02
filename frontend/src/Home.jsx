import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { Link } from 'react-router-dom';

function Home() {
  // Sample data for charts
  const taskProgressData = [
    { day: 'Mon', completed: 4, inProgress: 2, todo: 3 },
    { day: 'Tue', completed: 3, inProgress: 4, todo: 2 },
    { day: 'Wed', completed: 5, inProgress: 3, todo: 4 },
    { day: 'Thu', completed: 2, inProgress: 5, todo: 1 },
    { day: 'Fri', completed: 6, inProgress: 2, todo: 3 },
    { day: 'Sat', completed: 4, inProgress: 3, todo: 2 },
    { day: 'Sun', completed: 3, inProgress: 1, todo: 4 },
  ];

  const weeklyActivityData = [
    { week: 'Week 1', tasks: 12 },
    { week: 'Week 2', tasks: 19 },
    { week: 'Week 3', tasks: 15 },
    { week: 'Week 4', tasks: 22 },
    { week: 'Week 5', tasks: 18 },
    { week: 'Week 6', tasks: 25 },
  ];

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
          <div className="flex items-center gap-3 px-5 py-3.5 text-white cursor-pointer transition-all border-l-[3px] border-white bg-white/10">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="3" width="7" height="7" strokeWidth="2" />
              <rect x="14" y="3" width="7" height="7" strokeWidth="2" />
              <rect x="3" y="14" width="7" height="7" strokeWidth="2" />
              <rect x="14" y="14" width="7" height="7" strokeWidth="2" />
            </svg>
            <span className="text-[15px] font-medium">Dashboard</span>
          </div>

          <Link to="/tasks" className="flex items-center gap-3 px-5 py-3.5 text-white/70 cursor-pointer transition-all border-l-[3px] border-transparent hover:bg-white/10 hover:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeWidth="2" />
            </svg>
            <span className="text-[15px] font-medium">Tasks</span>
          </Link>

          <div className="flex items-center gap-3 px-5 py-3.5 text-white/70 cursor-pointer transition-all border-l-[3px] border-transparent hover:bg-white/10 hover:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" />
            </svg>
            <span className="text-[15px] font-medium">Completed</span>
          </div>

          <div className="flex items-center gap-3 px-5 py-3.5 text-white/70 cursor-pointer transition-all border-l-[3px] border-transparent hover:bg-white/10 hover:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="9" strokeWidth="2" />
              <path d="M12 6v6l4 2" strokeWidth="2" />
            </svg>
            <span className="text-[15px] font-medium">In Progress</span>
          </div>

          <div className="flex items-center gap-3 px-5 py-3.5 text-white/70 cursor-pointer transition-all border-l-[3px] border-transparent hover:bg-white/10 hover:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" />
            </svg>
            <span className="text-[15px] font-medium">To Do</span>
          </div>

          <div className="flex items-center gap-3 px-5 py-3.5 text-white/70 cursor-pointer transition-all border-l-[3px] border-transparent hover:bg-white/10 hover:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="2" />
            </svg>
            <span className="text-[15px] font-medium">Trash</span>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="ml-64 flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white px-8 py-4 flex justify-between items-center border-b-2 border-black sticky top-0 z-50">
          <div className="flex items-center gap-3 bg-gray-100 px-4 py-2.5 rounded-none w-96 border border-gray-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666">
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <path d="M21 21l-4.35-4.35" strokeWidth="2" />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              className="border-none bg-transparent outline-none flex-1 text-sm text-black placeholder-gray-500"
            />
          </div>

          <div className="flex items-center gap-5">
            <div className="w-10 h-10 rounded-none bg-black flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
              <span className="text-white font-bold text-sm">CA</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div className="bg-white border-2 border-black rounded-none p-6 flex justify-between items-center hover:-translate-y-0.5 transition-all">
              <div className="flex-1">
                <h3 className="text-xs font-semibold text-gray-600 mb-2 tracking-wide">TOTAL TASK</h3>
                <p className="text-[32px] font-bold text-black mb-1">9</p>
                <p className="text-xs text-gray-500">111 last month</p>
              </div>
              <div className="w-12 h-12 rounded-none bg-black flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="2" />
                </svg>
              </div>
            </div>

            <div className="bg-white border-2 border-black rounded-none p-6 flex justify-between items-center hover:-translate-y-0.5 transition-all">
              <div className="flex-1">
                <h3 className="text-xs font-semibold text-gray-600 mb-2 tracking-wide">COMPLETED TASK</h3>
                <p className="text-[32px] font-bold text-black mb-1">1</p>
                <p className="text-xs text-gray-500">111 last month</p>
              </div>
              <div className="w-12 h-12 rounded-none bg-gray-600 flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" />
                  <path d="M8 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            <div className="bg-white border-2 border-black rounded-none p-6 flex justify-between items-center hover:-translate-y-0.5 transition-all">
              <div className="flex-1">
                <h3 className="text-xs font-semibold text-gray-600 mb-2 tracking-wide">TASK IN PROGRESS</h3>
                <p className="text-[32px] font-bold text-black mb-1">3</p>
                <p className="text-xs text-gray-500">111 last month</p>
              </div>
              <div className="w-12 h-12 rounded-none bg-gray-400 flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2" />
                  <path d="M12 6v6l4 2" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <div className="bg-white border-2 border-black rounded-none p-6 flex justify-between items-center hover:-translate-y-0.5 transition-all">
              <div className="flex-1">
                <h3 className="text-xs font-semibold text-gray-600 mb-2 tracking-wide">TODOS</h3>
                <p className="text-[32px] font-bold text-black mb-1">5</p>
                <p className="text-xs text-gray-500">111 last month</p>
              </div>
              <div className="w-12 h-12 rounded-none bg-gray-300 flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="black" strokeWidth="2" />
                  <line x1="12" y1="8" x2="12" y2="12" stroke="black" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="16" r="1" fill="black" />
                </svg>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* Wave/Area Chart */}
            <div className="bg-white border-2 border-black rounded-none p-6">
              <h3 className="text-lg font-bold text-black mb-4">Task Progress Over Week</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={taskProgressData}>
                  <defs>
                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#000000" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#000000" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorInProgress" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#666666" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#666666" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorTodo" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#999999" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#999999" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis dataKey="day" stroke="#000" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#000" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '2px solid #000',
                      borderRadius: '0',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Area
                    type="monotone"
                    dataKey="completed"
                    stroke="#000000"
                    fillOpacity={1}
                    fill="url(#colorCompleted)"
                    name="Completed"
                  />
                  <Area
                    type="monotone"
                    dataKey="inProgress"
                    stroke="#666666"
                    fillOpacity={1}
                    fill="url(#colorInProgress)"
                    name="In Progress"
                  />
                  <Area
                    type="monotone"
                    dataKey="todo"
                    stroke="#999999"
                    fillOpacity={1}
                    fill="url(#colorTodo)"
                    name="To Do"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Histogram/Bar Chart */}
            <div className="bg-white border-2 border-black rounded-none p-6">
              <h3 className="text-lg font-bold text-black mb-4">Weekly Task Activity</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis dataKey="week" stroke="#000" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#000" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '2px solid #000',
                      borderRadius: '0',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar
                    dataKey="tasks"
                    fill="#000000"
                    radius={[0, 0, 0, 0]}
                    name="Tasks Completed"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Additional Wave Chart */}
          <div className="bg-white border-2 border-black rounded-none p-6 mt-6">
            <h3 className="text-lg font-bold text-black mb-4">Task Completion Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={taskProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis dataKey="day" stroke="#000" style={{ fontSize: '12px' }} />
                <YAxis stroke="#000" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '2px solid #000',
                    borderRadius: '0',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line
                  type="monotone"
                  dataKey="completed"
                  stroke="#000000"
                  strokeWidth={3}
                  dot={{ fill: '#000000', r: 5 }}
                  activeDot={{ r: 7 }}
                  name="Completed"
                />
                <Line
                  type="monotone"
                  dataKey="inProgress"
                  stroke="#666666"
                  strokeWidth={3}
                  dot={{ fill: '#666666', r: 5 }}
                  activeDot={{ r: 7 }}
                  name="In Progress"
                />
                <Line
                  type="monotone"
                  dataKey="todo"
                  stroke="#999999"
                  strokeWidth={3}
                  dot={{ fill: '#999999', r: 5 }}
                  activeDot={{ r: 7 }}
                  name="To Do"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
