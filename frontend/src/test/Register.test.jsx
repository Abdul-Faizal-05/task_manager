import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Register from '../Register'

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

describe('Register Component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders registration form correctly', () => {
        renderWithRouter(<Register />)

        expect(screen.getByText('TaskMe')).toBeInTheDocument()
        expect(screen.getByText('Create your account')).toBeInTheDocument()
        expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
        expect(screen.getByLabelText('Password')).toBeInTheDocument()
        expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument()
    })

    it('shows validation error when username is empty', async () => {
        const user = userEvent.setup()
        renderWithRouter(<Register />)

        const submitButton = screen.getByRole('button', { name: /register/i })
        await user.click(submitButton)

        expect(screen.getByText('Username is required')).toBeInTheDocument()
    })

    it('shows validation error when username is too short', async () => {
        const user = userEvent.setup()
        renderWithRouter(<Register />)

        const usernameInput = screen.getByLabelText(/username/i)
        await user.type(usernameInput, 'ab')

        const submitButton = screen.getByRole('button', { name: /register/i })
        await user.click(submitButton)

        expect(screen.getByText('Username must be at least 3 characters')).toBeInTheDocument()
    })

    it('has email input with proper validation type', () => {
        renderWithRouter(<Register />)

        const emailInput = screen.getByLabelText(/email/i)
        expect(emailInput).toHaveAttribute('type', 'email')
    })

    it('shows validation error when password is too short', async () => {
        const user = userEvent.setup()
        renderWithRouter(<Register />)

        const usernameInput = screen.getByLabelText(/username/i)
        const emailInput = screen.getByLabelText(/email/i)
        const passwordInput = screen.getByLabelText('Password')

        await user.type(usernameInput, 'testuser')
        await user.type(emailInput, 'test@example.com')
        await user.type(passwordInput, '12345')

        const submitButton = screen.getByRole('button', { name: /register/i })
        await user.click(submitButton)

        expect(screen.getByText('Password must be at least 6 characters')).toBeInTheDocument()
    })

    it('shows validation error when passwords do not match', async () => {
        const user = userEvent.setup()
        renderWithRouter(<Register />)

        const usernameInput = screen.getByLabelText(/username/i)
        const emailInput = screen.getByLabelText(/email/i)
        const passwordInput = screen.getByLabelText('Password')
        const confirmPasswordInput = screen.getByLabelText(/confirm password/i)

        await user.type(usernameInput, 'testuser')
        await user.type(emailInput, 'test@example.com')
        await user.type(passwordInput, 'password123')
        await user.type(confirmPasswordInput, 'differentpassword')

        const submitButton = screen.getByRole('button', { name: /register/i })
        await user.click(submitButton)

        expect(screen.getByText('Passwords do not match')).toBeInTheDocument()
    })

    it('submits form with valid data', async () => {
        const user = userEvent.setup()

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ message: 'User registered successfully' })
        })

        renderWithRouter(<Register />)

        const usernameInput = screen.getByLabelText(/username/i)
        const emailInput = screen.getByLabelText(/email/i)
        const passwordInput = screen.getByLabelText('Password')
        const confirmPasswordInput = screen.getByLabelText(/confirm password/i)

        await user.type(usernameInput, 'testuser')
        await user.type(emailInput, 'test@example.com')
        await user.type(passwordInput, 'password123')
        await user.type(confirmPasswordInput, 'password123')

        const submitButton = screen.getByRole('button', { name: /register/i })
        await user.click(submitButton)

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(
                'http://localhost:5000/api/auth/register',
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

        renderWithRouter(<Register />)

        const usernameInput = screen.getByLabelText(/username/i)
        const emailInput = screen.getByLabelText(/email/i)
        const passwordInput = screen.getByLabelText('Password')
        const confirmPasswordInput = screen.getByLabelText(/confirm password/i)

        await user.type(usernameInput, 'testuser')
        await user.type(emailInput, 'test@example.com')
        await user.type(passwordInput, 'password123')
        await user.type(confirmPasswordInput, 'password123')

        const submitButton = screen.getByRole('button', { name: /register/i })
        await user.click(submitButton)

        expect(screen.getByRole('button', { name: /registering/i })).toBeInTheDocument()
    })

    it('displays error message on registration failure', async () => {
        const user = userEvent.setup()

        global.fetch.mockResolvedValueOnce({
            ok: false,
            json: () => Promise.resolve({ message: 'Email already exists' })
        })

        renderWithRouter(<Register />)

        const usernameInput = screen.getByLabelText(/username/i)
        const emailInput = screen.getByLabelText(/email/i)
        const passwordInput = screen.getByLabelText('Password')
        const confirmPasswordInput = screen.getByLabelText(/confirm password/i)

        await user.type(usernameInput, 'testuser')
        await user.type(emailInput, 'test@example.com')
        await user.type(passwordInput, 'password123')
        await user.type(confirmPasswordInput, 'password123')

        const submitButton = screen.getByRole('button', { name: /register/i })
        await user.click(submitButton)

        await waitFor(() => {
            expect(screen.getByText('Email already exists')).toBeInTheDocument()
        })
    })

    it('has a link to login page', () => {
        renderWithRouter(<Register />)

        const loginLink = screen.getByText('Login here')
        expect(loginLink).toBeInTheDocument()
        expect(loginLink.closest('a')).toHaveAttribute('href', '/')
    })

    it('clears error when user types in field', async () => {
        const user = userEvent.setup()
        renderWithRouter(<Register />)

        // Submit to trigger error
        const submitButton = screen.getByRole('button', { name: /register/i })
        await user.click(submitButton)

        expect(screen.getByText('Username is required')).toBeInTheDocument()

        // Type in username field
        const usernameInput = screen.getByLabelText(/username/i)
        await user.type(usernameInput, 't')

        expect(screen.queryByText('Username is required')).not.toBeInTheDocument()
    })
})
