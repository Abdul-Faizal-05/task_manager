function Home() {
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <circle cx="12" cy="12" r="10" fill="#5b7fff"/>
          </svg>
          <span className="logo-text">TaskMe</span>
        </div>
        
        <nav className="nav-menu">
          <div className="nav-item active">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="3" width="7" height="7" strokeWidth="2"/>
              <rect x="14" y="3" width="7" height="7" strokeWidth="2"/>
              <rect x="3" y="14" width="7" height="7" strokeWidth="2"/>
              <rect x="14" y="14" width="7" height="7" strokeWidth="2"/>
            </svg>
            <span>Dashboard</span>
          </div>
          
          <div className="nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeWidth="2"/>
            </svg>
            <span>Tasks</span>
          </div>
          
          <div className="nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2"/>
            </svg>
            <span>Completed</span>
          </div>
          
          <div className="nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="9" strokeWidth="2"/>
              <path d="M12 6v6l4 2" strokeWidth="2"/>
            </svg>
            <span>In Progress</span>
          </div>
          
          <div className="nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2"/>
            </svg>
            <span>To Do</span>
          </div>
          
          <div className="nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth="2"/>
            </svg>
            <span>Trash</span>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navigation */}
        <header className="top-nav">
          <div className="search-bar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999">
              <circle cx="11" cy="11" r="8" strokeWidth="2"/>
              <path d="M21 21l-4.35-4.35" strokeWidth="2"/>
            </svg>
            <input type="text" placeholder="Search..." />
          </div>
          
          <div className="nav-right">
            <div className="user-profile">
              <span className="user-initials">CA</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-content">
                <h3 className="stat-title">TOTAL TASK</h3>
                <p className="stat-number">9</p>
                <p className="stat-subtitle">111 last month</p>
              </div>
              <div className="stat-icon blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" strokeWidth="2"/>
                </svg>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-content">
                <h3 className="stat-title">COMPLETED TASK</h3>
                <p className="stat-number">1</p>
                <p className="stat-subtitle">111 last month</p>
              </div>
              <div className="stat-icon green">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/>
                  <path d="M8 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-content">
                <h3 className="stat-title">TASK IN PROGRESS</h3>
                <p className="stat-number">3</p>
                <p className="stat-subtitle">111 last month</p>
              </div>
              <div className="stat-icon orange">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/>
                  <path d="M12 6v6l4 2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-content">
                <h3 className="stat-title">TODOS</h3>
                <p className="stat-number">5</p>
                <p className="stat-subtitle"> last month</p>
              </div>
              <div className="stat-icon pink">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="2"/>
                  <line x1="12" y1="8" x2="12" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="16" r="1" fill="white"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dashboard-layout {
          display: flex;
          min-height: 100vh;
          background-color: #f5f5f5;
        }

        /* Sidebar Styles */
        .sidebar {
          width: 250px;
          background: linear-gradient(180deg, #2d3a8c 0%, #1e2875 100%);
          padding: 20px 0;
          position: fixed;
          height: 100vh;
          left: 0;
          top: 0;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 20px;
          margin-bottom: 40px;
        }

        .logo-text {
          color: white;
          font-size: 20px;
          font-weight: 700;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.2s;
          border-left: 3px solid transparent;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .nav-item.active {
          background: rgba(91, 127, 255, 0.3);
          color: white;
          border-left-color: white;
        }

        .nav-item span {
          font-size: 15px;
          font-weight: 500;
        }

        /* Main Content */
        .main-content {
          margin-left: 250px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        /* Top Navigation */
        .top-nav {
          background: white;
          padding: 16px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #f5f5f5;
          padding: 10px 16px;
          border-radius: 8px;
          width: 400px;
        }

        .search-bar input {
          border: none;
          background: transparent;
          outline: none;
          flex: 1;
          font-size: 14px;
          color: #333;
        }

        .search-bar input::placeholder {
          color: #999;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .notification-icon {
          position: relative;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: background 0.2s;
        }

        .notification-icon:hover {
          background: #f5f5f5;
        }

        .notification-badge {
          position: absolute;
          top: 4px;
          right: 4px;
          background: #ef4444;
          color: white;
          font-size: 10px;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-profile {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .user-profile:hover {
          transform: scale(1.05);
        }

        .user-initials {
          color: white;
          font-weight: 700;
          font-size: 14px;
        }

        /* Dashboard Content */
        .dashboard-content {
          padding: 32px;
        }

        .stats-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          background: white;
          border-radius: 12px;
          padding: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .stat-content {
          flex: 1;
        }

        .stat-title {
          font-size: 12px;
          font-weight: 600;
          color: #666;
          margin: 0 0 8px 0;
          letter-spacing: 0.5px;
        }

        .stat-number {
          font-size: 32px;
          font-weight: 700;
          color: #333;
          margin: 0 0 4px 0;
        }

        .stat-subtitle {
          font-size: 12px;
          color: #999;
          margin: 0;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-icon.blue {
          background-color: #5b7fff;
        }

        .stat-icon.green {
          background-color: #0d9488;
        }

        .stat-icon.orange {
          background-color: #f59e0b;
        }

        .stat-icon.pink {
          background-color: #ec4899;
        }
      `}</style>
    </div>
  );
}

export default Home;