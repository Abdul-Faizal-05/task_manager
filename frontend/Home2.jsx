import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from './src/config';

function Home2() {
    const [employees, setEmployees] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [activeTab, setActiveTab] = useState('employees');
    const [taskFilter, setTaskFilter] = useState('all');
    const [taskSearchQuery, setTaskSearchQuery] = useState('');

    // Sample employee data - Replace with API call
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                console.log('Fetching employees from API...');
                const response = await fetch(`${API_BASE_URL}/api/auth/users`);
                console.log('Response status:', response.status);
                const data = await response.json();
                console.log('Response data:', data);

                if (response.ok) {
                    // Transform API data to match component structure
                    const transformedEmployees = data.users.map(user => ({
                        id: user.id,
                        name: user.username,
                        email: user.email,
                        role: user.role || 'employee',
                        department: getDepartmentByRole(user.role),
                        tasksAssigned: Math.floor(Math.random() * 10) + 1, // Replace with actual task data later
                        tasksCompleted: Math.floor(Math.random() * 8), // Replace with actual task data later
                        status: 'active',
                        joinDate: user.createdAt,
                        avatar: user.username.split(' ').map(n => n[0].toUpperCase()).join('').substring(0, 2)
                    }));

                    console.log('Transformed employees:', transformedEmployees);
                    setEmployees(transformedEmployees);
                } else {
                    console.error('Failed to fetch users:', data.message);
                    alert('Failed to fetch employees: ' + data.message);
                }
            } catch (error) {
                console.error('Error fetching employees:', error);
                alert('Error connecting to server. Make sure the backend is running on port 5000.');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/tasks/`);
                const data = await response.json();
                if (response.ok) {
                    setTasks(data.tasks);
                } else {
                    console.error('Failed to fetch tasks:', data.message);
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        if (activeTab === 'tasks') {
            fetchTasks();
        }
    }, [activeTab]);

    // Helper function to assign department based on role
    const getDepartmentByRole = (role) => {
        switch (role) {
            case 'admin':
                return 'Administration';
            case 'manager':
                return 'Management';
            default:
                return 'General';
        }
    };

    const filteredEmployees = employees.filter(emp => {
        const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.department.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = filterRole === 'all' || emp.role === filterRole;
        return matchesSearch && matchesRole;
    });

    const getStatusColor = (status) => {
        return status === 'active' ? 'bg-gray-200 text-black border border-black' : 'bg-gray-100 text-gray-600 border border-gray-400';
    };

    const getRoleBadgeColor = (role) => {
        switch (role) {
            case 'admin':
                return 'bg-black text-white';
            case 'manager':
                return 'bg-gray-600 text-white';
            default:
                return 'bg-gray-200 text-black';
        }
    };

    const totalTasks = employees.reduce((sum, emp) => sum + emp.tasksAssigned, 0);
    const completedTasks = employees.reduce((sum, emp) => sum + emp.tasksCompleted, 0);
    const activeEmployees = employees.filter(emp => emp.status === 'active').length;

    return (
        <div className="flex min-h-screen bg-white">
            {/* Sidebar */}
            <aside className="w-64 bg-black fixed h-screen left-0 top-0">
                <div className="flex items-center gap-3 px-5 py-5 mb-10">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none" />
                    </svg>
                    <span className="text-white text-xl font-bold">TaskMe Admin</span>
                </div>

                <nav className="flex flex-col">
                    <button
                        onClick={() => setActiveTab('employees')}
                        className={`flex items-center gap-3 px-5 py-3.5 cursor-pointer transition-all border-l-[3px] ${activeTab === 'employees'
                                ? 'text-white border-white bg-white/10'
                                : 'text-white/70 border-transparent hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" />
                        </svg>
                        <span className="text-[15px] font-medium">Employees</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('tasks')}
                        className={`flex items-center gap-3 px-5 py-3.5 cursor-pointer transition-all border-l-[3px] ${activeTab === 'tasks'
                                ? 'text-white border-white bg-white/10'
                                : 'text-white/70 border-transparent hover:bg-white/10 hover:text-white'
                            }`}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeWidth="2" />
                        </svg>
                        <span className="text-[15px] font-medium">Tasks</span>
                    </button>

                    <div className="flex items-center gap-3 px-5 py-3.5 text-white/70 cursor-pointer transition-all border-l-[3px] border-transparent hover:bg-white/10 hover:text-white">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeWidth="2" />
                        </svg>
                        <span className="text-[15px] font-medium">Reports</span>
                    </div>

                    <div className="flex items-center gap-3 px-5 py-3.5 text-white/70 cursor-pointer transition-all border-l-[3px] border-transparent hover:bg-white/10 hover:text-white">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeWidth="2" />
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" />
                        </svg>
                        <span className="text-[15px] font-medium">Settings</span>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="ml-64 flex-1 flex flex-col">
                {/* Top Navigation */}
                <header className="bg-white px-8 py-4 flex justify-between items-center border-b-2 border-black sticky top-0 z-50">
                    <div>
                        <h1 className="text-2xl font-bold text-black">Admin Dashboard</h1>
                        <p className="text-sm text-gray-500">Manage employees and tasks</p>
                    </div>

                    <div className="flex items-center gap-3 ml-auto mr-5">
                        {activeTab === 'tasks' && (
                            <Link
                                to="/create-task"
                                className="inline-flex items-center gap-2 bg-black text-white px-5 py-3 rounded-none font-semibold hover:bg-gray-800 transition-all mr-2"
                            >
                                + Create Task
                            </Link>
                        )}
                        <div className="w-10 h-10 rounded-none bg-black flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
                            <span className="text-white font-bold text-sm">AD</span>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="p-8 bg-gray-50 min-h-screen">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                        <div className="bg-white border-2 border-black rounded-none p-6 hover:-translate-y-0.5 transition-all">
                            <div className="flex justify-between items-center">
                                <div className="flex-1">
                                    <h3 className="text-xs font-semibold text-gray-600 mb-2 tracking-wide uppercase">Total Employees</h3>
                                    <p className="text-3xl font-bold text-black">{employees.length}</p>
                                </div>
                                <div className="w-12 h-12 rounded-none bg-black flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white">
                                        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border-2 border-black rounded-none p-6 hover:-translate-y-0.5 transition-all">
                            <div className="flex justify-between items-center">
                                <div className="flex-1">
                                    <h3 className="text-xs font-semibold text-gray-600 mb-2 tracking-wide uppercase">Active</h3>
                                    <p className="text-3xl font-bold text-black">{activeEmployees}</p>
                                </div>
                                <div className="w-12 h-12 rounded-none bg-gray-600 flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border-2 border-black rounded-none p-6 hover:-translate-y-0.5 transition-all">
                            <div className="flex justify-between items-center">
                                <div className="flex-1">
                                    <h3 className="text-xs font-semibold text-gray-600 mb-2 tracking-wide uppercase">Total Tasks</h3>
                                    <p className="text-3xl font-bold text-black">{totalTasks}</p>
                                </div>
                                <div className="w-12 h-12 rounded-none bg-gray-400 flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white">
                                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeWidth="2" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white border-2 border-black rounded-none p-6 hover:-translate-y-0.5 transition-all">
                            <div className="flex justify-between items-center">
                                <div className="flex-1">
                                    <h3 className="text-xs font-semibold text-gray-600 mb-2 tracking-wide uppercase">Completed</h3>
                                    <p className="text-3xl font-bold text-black">{completedTasks}</p>
                                </div>
                                <div className="w-12 h-12 rounded-none bg-gray-300 flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Employees Section */}
                    {activeTab === 'employees' && (
                        <>
                            {/* Search and Filters */}
                            <div className="bg-white border-2 border-black rounded-none p-6 mb-6">
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center gap-3 bg-gray-100 px-5 py-3 rounded-none w-full max-w-2xl border border-gray-300">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666">
                                            <circle cx="11" cy="11" r="8" strokeWidth="2" />
                                            <path d="M21 21l-4.35-4.35" strokeWidth="2" />
                                        </svg>
                                        <input
                                            type="text"
                                            placeholder="Search employees..."
                                            className="border-none bg-transparent outline-none flex-1 text-sm text-black placeholder-gray-500"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex gap-3 flex-wrap">
                                        <button
                                            onClick={() => setFilterRole('all')}
                                            className={`px-5 py-2.5 rounded-none text-sm font-semibold transition-all border-2 ${filterRole === 'all'
                                                    ? 'bg-black text-white border-black'
                                                    : 'bg-white text-black border-gray-300 hover:border-black'
                                                }`}
                                        >
                                            All Roles
                                        </button>
                                        <button
                                            onClick={() => setFilterRole('employee')}
                                            className={`px-5 py-2.5 rounded-none text-sm font-semibold transition-all border-2 ${filterRole === 'employee'
                                                    ? 'bg-black text-white border-black'
                                                    : 'bg-white text-black border-gray-300 hover:border-black'
                                                }`}
                                        >
                                            Employees
                                        </button>
                                        <button
                                            onClick={() => setFilterRole('manager')}
                                            className={`px-5 py-2.5 rounded-none text-sm font-semibold transition-all border-2 ${filterRole === 'manager'
                                                    ? 'bg-black text-white border-black'
                                                    : 'bg-white text-black border-gray-300 hover:border-black'
                                                }`}
                                        >
                                            Managers
                                        </button>
                                        <button
                                            onClick={() => setFilterRole('admin')}
                                            className={`px-5 py-2.5 rounded-none text-sm font-semibold transition-all border-2 ${filterRole === 'admin'
                                                    ? 'bg-black text-white border-black'
                                                    : 'bg-white text-black border-gray-300 hover:border-black'
                                                }`}
                                        >
                                            Admins
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Employees List */}
                            {loading ? (
                                <div className="flex justify-center items-center py-20">
                                    <div className="animate-spin rounded-none h-12 w-12 border-b-2 border-black"></div>
                                </div>
                            ) : (
                                <>
                                    <div className="mb-5">
                                        <p className="text-sm text-gray-600 font-medium">Showing {filteredEmployees.length} of {employees.length} employees</p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filteredEmployees.map((employee) => (
                                            <div
                                                key={employee.id}
                                                className="bg-white border-2 border-black rounded-none hover:-translate-y-0.5 transition-all duration-300 overflow-hidden group cursor-pointer"
                                            >
                                                <div className="p-6">
                                                    {/* Header */}
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-12 h-12 rounded-none bg-black flex items-center justify-center">
                                                                <span className="text-white font-bold text-sm">{employee.avatar}</span>
                                                            </div>
                                                            <div>
                                                                <h3 className="text-lg font-bold text-black group-hover:underline transition-all">
                                                                    {employee.name}
                                                                </h3>
                                                                <p className="text-xs text-gray-500">{employee.department}</p>
                                                            </div>
                                                        </div>
                                                        <div className={`px-3 py-1 rounded-none text-xs font-semibold ${getRoleBadgeColor(employee.role)}`}>
                                                            {employee.role}
                                                        </div>
                                                    </div>

                                                    {/* Email */}
                                                    <div className="mb-4">
                                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth="2" />
                                                            </svg>
                                                            <span className="text-xs">{employee.email}</span>
                                                        </div>
                                                    </div>

                                                    {/* Stats */}
                                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                                        <div className="bg-gray-100 border border-gray-300 rounded-none p-3">
                                                            <p className="text-xs text-gray-600 mb-1">Assigned</p>
                                                            <p className="text-xl font-bold text-black">{employee.tasksAssigned}</p>
                                                        </div>
                                                        <div className="bg-gray-100 border border-gray-300 rounded-none p-3">
                                                            <p className="text-xs text-gray-600 mb-1">Completed</p>
                                                            <p className="text-xl font-bold text-black">{employee.tasksCompleted}</p>
                                                        </div>
                                                    </div>

                                                    {/* Progress */}
                                                    <div className="mb-4">
                                                        <div className="flex justify-between items-center mb-2">
                                                            <span className="text-xs font-semibold text-gray-600">Completion Rate</span>
                                                            <span className="text-xs font-bold text-black">
                                                                {employee.tasksAssigned > 0 ? Math.round((employee.tasksCompleted / employee.tasksAssigned) * 100) : 0}%
                                                            </span>
                                                        </div>
                                                        <div className="w-full bg-gray-200 rounded-none h-2 overflow-hidden">
                                                            <div
                                                                className="bg-black h-2 rounded-none transition-all duration-500"
                                                                style={{
                                                                    width: `${employee.tasksAssigned > 0 ? (employee.tasksCompleted / employee.tasksAssigned) * 100 : 0}%`
                                                                }}
                                                            ></div>
                                                        </div>
                                                    </div>

                                                    {/* Footer */}
                                                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                                        <div className="flex items-center gap-2">
                                                            <div className={`px-3 py-1 rounded-none text-xs font-semibold ${getStatusColor(employee.status)}`}>
                                                                {employee.status}
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-xs text-gray-500">Joined</p>
                                                            <p className="text-xs font-semibold text-black">
                                                                {new Date(employee.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {filteredEmployees.length === 0 && (
                                        <div className="text-center py-20">
                                            <h3 className="text-xl font-bold text-black mb-2">No employees found</h3>
                                            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    )}

                    {/* Tasks Section */}
                    {activeTab === 'tasks' && (
                        <>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-black">Tasks Management</h2>
                                <p className="text-sm text-gray-500 mt-1">View and manage all tasks assigned to employees</p>
                            </div>

                            {/* Task Filters and Search */}
                            <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
                                <div className="flex gap-2 flex-wrap">
                                    <button
                                        onClick={() => setTaskFilter('all')}
                                        className={`px-4 py-2 rounded-none font-medium transition-all border-2 ${taskFilter === 'all'
                                                ? 'bg-black text-white border-black'
                                                : 'bg-white text-black border-gray-300 hover:border-black'
                                            }`}
                                    >
                                        All Tasks
                                    </button>
                                    <button
                                        onClick={() => setTaskFilter('pending')}
                                        className={`px-4 py-2 rounded-none font-medium transition-all border-2 ${taskFilter === 'pending'
                                                ? 'bg-gray-600 text-white border-gray-600'
                                                : 'bg-white text-gray-600 border-gray-300 hover:border-gray-600'
                                            }`}
                                    >
                                        Pending
                                    </button>

                                    <button
                                        onClick={() => setTaskFilter('completed')}
                                        className={`px-4 py-2 rounded-none font-medium transition-all border-2 ${taskFilter === 'completed'
                                                ? 'bg-gray-400 text-white border-gray-400'
                                                : 'bg-white text-gray-500 border-gray-300 hover:border-gray-400'
                                            }`}
                                    >
                                        Completed
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search tasks..."
                                    value={taskSearchQuery}
                                    onChange={(e) => setTaskSearchQuery(e.target.value)}
                                    className="px-4 py-2 border-2 border-gray-300 rounded-none focus:outline-none focus:border-black w-full sm:w-64"
                                />
                            </div>

                            {/* Tasks Grid */}
                            {loading ? (
                                <div className="text-center py-12">
                                    <div className="animate-spin rounded-none h-12 w-12 border-b-2 border-black mx-auto"></div>
                                    <p className="mt-4 text-gray-600">Loading tasks...</p>
                                </div>
                            ) : tasks.length === 0 ? (
                                <div className="text-center py-12">
                                    <h3 className="text-lg font-semibold text-black mb-2">No tasks yet</h3>
                                    <p className="text-gray-500">Click the "Create Task" button to assign your first task</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {tasks
                                        .filter(task => {
                                            const matchesFilter = taskFilter === 'all' || task.status === taskFilter;
                                            const matchesSearch = task.title?.toLowerCase().includes(taskSearchQuery.toLowerCase()) ||
                                                task.description?.toLowerCase().includes(taskSearchQuery.toLowerCase()) ||
                                                task.teamName?.toLowerCase().includes(taskSearchQuery.toLowerCase());
                                            return matchesFilter && matchesSearch;
                                        })
                                        .map((task) => (
                                            <Link
                                                key={task._id}
                                                to={`/task/${task._id}`}
                                                className="bg-white border-2 border-black rounded-none hover:-translate-y-0.5 transition-all duration-300 overflow-hidden block cursor-pointer"
                                            >
                                                <div className="p-6">
                                                    {/* Task Header */}
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className="flex-1">
                                                            <h3 className="text-lg font-bold text-black mb-1">{task.title}</h3>
                                                            <p className="text-sm text-gray-500">{task.teamName}</p>
                                                        </div>
                                                        <span className={`px-3 py-1 rounded-none text-xs font-semibold ${task.priority === 'high' ? 'bg-black text-white' :
                                                                task.priority === 'medium' ? 'bg-gray-600 text-white' :
                                                                    'bg-gray-200 text-black'
                                                            }`}>
                                                            {task.priority}
                                                        </span>
                                                    </div>

                                                    {/* Description */}
                                                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{task.description}</p>

                                                    {/* Status Badge */}
                                                    <div className="mb-4">
                                                        <span className={`inline-flex items-center px-3 py-1 rounded-none text-xs font-medium border ${task.status === 'completed' ? 'bg-gray-200 text-black border-black' :
                                                                'bg-gray-100 text-gray-800 border-gray-400'
                                                            }`}>
                                                            <span className={`w-2 h-2 rounded-full mr-2 ${task.status === 'completed' ? 'bg-black' :
                                                                    'bg-gray-600'
                                                                }`}></span>
                                                            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                                                        </span>
                                                    </div>

                                                    {/* Task Info */}
                                                    <div className="space-y-2 mb-4">
                                                        <div className="flex items-center text-sm text-gray-600">
                                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                            <span>Due: {new Date(task.endDate).toLocaleDateString()}</span>
                                                        </div>
                                                        <div className="flex items-center text-sm text-gray-600">
                                                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                            <span>Duration: {task.duration} days</span>
                                                        </div>
                                                    </div>

                                                    {/* Team Members */}
                                                    <div className="flex items-center">
                                                        <span className="text-sm text-gray-500 mr-2">Team:</span>
                                                        <div className="flex -space-x-2">
                                                            {task.members?.slice(0, 3).map((member, idx) => (
                                                                <div
                                                                    key={idx}
                                                                    className="w-8 h-8 rounded-none bg-black flex items-center justify-center text-white text-xs font-semibold border-2 border-white"
                                                                    title={member.username || 'Team Member'}
                                                                >
                                                                    {member.username ? member.username.substring(0, 2).toUpperCase() : 'TM'}
                                                                </div>
                                                            ))}
                                                            {task.members?.length > 3 && (
                                                                <div className="w-8 h-8 rounded-none bg-gray-300 flex items-center justify-center text-black text-xs font-semibold border-2 border-white">
                                                                    +{task.members.length - 3}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home2;