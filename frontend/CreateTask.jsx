import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from './src/config';

function CreateTask() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [formData, setFormData] = useState({
        teamName: '',
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        priority: 'medium'
    });
    const [errors, setErrors] = useState({});

    // Fetch employees for member selection
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/auth/users`);
                const data = await response.json();
                if (response.ok) {
                    setEmployees(data.users.filter(user => user.role === 'employee'));
                }
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };
        fetchEmployees();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleMemberToggle = (employeeId) => {
        setSelectedMembers(prev => {
            if (prev.includes(employeeId)) {
                return prev.filter(id => id !== employeeId);
            } else {
                return [...prev, employeeId];
            }
        });
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.teamName.trim()) {
            newErrors.teamName = 'Team name is required';
        }

        if (!formData.title.trim()) {
            newErrors.title = 'Task title is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (formData.description.length < 20) {
            newErrors.description = 'Description must be at least 20 characters';
        }

        if (!formData.startDate) {
            newErrors.startDate = 'Start date is required';
        }

        if (!formData.endDate) {
            newErrors.endDate = 'End date is required';
        }

        if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
            newErrors.endDate = 'End date must be after start date';
        }

        if (selectedMembers.length === 0) {
            newErrors.members = 'Please select at least one team member';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            // Calculate duration in days
            const start = new Date(formData.startDate);
            const end = new Date(formData.endDate);
            const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

            const taskData = {
                teamName: formData.teamName,
                title: formData.title,
                description: formData.description,
                priority: formData.priority,
                startDate: formData.startDate,
                endDate: formData.endDate,
                members: selectedMembers,
                duration: duration
            };

            // Send to backend API
            const response = await fetch(`${API_BASE_URL}/api/tasks/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Task created successfully!');
                navigate('/home2');
            } else {
                setErrors({ submit: data.message || 'Failed to create task' });
            }

        } catch (error) {
            console.error('Error creating task:', error);
            setErrors({ submit: 'Failed to create task. Please check if the server is running.' });
        } finally {
            setLoading(false);
        }
    };

    const calculateDuration = () => {
        if (formData.startDate && formData.endDate) {
            const start = new Date(formData.startDate);
            const end = new Date(formData.endDate);
            const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
            return days > 0 ? `${days} day${days !== 1 ? 's' : ''}` : '0 days';
        }
        return 'Not set';
    };

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
                    <Link to="/home2" className="flex items-center gap-3 px-5 py-3.5 text-white/70 cursor-pointer transition-all border-l-[3px] border-transparent hover:bg-white/10 hover:text-white">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" />
                        </svg>
                        <span className="text-[15px] font-medium">Employees</span>
                    </Link>

                    <Link to="/create-task" className="flex items-center gap-3 px-5 py-3.5 text-white cursor-pointer transition-all border-l-[3px] border-white bg-white/10">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M12 4v16m8-8H4" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span className="text-[15px] font-medium">Create Task</span>
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="ml-64 flex-1 flex flex-col">
                {/* Top Navigation */}
                <header className="bg-white px-8 py-4 flex justify-between items-center border-b-2 border-black sticky top-0 z-50">
                    <div>
                        <h1 className="text-2xl font-bold text-black">Create New Task</h1>
                        <p className="text-sm text-gray-500">Assign a new task to your team members</p>
                    </div>

                    <Link to="/home2" className="px-4 py-2 text-gray-600 hover:text-black transition-colors">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </Link>
                </header>

                {/* Form Content */}
                <div className="p-8 bg-gray-50 min-h-screen">
                    <div className="max-w-4xl mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="bg-white border-2 border-black rounded-none p-8 mb-6">
                                <h2 className="text-xl font-bold text-black mb-6">Task Details</h2>

                                {/* Team Name */}
                                <div className="mb-6">
                                    <label htmlFor="teamName" className="block text-sm font-semibold text-black mb-2">
                                        Team Name <span className="text-black">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="teamName"
                                        name="teamName"
                                        value={formData.teamName}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border-2 rounded-none text-sm transition-all outline-none ${errors.teamName ? 'border-black bg-gray-100' : 'border-gray-300'
                                            } focus:border-black`}
                                        placeholder="e.g., Development Team, Design Team"
                                    />
                                    {errors.teamName && <span className="text-black text-xs mt-1">{errors.teamName}</span>}
                                </div>

                                {/* Task Title */}
                                <div className="mb-6">
                                    <label htmlFor="title" className="block text-sm font-semibold text-black mb-2">
                                        Task Title <span className="text-black">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 border-2 rounded-none text-sm transition-all outline-none ${errors.title ? 'border-black bg-gray-100' : 'border-gray-300'
                                            } focus:border-black`}
                                        placeholder="Enter task title"
                                    />
                                    {errors.title && <span className="text-black text-xs mt-1">{errors.title}</span>}
                                </div>

                                {/* Priority */}
                                <div className="mb-6">
                                    <label htmlFor="priority" className="block text-sm font-semibold text-black mb-2">
                                        Priority
                                    </label>
                                    <select
                                        id="priority"
                                        name="priority"
                                        value={formData.priority}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-none text-sm transition-all outline-none focus:border-black"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>

                                {/* Description */}
                                <div className="mb-6">
                                    <label htmlFor="description" className="block text-sm font-semibold text-black mb-2">
                                        Description <span className="text-black">*</span>
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="6"
                                        className={`w-full px-4 py-3 border-2 rounded-none text-sm transition-all outline-none resize-none ${errors.description ? 'border-black bg-gray-100' : 'border-gray-300'
                                            } focus:border-black`}
                                        placeholder="Provide a detailed description of the task, requirements, and expected outcomes..."
                                    />
                                    <div className="flex justify-between items-center mt-1">
                                        {errors.description && <span className="text-black text-xs">{errors.description}</span>}
                                        <span className="text-xs text-gray-500 ml-auto">{formData.description.length} characters</span>
                                    </div>
                                </div>
                            </div>

                            {/* Duration Section */}
                            <div className="bg-white border-2 border-black rounded-none p-8 mb-6">
                                <h2 className="text-xl font-bold text-black mb-6">Task Duration</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                    {/* Start Date */}
                                    <div>
                                        <label htmlFor="startDate" className="block text-sm font-semibold text-black mb-2">
                                            Start Date <span className="text-black">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            id="startDate"
                                            name="startDate"
                                            value={formData.startDate}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border-2 rounded-none text-sm transition-all outline-none ${errors.startDate ? 'border-black bg-gray-100' : 'border-gray-300'
                                                } focus:border-black`}
                                        />
                                        {errors.startDate && <span className="text-black text-xs mt-1">{errors.startDate}</span>}
                                    </div>

                                    {/* End Date */}
                                    <div>
                                        <label htmlFor="endDate" className="block text-sm font-semibold text-black mb-2">
                                            End Date <span className="text-black">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            id="endDate"
                                            name="endDate"
                                            value={formData.endDate}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 border-2 rounded-none text-sm transition-all outline-none ${errors.endDate ? 'border-black bg-gray-100' : 'border-gray-300'
                                                } focus:border-black`}
                                        />
                                        {errors.endDate && <span className="text-black text-xs mt-1">{errors.endDate}</span>}
                                    </div>
                                </div>

                                {/* Duration Display */}
                                <div className="bg-gray-100 border-2 border-black rounded-none p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-black">Total Duration:</span>
                                        <span className="text-lg font-bold text-black">{calculateDuration()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Team Members Section */}
                            <div className="bg-white border-2 border-black rounded-none p-8 mb-6">
                                <h2 className="text-xl font-bold text-black mb-2">Assign Team Members</h2>
                                <p className="text-sm text-gray-500 mb-6">Select one or more team members to assign this task</p>

                                {errors.members && (
                                    <div className="bg-gray-100 border-2 border-black rounded-none p-3 mb-4">
                                        <span className="text-black text-sm font-medium">{errors.members}</span>
                                    </div>
                                )}

                                {/* Search Bar */}
                                <div className="mb-6">
                                    <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-none border border-gray-300">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666">
                                            <circle cx="11" cy="11" r="8" strokeWidth="2" />
                                            <path d="M21 21l-4.35-4.35" strokeWidth="2" />
                                        </svg>
                                        <input
                                            type="text"
                                            placeholder="Search employees by name or email..."
                                            className="border-none bg-transparent outline-none flex-1 text-sm text-black placeholder-gray-500"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        {searchQuery && (
                                            <button
                                                onClick={() => setSearchQuery('')}
                                                className="text-gray-500 hover:text-black"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {employees.length === 0 ? (
                                        <p className="text-gray-500 text-sm col-span-2">No employees available</p>
                                    ) : employees.filter(employee =>
                                        employee.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        employee.email.toLowerCase().includes(searchQuery.toLowerCase())
                                    ).length === 0 ? (
                                        <div className="col-span-2 text-center py-8">
                                            <p className="text-gray-500 text-sm">No employees found matching "{searchQuery}"</p>
                                        </div>
                                    ) : (
                                        employees
                                            .filter(employee =>
                                                employee.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                employee.email.toLowerCase().includes(searchQuery.toLowerCase())
                                            )
                                            .map((employee) => (
                                                <div
                                                    key={employee.id}
                                                    onClick={() => handleMemberToggle(employee.id)}
                                                    className={`border-2 rounded-none p-4 cursor-pointer transition-all ${selectedMembers.includes(employee.id)
                                                            ? 'border-black bg-gray-100'
                                                            : 'border-gray-300 hover:border-gray-500'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-none flex items-center justify-center ${selectedMembers.includes(employee.id)
                                                                ? 'bg-black'
                                                                : 'bg-gray-600'
                                                            }`}>
                                                            {selectedMembers.includes(employee.id) ? (
                                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                                                    <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            ) : (
                                                                <span className="text-white font-bold text-sm">
                                                                    {employee.username.substring(0, 2).toUpperCase()}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold text-black">{employee.username}</h3>
                                                            <p className="text-xs text-gray-500">{employee.email}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                    )}
                                </div>

                                {selectedMembers.length > 0 && (
                                    <div className="mt-4 bg-gray-100 border-2 border-black rounded-none p-3">
                                        <span className="text-black text-sm font-medium">
                                            {selectedMembers.length} member{selectedMembers.length !== 1 ? 's' : ''} selected
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Submit Section */}
                            <div className="bg-white border-2 border-black rounded-none p-8">
                                {errors.submit && (
                                    <div className="bg-gray-100 border-2 border-black rounded-none p-3 mb-4">
                                        <span className="text-black text-sm font-medium">{errors.submit}</span>
                                    </div>
                                )}

                                <div className="flex gap-4">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 bg-black text-white py-3 px-6 rounded-none font-semibold hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Creating Task...' : 'Create Task'}
                                    </button>
                                    <Link
                                        to="/home2"
                                        className="px-6 py-3 border-2 border-gray-300 text-black rounded-none font-semibold hover:border-black transition-all text-center"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateTask;
