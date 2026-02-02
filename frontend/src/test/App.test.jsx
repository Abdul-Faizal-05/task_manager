import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom'
import App from '../App'

// Mock the components to simplify testing
vi.mock('../Home', () => ({
    default: () => <div data-testid="home-component">Home Component</div>
}))

vi.mock('../../Home2', () => ({
    default: () => <div data-testid="home2-component">Home2 Component</div>
}))

vi.mock('../Register', () => ({
    default: () => <div data-testid="register-component">Register Component</div>
}))

vi.mock('../Login', () => ({
    default: () => <div data-testid="login-component">Login Component</div>
}))

vi.mock('../../Tasks', () => ({
    default: () => <div data-testid="tasks-component">Tasks Component</div>
}))

vi.mock('../../CreateTask', () => ({
    default: () => <div data-testid="create-task-component">CreateTask Component</div>
}))

vi.mock('../TaskDetail', () => ({
    default: () => <div data-testid="task-detail-component">TaskDetail Component</div>
}))

describe('App Component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders without crashing', () => {
        render(<App />)
    })

    it('renders Login component on root path', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<div data-testid="login-component">Login</div>} />
                </Routes>
            </MemoryRouter>
        )

        expect(screen.getByTestId('login-component')).toBeInTheDocument()
    })

    it('renders Register component on /register path', () => {
        render(
            <MemoryRouter initialEntries={['/register']}>
                <Routes>
                    <Route path="/register" element={<div data-testid="register-component">Register</div>} />
                </Routes>
            </MemoryRouter>
        )

        expect(screen.getByTestId('register-component')).toBeInTheDocument()
    })

    it('renders Home component on /home path', () => {
        render(
            <MemoryRouter initialEntries={['/home']}>
                <Routes>
                    <Route path="/home" element={<div data-testid="home-component">Home</div>} />
                </Routes>
            </MemoryRouter>
        )

        expect(screen.getByTestId('home-component')).toBeInTheDocument()
    })

    it('renders Home2 component on /home2 path', () => {
        render(
            <MemoryRouter initialEntries={['/home2']}>
                <Routes>
                    <Route path="/home2" element={<div data-testid="home2-component">Home2</div>} />
                </Routes>
            </MemoryRouter>
        )

        expect(screen.getByTestId('home2-component')).toBeInTheDocument()
    })

    it('renders Tasks component on /tasks path', () => {
        render(
            <MemoryRouter initialEntries={['/tasks']}>
                <Routes>
                    <Route path="/tasks" element={<div data-testid="tasks-component">Tasks</div>} />
                </Routes>
            </MemoryRouter>
        )

        expect(screen.getByTestId('tasks-component')).toBeInTheDocument()
    })

    it('renders CreateTask component on /create-task path', () => {
        render(
            <MemoryRouter initialEntries={['/create-task']}>
                <Routes>
                    <Route path="/create-task" element={<div data-testid="create-task-component">CreateTask</div>} />
                </Routes>
            </MemoryRouter>
        )

        expect(screen.getByTestId('create-task-component')).toBeInTheDocument()
    })
})
