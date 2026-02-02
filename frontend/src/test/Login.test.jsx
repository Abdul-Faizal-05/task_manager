import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Login from '../Login'

// Mock fetch
global.fetch = vi.fn()

// Wrapper component for Router
const renderWithRouter = (component) => {
    return render(
        <BrowserRouter>
            {component}
        </BrowserRouter>
    )
}

describe('Login Component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders login form correctly', () => {
        renderWithRouter(<Login />)

        expect(screen.getByText('TaskMe')).toBeInTheDocument()
        expect(screen.getByText('Welcome back! Please login to your account')).toBeInTheDocument()
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
    })

    it('shows validation error when email is empty', async () => {
        const user = userEvent.setup()
        renderWithRouter(<Login />)

        const submitButton = screen.getByRole('button', { name: /login/i })
        await user.click(submitButton)

        expect(screen.getByText('Email is required')).toBeInTheDocument()
    })

    it('has email input with proper validation type', () => {
        renderWithRouter(<Login />)

        const emailInput = screen.getByLabelText(/email/i)
        expect(emailInput).toHaveAttribute('type', 'email')
    })

    it('shows validation error when password is empty', async () => {
        const user = userEvent.setup()
        renderWithRouter(<Login />)

        const emailInput = screen.getByLabelText(/email/i)
        await user.type(emailInput, 'test@example.com')

        const submitButton = screen.getByRole('button', { name: /login/i })
        await user.click(submitButton)

        expect(screen.getByText('Password is required')).toBeInTheDocument()
    })

    it('clears validation error when user types in field', async () => {
        const user = userEvent.setup()
        renderWithRouter(<Login />)

        // Submit to trigger error
        const submitButton = screen.getByRole('button', { name: /login/i })
        await user.click(submitButton)

        expect(screen.getByText('Email is required')).toBeInTheDocument()

        // Type in email field
        const emailInput = screen.getByLabelText(/email/i)
        await user.type(emailInput, 't')

        expect(screen.queryByText('Email is required')).not.toBeInTheDocument()
    })

    it('submits form with valid credentials', async () => {
        const user = userEvent.setup()

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ user: { id: 1, role: 'employee' } })
        })

        renderWithRouter(<Login />)

        const emailInput = screen.getByLabelText(/email/i)
        const passwordInput = screen.getByLabelText(/password/i)

        await user.type(emailInput, 'test@example.com')
        await user.type(passwordInput, 'password123')

        const submitButton = screen.getByRole('button', { name: /login/i })
        await user.click(submitButton)

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                'http://localhost:5000/api/auth/login',
                expect.objectContaining({
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                })
            )
        })
    })

    it('shows loading state during form submission', async () => {
        const user = userEvent.setup()

        global.fetch.mockImplementation(() => new Promise(() => { })) // Never resolves

        renderWithRouter(<Login />)

        const emailInput = screen.getByLabelText(/email/i)
        const passwordInput = screen.getByLabelText(/password/i)

        await user.type(emailInput, 'test@example.com')
        await user.type(passwordInput, 'password123')

        const submitButton = screen.getByRole('button', { name: /login/i })
        await user.click(submitButton)

        expect(screen.getByRole('button', { name: /logging in/i })).toBeInTheDocument()
    })

    it('displays error message on login failure', async () => {
        const user = userEvent.setup()

        global.fetch.mockResolvedValueOnce({
            ok: false,
            json: () => Promise.resolve({ message: 'Invalid credentials' })
        })

        renderWithRouter(<Login />)

        const emailInput = screen.getByLabelText(/email/i)
        const passwordInput = screen.getByLabelText(/password/i)

        await user.type(emailInput, 'test@example.com')
        await user.type(passwordInput, 'wrongpassword')

        const submitButton = screen.getByRole('button', { name: /login/i })
        await user.click(submitButton)

        await waitFor(() => {
            expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
        })
    })

    it('has a link to register page', () => {
        renderWithRouter(<Login />)

        const registerLink = screen.getByText('Register here')
        expect(registerLink).toBeInTheDocument()
        expect(registerLink.closest('a')).toHaveAttribute('href', '/register')
    })

    it('has forgot password link', () => {
        renderWithRouter(<Login />)

        expect(screen.getByText('Forgot password?')).toBeInTheDocument()
    })

    it('has remember me checkbox', () => {
        renderWithRouter(<Login />)

        expect(screen.getByText('Remember me')).toBeInTheDocument()
    })
})
