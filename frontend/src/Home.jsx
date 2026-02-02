function Home() {
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
          <div className="flex items-center gap-3 px-5 py-3.5 text-white cursor-pointer transition-all border-l-[3px] border-white bg-primary/30">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="3" width="7" height="7" strokeWidth="2"/>
              <rect x="14" y="3" width="7" height="7" strokeWidth="2"/>
              <rect x="3" y="14" width="7" height="7" strokeWidth="2"/>
              <rect x="14" y="14" width="7" height="7" strokeWidth="2"/>
            </svg>
            <span className="text-[15px] font-medium">Dashboard</span>
          </div>
          
          <div className="flex items-center gap-3 px-5 py-3.5 text-white/70 cursor-pointer transition-all border-l-[3px] border-transparent hover:bg-white/10 hover:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeWidth="2"/>
            </svg>
            <span className="text-[15px] font-medium">Tasks</span>
          </div>
          
          <div className="flex items-center gap-3 px-5 py-3.5 text-white/70 cursor-pointer transition-all border-l-[3px] border-transparent hover:bg-white/10 hover:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2"/>
            </svg>
            <span className="text-[15px] font-medium">Completed</span>
          </div>
          
          <div className="flex items-center gap-3 px-5 py-3.5 text-white/70 cursor-pointer transition-all border-l-[3px] border-transparent hover:bg-white/10 hover:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="9" strokeWidth="2"/>
              <path d="M12 6v6l4 2" strokeWidth="2"/>
            </svg>
            <span className="text-[15px] font-medium">In Progress</span>
          </div>
          
          <div className="flex items-center gap-3 px-5 py-3.5 text-white/70 cursor-pointer transition-all border-l-[3px] border-transparent hover:bg-white/10 hover:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2"/>
            </svg>
            <span className="text-[15px] font-medium">To Do</span>
          </div>
          
          <div className="flex items-center gap-3 px-5 py-3.5 text-white/70 cursor-pointer transition-all border-l-[3px] border-transparent hover:bg-white/10 hover:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="2"/>
            </svg>
            <span className="text-[15px] font-medium">Trash</span>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="ml-64 flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white px-8 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
          <div className="flex items-center gap-3 bg-gray-100 px-4 py-2.5 rounded-lg w-96">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999">
              <circle cx="11" cy="11" r="8" strokeWidth="2"/>
              <path d="M21 21l-4.35-4.35" strokeWidth="2"/>
            </svg>
            <input 
              type="text" 
              placeholder="Search..." 
              className="border-none bg-transparent outline-none flex-1 text-sm text-gray-700 placeholder-gray-400"
            />
          </div>
          
          <div className="flex items-center gap-5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
              <span className="text-white font-bold text-sm">CA</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div className="bg-white rounded-xl p-6 flex justify-between items-center shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all">
              <div className="flex-1">
                <h3 className="text-xs font-semibold text-gray-600 mb-2 tracking-wide">TOTAL TASK</h3>
                <p className="text-[32px] font-bold text-gray-800 mb-1">9</p>
                <p className="text-xs text-gray-400">111 last month</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 flex justify-between items-center shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all">
              <div className="flex-1">
                <h3 className="text-xs font-semibold text-gray-600 mb-2 tracking-wide">COMPLETED TASK</h3>
                <p className="text-[32px] font-bold text-gray-800 mb-1">1</p>
                <p className="text-xs text-gray-400">111 last month</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-success flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/>
                  <path d="M8 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 flex justify-between items-center shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all">
              <div className="flex-1">
                <h3 className="text-xs font-semibold text-gray-600 mb-2 tracking-wide">TASK IN PROGRESS</h3>
                <p className="text-[32px] font-bold text-gray-800 mb-1">3</p>
                <p className="text-xs text-gray-400">111 last month</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-warning flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/>
                  <path d="M12 6v6l4 2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 flex justify-between items-center shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all">
              <div className="flex-1">
                <h3 className="text-xs font-semibold text-gray-600 mb-2 tracking-wide">TODOS</h3>
                <p className="text-[32px] font-bold text-gray-800 mb-1">5</p>
                <p className="text-xs text-gray-400">111 last month</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-pink flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/>
                  <line x1="12" y1="8" x2="12" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="16" r="1" fill="white"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
