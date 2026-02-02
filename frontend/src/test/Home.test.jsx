import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Home from '../Home'

// Mock recharts to avoid rendering issues in tests
vi.mock('recharts', () => ({
    LineChart: ({ children }) => <div data-testid="line-chart">{children}</div>,
    Line: () => null,
    BarChart: ({ children }) => <div data-testid="bar-chart">{children}</div>,
    Bar: () => null,
    XAxis: () => null,
    YAxis: () => null,
    CartesianGrid: () => null,
    Tooltip: () => null,
    Legend: () => null,
    ResponsiveContainer: ({ children }) => <div>{children}</div>,
    Area: () => null,
    AreaChart: ({ children }) => <div data-testid="area-chart">{children}</div>,
}))

// Wrapper component for Router
const renderWithRouter = (component) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    )
}

describe('Home Component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders sidebar with TaskMe branding', () => {
        renderWithRouter(<Home />)

        expect(screen.getByText('TaskMe')).toBeInTheDocument()
    })

    it('renders navigation items', () => {
        renderWithRouter(<Home />)

        expect(screen.getByText('Dashboard')).toBeInTheDocument()
        expect(screen.getByText('Tasks')).toBeInTheDocument()
        expect(screen.getByText('Completed')).toBeInTheDocument()
        expect(screen.getByText('In Progress')).toBeInTheDocument()
        expect(screen.getByText('To Do')).toBeInTheDocument()
        expect(screen.getByText('Trash')).toBeInTheDocument()
    })

    it('renders stat cards', () => {
        renderWithRouter(<Home />)

        expect(screen.getByText('TOTAL TASK')).toBeInTheDocument()
        expect(screen.getByText('COMPLETED TASK')).toBeInTheDocument()
        expect(screen.getByText('TASK IN PROGRESS')).toBeInTheDocument()
        expect(screen.getByText('TODOS')).toBeInTheDocument()
    })

    it('displays task count values', () => {
        renderWithRouter(<Home />)

        expect(screen.getByText('9')).toBeInTheDocument() // Total tasks
        expect(screen.getByText('1')).toBeInTheDocument() // Completed
        expect(screen.getByText('3')).toBeInTheDocument() // In Progress
        expect(screen.getByText('5')).toBeInTheDocument() // Todos
    })

    it('renders chart sections', () => {
        renderWithRouter(<Home />)

        expect(screen.getByText('Task Progress Over Week')).toBeInTheDocument()
        expect(screen.getByText('Weekly Task Activity')).toBeInTheDocument()
        expect(screen.getByText('Task Completion Trend')).toBeInTheDocument()
    })

    it('renders charts', () => {
        renderWithRouter(<Home />)

        expect(screen.getByTestId('area-chart')).toBeInTheDocument()
        expect(screen.getByTestId('bar-chart')).toBeInTheDocument()
        expect(screen.getByTestId('line-chart')).toBeInTheDocument()
    })

    it('renders search input', () => {
        renderWithRouter(<Home />)

        expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
    })

    it('renders user avatar', () => {
        renderWithRouter(<Home />)

        expect(screen.getByText('CA')).toBeInTheDocument()
    })

    it('renders task link in sidebar', () => {
        renderWithRouter(<Home />)

        const tasksLink = screen.getByText('Tasks').closest('a')
        expect(tasksLink).toHaveAttribute('href', '/tasks')
    })
})
