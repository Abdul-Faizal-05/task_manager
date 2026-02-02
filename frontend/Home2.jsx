import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home2(){
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [activeTab, setActiveTab] = useState('employees');

    // Sample employee data - Replace with API call
    useEffect(() => {
        const fetchEmployees = async () => {
            // Simulated data - replace with actual API call
            const sampleEmployees = [
                {
                    id: 1,
                    name: 'John Doe',
                    email: 'john.doe@company.com',
                    role: 'employee',
                    department: 'Frontend',
                    tasksAssigned: 5,
                    tasksCompleted: 3,
                    status: 'active',
                    joinDate: '2024-01-15',
                    avatar: 'JD'
                },
                {
                    id: 2,
                    name: 'Jane Smith',
                    email: 'jane.smith@company.com',
                    role: 'employee',
                    department: 'Backend',
                    tasksAssigned: 8,
                    tasksCompleted: 7,
                    status: 'active',
                    joinDate: '2023-11-20',
                    avatar: 'JS'
                },
                {
                    id: 3,
                    name: 'Mike Johnson',
                    email: 'mike.johnson@company.com',
                    role: 'employee',
                    department: 'Database',
                    tasksAssigned: 4,
                    tasksCompleted: 2,
                    status: 'active',
                    joinDate: '2024-03-10',
                    avatar: 'MJ'
                },
                {
                    id: 4,
                    name: 'Sarah Williams',
                    email: 'sarah.williams@company.com',
                    role: 'employee',
                    department: 'Testing',
                    tasksAssigned: 6,
                    tasksCompleted: 4,
                    status: 'active',
                    joinDate: '2023-09-05',
                    avatar: 'SW'
                },
                {
                    id: 5,
                    name: 'David Brown',
                    email: 'david.brown@company.com',
                    role: 'employee',
                    department: 'UI/UX',
                    tasksAssigned: 3,
                    tasksCompleted: 1,
                    status: 'active',
                    joinDate: '2024-02-01',
                    avatar: 'DB'
                },
                {
                    id: 6,
                    name: 'Emma Davis',
                    email: 'emma.davis@company.com',
                    role: 'employee',
                    department: 'Security',
                    tasksAssigned: 7,
                    tasksCompleted: 6,
                    status: 'active',
                    joinDate: '2023-07-12',
                    avatar: 'ED'
                },
                {
                    id: 7,
                    name: 'Robert Wilson',
                    email: 'robert.wilson@company.com',
                    role: 'manager',
                    department: 'Management',
                    tasksAssigned: 10,
                    tasksCompleted: 8,
                    status: 'active',
                    joinDate: '2022-05-15',
                    avatar: 'RW'
                },
                {
                    id: 8,
                    name: 'Lisa Anderson',
                    email: 'lisa.anderson@company.com',
                    role: 'employee',
                    department: 'Frontend',
                    tasksAssigned: 5,
                    tasksCompleted: 5,
                    status: 'active',
                    joinDate: '2023-12-08',
                    avatar: 'LA'
                }
            ];
            
            setTimeout(() => {
                setEmployees(sampleEmployees);
                setLoading(false);
            }, 500);
        };

        fetchEmployees();
    }, []);

    const filteredEmployees = employees.filter(emp => {
        const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            emp.department.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = filterRole === 'all' || emp.role === filterRole;
        return matchesSearch && matchesRole;
    });

    const getStatusColor = (status) => {
        return status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700';
    };

    const getRoleBadgeColor = (role) => {
        switch(role) {
            case 'admin':
                return 'bg-purple-100 text-purple-700';
            case 'manager':
                return 'bg-blue-100 text-blue-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const totalTasks = employees.reduce((sum, emp) => sum + emp.tasksAssigned, 0);
    const completedTasks = employees.reduce((sum, emp) => sum + emp.tasksCompleted, 0);
    const activeEmployees = employees.filter(emp => emp.status === 'active').length;

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gradient-to-b from-secondary to-[#1e2875] fixed h-screen left-0 top-0">
                <div className="flex items-center gap-3 px-5 py-5 mb-10">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <circle cx="12" cy="12" r="10" fill="#5b7fff"/>
                    </svg>
                    <span className="text-white text-xl font-bold">TaskMe Admin</span>
                </div>
                
                <nav className="flex flex-col">
                    <button 
                        onClick={() => setActiveTab('employees')}
                        className={`flex items-center gap-3 px-5 py-3.5 cursor-pointer transition-all border-l-[3px] ${
                            activeTab === 'employees' 
                                ? 'text-white border-white bg-primary/30' 
                                : 'text-white/70 border-transparent hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2"/>
                        </svg>
                        <span className="text-[15px] font-medium">Employees</span>
                    </button>
                    
                    <button 
                        onClick={() => setActiveTab('tasks')}
                        className={`flex items-center gap-3 px-5 py-3.5 cursor-pointer transition-all border-l-[3px] ${
                            activeTab === 'tasks' 
                                ? 'text-white border-white bg-primary/30' 
                                : 'text-white/70 border-transparent hover:bg-white/10 hover:text-white'
                        }`}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeWidth="2"/>
                        </svg>
                        <span className="text-[15px] font-medium">Tasks</span>
                    </button>

                    <div className="flex items-center gap-3 px-5 py-3.5 text-white/70 cursor-pointer transition-all border-l-[3px] border-transparent hover:bg-white/10 hover:text-white">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeWidth="2"/>
                        </svg>
                        <span className="text-[15px] font-medium">Reports</span>
                    </div>

                    <div className="flex items-center gap-3 px-5 py-3.5 text-white/70 cursor-pointer transition-all border-l-[3px] border-transparent hover:bg-white/10 hover:text-white">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeWidth="2"/>
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2"/>
                        </svg>
                        <span className="text-[15px] font-medium">Settings</span>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="ml-64 flex-1 flex flex-col">
                {/* Top Navigation */}
                <header className="bg-white px-8 py-4 flex justify-between items-center shadow-sm sticky top-0 z-50">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                        <p className="text-sm text-gray-500">Manage employees and tasks</p>
                    </div>
                    
                    <div className="flex items-center gap-5">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                            <span className="text-white font-bold text-sm">AD</span>
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="p-8 bg-gray-50 min-h-screen">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                            <div className="flex justify-between items-center">
                                <div className="flex-1">
                                    <h3 className="text-xs font-semibold text-gray-600 mb-2 tracking-wide uppercase">Total Employees</h3>
                                    <p className="text-3xl font-bold text-gray-800">{employees.length}</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white">
                                        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                            <div className="flex justify-between items-center">
                                <div className="flex-1">
                                    <h3 className="text-xs font-semibold text-gray-600 mb-2 tracking-wide uppercase">Active</h3>
                                    <p className="text-3xl font-bold text-gray-800">{activeEmployees}</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                            <div className="flex justify-between items-center">
                                <div className="flex-1">
                                    <h3 className="text-xs font-semibold text-gray-600 mb-2 tracking-wide uppercase">Total Tasks</h3>
                                    <p className="text-3xl font-bold text-gray-800">{totalTasks}</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white">
                                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" strokeWidth="2"/>
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                            <div className="flex justify-between items-center">
                                <div className="flex-1">
                                    <h3 className="text-xs font-semibold text-gray-600 mb-2 tracking-wide uppercase">Completed</h3>
                                    <p className="text-3xl font-bold text-gray-800">{completedTasks}</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Employees Section */}
                    {activeTab === 'employees' && (
                        <>
                            {/* Search and Filters */}
                            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-lg w-full max-w-2xl">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF">
                                            <circle cx="11" cy="11" r="8" strokeWidth="2"/>
                                            <path d="M21 21l-4.35-4.35" strokeWidth="2"/>
                                        </svg>
                                        <input 
                                            type="text" 
                                            placeholder="Search employees..." 
                                            className="border-none bg-transparent outline-none flex-1 text-sm text-gray-700 placeholder-gray-400"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex gap-3 flex-wrap">
                                        <button 
                                            onClick={() => setFilterRole('all')}
                                            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                                filterRole === 'all' 
                                                    ? 'bg-primary text-white shadow-md' 
                                                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                            }`}
                                        >
                                            All Roles
                                        </button>
                                        <button 
                                            onClick={() => setFilterRole('employee')}
                                            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                                filterRole === 'employee' 
                                                    ? 'bg-gray-500 text-white shadow-md' 
                                                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                            }`}
                                        >
                                            Employees
                                        </button>
                                        <button 
                                            onClick={() => setFilterRole('manager')}
                                            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                                filterRole === 'manager' 
                                                    ? 'bg-blue-500 text-white shadow-md' 
                                                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                            }`}
                                        >
                                            Managers
                                        </button>
                                        <button 
                                            onClick={() => setFilterRole('admin')}
                                            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                                filterRole === 'admin' 
                                                    ? 'bg-purple-500 text-white shadow-md' 
                                                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
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
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
                                                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100"
                                            >
                                                <div className="p-6">
                                                    {/* Header */}
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center">
                                                                <span className="text-white font-bold text-sm">{employee.avatar}</span>
                                                            </div>
                                                            <div>
                                                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                                                                    {employee.name}
                                                                </h3>
                                                                <p className="text-xs text-gray-500">{employee.department}</p>
                                                            </div>
                                                        </div>
                                                        <div className={`px-3 py-1 rounded-md text-xs font-semibold ${getRoleBadgeColor(employee.role)}`}>
                                                            {employee.role}
                                                        </div>
                                                    </div>

                                                    {/* Email */}
                                                    <div className="mb-4">
                                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth="2"/>
                                                            </svg>
                                                            <span className="text-xs">{employee.email}</span>
                                                        </div>
                                                    </div>

                                                    {/* Stats */}
                                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                                        <div className="bg-blue-50 rounded-lg p-3">
                                                            <p className="text-xs text-gray-600 mb-1">Assigned</p>
                                                            <p className="text-xl font-bold text-blue-600">{employee.tasksAssigned}</p>
                                                        </div>
                                                        <div className="bg-green-50 rounded-lg p-3">
                                                            <p className="text-xs text-gray-600 mb-1">Completed</p>
                                                            <p className="text-xl font-bold text-green-600">{employee.tasksCompleted}</p>
                                                        </div>
                                                    </div>

                                                    {/* Progress */}
                                                    <div className="mb-4">
                                                        <div className="flex justify-between items-center mb-2">
                                                            <span className="text-xs font-semibold text-gray-600">Completion Rate</span>
                                                            <span className="text-xs font-bold text-gray-900">
                                                                {employee.tasksAssigned > 0 ? Math.round((employee.tasksCompleted / employee.tasksAssigned) * 100) : 0}%
                                                            </span>
                                                        </div>
                                                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                                            <div 
                                                                className="bg-gradient-to-r from-primary to-[#667eea] h-2 rounded-full transition-all duration-500"
                                                                style={{ 
                                                                    width: `${employee.tasksAssigned > 0 ? (employee.tasksCompleted / employee.tasksAssigned) * 100 : 0}%` 
                                                                }}
                                                            ></div>
                                                        </div>
                                                    </div>

                                                    {/* Footer */}
                                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                        <div className="flex items-center gap-2">
                                                            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(employee.status)}`}>
                                                                {employee.status}
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-xs text-gray-500">Joined</p>
                                                            <p className="text-xs font-semibold text-gray-900">
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
                                            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <h3 className="text-lg font-semibold text-gray-700 mb-2">No employees found</h3>
                                            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    )}

                    {/* Tasks Section Placeholder */}
                    {activeTab === 'tasks' && (
                        <div className="bg-white rounded-xl p-12 shadow-sm text-center">
                            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Tasks Management</h3>
                            <p className="text-gray-600">View and manage all tasks assigned to employees</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home2;