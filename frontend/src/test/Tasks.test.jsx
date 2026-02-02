import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Tasks from '../../Tasks'

// Mock fetch
global.fetch = vi.fn()

// Mock localStorage
const mockLocalStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    clear: vi.fn()
}
Object.defineProperty(window, 'localStorage', { value: mockLocalStorage })

// Wrapper component for Router
const renderWithRouter = (component) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    )
}

describe('Tasks Component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ id: 1, username: 'testuser' }))
    })

    it('renders sidebar with TaskMe branding', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ tasks: [] })
        })

        renderWithRouter(<Tasks />)

        expect(screen.getByText('TaskMe')).toBeInTheDocument()
    })

    it('renders page header', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ tasks: [] })
        })

        renderWithRouter(<Tasks />)

        expect(screen.getByText('Team Tasks')).toBeInTheDocument()
        expect(screen.getByText('Manage and track all team assignments')).toBeInTheDocument()
    })

    it('renders filter buttons', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ tasks: [] })
        })

        renderWithRouter(<Tasks />)

        expect(screen.getByText('All Tasks')).toBeInTheDocument()
        expect(screen.getByText('Pending')).toBeInTheDocument()
        expect(screen.getByText('Completed')).toBeInTheDocument()
    })

    it('renders search input', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ tasks: [] })
        })

        renderWithRouter(<Tasks />)

        expect(screen.getByPlaceholderText('Search tasks...')).toBeInTheDocument()
    })

    it('shows loading spinner initially', () => {
        global.fetch.mockImplementation(() => new Promise(() => { })) // Never resolves
        mockLocalStorage.getItem.mockReturnValue(JSON.stringify({ id: 1 }))

        renderWithRouter(<Tasks />)

        // The loading spinner should be present
        const spinner = document.querySelector('.animate-spin')
        expect(spinner).toBeInTheDocument()
    })

    it('displays tasks after loading', async () => {
        const mockTasks = [
            {
                _id: '1',
                title: 'Test Task 1',
                description: 'Description 1',
                status: 'pending',
                priority: 'high',
                teamName: 'Team A',
                members: [{ username: 'John' }],
                endDate: '2024-12-31'
            },
            {
                _id: '2',
                title: 'Test Task 2',
                description: 'Description 2',
                status: 'completed',
                priority: 'medium',
                teamName: 'Team B',
                members: [{ username: 'Jane' }],
                endDate: '2024-12-25'
            }
        ]

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ tasks: mockTasks })
        })

        renderWithRouter(<Tasks />)

        await waitFor(() => {
            expect(screen.getByText('Test Task 1')).toBeInTheDocument()
            expect(screen.getByText('Test Task 2')).toBeInTheDocument()
        })
    })

    it('shows "No tasks found" when no tasks match filter', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ tasks: [] })
        })

        renderWithRouter(<Tasks />)

        await waitFor(() => {
            expect(screen.getByText('No tasks found')).toBeInTheDocument()
        })
    })

    it('filters tasks when clicking filter buttons', async () => {
        const user = userEvent.setup()

        const mockTasks = [
            {
                _id: '1',
                title: 'Pending Task',
                description: 'Description',
                status: 'pending',
                priority: 'high',
                teamName: 'Team A',
                members: [],
                endDate: '2024-12-31'
            },
            {
                _id: '2',
                title: 'Completed Task',
                description: 'Description',
                status: 'completed',
                priority: 'medium',
                teamName: 'Team B',
                members: [],
                endDate: '2024-12-25'
            }
        ]

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ tasks: mockTasks })
        })

        renderWithRouter(<Tasks />)

        await waitFor(() => {
            expect(screen.getByText('Pending Task')).toBeInTheDocument()
        })

        // Click on Completed filter
        const completedFilter = screen.getByRole('button', { name: 'Completed' })
        await user.click(completedFilter)

        await waitFor(() => {
            expect(screen.getByText('Completed Task')).toBeInTheDocument()
            expect(screen.queryByText('Pending Task')).not.toBeInTheDocument()
        })
    })

    it('filters tasks by search query', async () => {
        const user = userEvent.setup()

        const mockTasks = [
            {
                _id: '1',
                title: 'Frontend Task',
                description: 'Description',
                status: 'pending',
                priority: 'high',
                teamName: 'Team A',
                members: [],
                endDate: '2024-12-31'
            },
            {
                _id: '2',
                title: 'Backend Task',
                description: 'Description',
                status: 'pending',
                priority: 'medium',
                teamName: 'Team B',
                members: [],
                endDate: '2024-12-25'
            }
        ]

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ tasks: mockTasks })
        })

        renderWithRouter(<Tasks />)

        await waitFor(() => {
            expect(screen.getByText('Frontend Task')).toBeInTheDocument()
        })

        const searchInput = screen.getByPlaceholderText('Search tasks...')
        await user.type(searchInput, 'Frontend')

        await waitFor(() => {
            expect(screen.getByText('Frontend Task')).toBeInTheDocument()
            expect(screen.queryByText('Backend Task')).not.toBeInTheDocument()
        })
    })

    it('displays task count correctly', async () => {
        const mockTasks = [
            { _id: '1', title: 'Task 1', description: '', status: 'pending', priority: 'high', members: [] },
            { _id: '2', title: 'Task 2', description: '', status: 'pending', priority: 'high', members: [] },
        ]

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ tasks: mockTasks })
        })

        renderWithRouter(<Tasks />)

        await waitFor(() => {
            expect(screen.getByText('Showing 2 of 2 tasks')).toBeInTheDocument()
        })
    })
})
