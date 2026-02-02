import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { API_BASE_URL } from './config';

const socket = io(API_BASE_URL);

function TaskDetail() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Get current user from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    setCurrentUser(user);

    // Fetch task details
    const fetchTask = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/tasks/${taskId}`);
        const data = await response.json();
        if (response.ok) {
          setTask(data.task);
        }
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();

    // Join the task room
    socket.emit('join-task', { taskId, user });

    // Listen for chat messages
    socket.on('receive-message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    // Listen for drawing events
    socket.on('draw', (data) => {
      if (canvasRef.current && ctxRef.current) {
        const ctx = ctxRef.current;
        ctx.strokeStyle = data.color;
        ctx.lineWidth = data.lineWidth;
        ctx.beginPath();
        ctx.moveTo(data.x0, data.y0);
        ctx.lineTo(data.x1, data.y1);
        ctx.stroke();
      }
    });

    // Listen for canvas clear
    socket.on('clear-canvas', () => {
      if (canvasRef.current && ctxRef.current) {
        const ctx = ctxRef.current;
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    });

    return () => {
      socket.emit('leave-task', taskId);
      socket.off('receive-message');
      socket.off('draw');
      socket.off('clear-canvas');
    };
  }, [taskId]);

  useEffect(() => {
    // Initialize canvas
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctxRef.current = ctx;
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && currentUser) {
      const message = {
        taskId,
        user: currentUser.username,
        userId: currentUser.id,
        text: newMessage,
        timestamp: new Date().toISOString(),
      };
      socket.emit('send-message', message);
      setNewMessage('');
    }
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x1 = e.clientX - rect.left;
    const y1 = e.clientY - rect.top;

    const ctx = ctxRef.current;
    const x0 = ctx.currentX || x1;
    const y0 = ctx.currentY || y1;

    ctx.lineTo(x1, y1);
    ctx.stroke();

    // Emit drawing data to other users
    socket.emit('drawing', {
      taskId,
      x0,
      y0,
      x1,
      y1,
      color: ctx.strokeStyle,
      lineWidth: ctx.lineWidth,
    });

    ctx.currentX = x1;
    ctx.currentY = y1;
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (ctxRef.current) {
      ctxRef.current.currentX = undefined;
      ctxRef.current.currentY = undefined;
    }
  };

  const clearCanvas = () => {
    if (canvasRef.current && ctxRef.current) {
      const ctx = ctxRef.current;
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      socket.emit('clear-canvas', taskId);
    }
  };

  const changeColor = (color) => {
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = color;
    }
  };

  const changeLineWidth = (width) => {
    if (ctxRef.current) {
      ctxRef.current.lineWidth = width;
    }
  };

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-none h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Chat Section - Left Side */}
      <div className="w-1/3 bg-white border-r-2 border-black flex flex-col">
        {/* Header */}
        <div className="p-4 bg-black text-white">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-3 hover:opacity-80 transition-opacity"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h2 className="text-xl font-bold">{task.title}</h2>
          <p className="text-sm opacity-90">{task.teamName}</p>
        </div>

        {/* Task Info */}
        <div className="p-4 border-b-2 border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-3 py-1 rounded-none text-xs font-semibold border ${task.priority === 'high' ? 'bg-black text-white border-black' :
                task.priority === 'medium' ? 'bg-gray-600 text-white border-gray-600' :
                  'bg-gray-200 text-black border-gray-400'
              }`}>
              {task.priority}
            </span>
            <span className={`px-3 py-1 rounded-none text-xs font-semibold border ${task.status === 'completed' ? 'bg-gray-200 text-black border-black' :
                'bg-gray-100 text-gray-800 border-gray-400'
              }`}>
              {task.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-2">{task.description}</p>
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
            <span>📅 Due: {new Date(task.endDate).toLocaleDateString()}</span>
            <span>⏱️ {task.duration} days</span>
          </div>
        </div>

        {/* Team Members */}
        <div className="p-4 border-b-2 border-gray-200">
          <h3 className="text-sm font-semibold text-black mb-2">Team Members</h3>
          <div className="flex flex-wrap gap-2">
            {task.members?.map((member, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-none px-3 py-2">
                <div className="w-8 h-8 rounded-none bg-black flex items-center justify-center text-white text-xs font-semibold">
                  {member.username?.substring(0, 2).toUpperCase() || 'TM'}
                </div>
                <span className="text-sm text-black">{member.username}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.userId === currentUser?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs rounded-none px-4 py-2 ${msg.userId === currentUser?.id
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-black border border-gray-300'
                  }`}
              >
                <p className="text-xs font-semibold mb-1 opacity-80">{msg.user}</p>
                <p className="text-sm">{msg.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <form onSubmit={sendMessage} className="p-4 border-t-2 border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-none focus:outline-none focus:border-black"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-none hover:bg-gray-800 transition-colors"
            >
              Send
            </button>
          </div>
        </form>
      </div>

      {/* Whiteboard Section - Right Side */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b-2 border-black p-4 flex items-center gap-4">
          <h3 className="text-lg font-semibold text-black">Collaborative Whiteboard</h3>
          <div className="flex-1"></div>

          {/* Color Picker */}
          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-600">Color:</span>
            <button onClick={() => changeColor('#000000')} className="w-8 h-8 rounded-none bg-black border-2 border-gray-300 hover:border-black"></button>
            <button onClick={() => changeColor('#666666')} className="w-8 h-8 rounded-none bg-gray-500 border-2 border-gray-300 hover:border-black"></button>
            <button onClick={() => changeColor('#999999')} className="w-8 h-8 rounded-none bg-gray-400 border-2 border-gray-300 hover:border-black"></button>
            <button onClick={() => changeColor('#cccccc')} className="w-8 h-8 rounded-none bg-gray-300 border-2 border-gray-300 hover:border-black"></button>
            <button onClick={() => changeColor('#ffffff')} className="w-8 h-8 rounded-none bg-white border-2 border-gray-300 hover:border-black"></button>
          </div>

          {/* Line Width */}
          <div className="flex gap-2 items-center ml-4">
            <span className="text-sm text-gray-600">Size:</span>
            <button onClick={() => changeLineWidth(2)} className="w-8 h-8 rounded-none border-2 border-gray-300 hover:border-black flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-black"></div>
            </button>
            <button onClick={() => changeLineWidth(5)} className="w-8 h-8 rounded-none border-2 border-gray-300 hover:border-black flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-black"></div>
            </button>
            <button onClick={() => changeLineWidth(10)} className="w-8 h-8 rounded-none border-2 border-gray-300 hover:border-black flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-black"></div>
            </button>
          </div>

          {/* Clear Button */}
          <button
            onClick={clearCanvas}
            className="ml-4 px-4 py-2 bg-black text-white rounded-none hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear
          </button>
        </div>

        {/* Canvas */}
        <div className="flex-1 flex items-center justify-center bg-gray-50 p-8">
          <canvas
            ref={canvasRef}
            width={1200}
            height={700}
            className="bg-white border-2 border-black cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </div>
      </div>
    </div>
  );
}

export default TaskDetail;
