import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { fetchUsers, addUser, editUser, deleteUser } from './api';

// Mock the API functions
jest.mock('./api');

describe('User Management Dashboard', () => {

  beforeEach(() => {
    fetchUsers.mockResolvedValue({ data: [] }); // Initially mock with empty data
  });

  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText(/user management/i)).toBeInTheDocument();
  });

  test('displays users fetched from API', async () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com', company: { name: 'HR' } },
      { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', company: { name: 'Finance' } }
    ];

    fetchUsers.mockResolvedValueOnce({ data: mockUsers });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    });
  });

  test('adds a new user', async () => {
    const newUser = { name: 'Sam Smith', email: 'sam.smith@example.com', company: { name: 'IT' } };

    addUser.mockResolvedValueOnce({ data: { ...newUser, id: 3 } });

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { value: 'Sam' } });
    fireEvent.change(screen.getByPlaceholderText(/last name/i), { target: { value: 'Smith' } });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'sam.smith@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/department/i), { target: { value: 'IT' } });

    fireEvent.click(screen.getByText(/add user/i));

    await waitFor(() => {
      expect(screen.getByText('Sam Smith')).toBeInTheDocument();
    });
  });

  test('edits an existing user', async () => {
    const existingUser = { id: 1, name: 'John Doe', email: 'john.doe@example.com', company: { name: 'HR' } };

    const updatedUser = { id: 1, name: 'Johnathan Doe', email: 'johnathan.doe@example.com', company: { name: 'Finance' } };

    editUser.mockResolvedValueOnce({ data: updatedUser });

    render(<App />);

    fireEvent.click(screen.getByText(/edit/i));

    fireEvent.change(screen.getByPlaceholderText(/first name/i), { target: { value: 'Johnathan' } });
    fireEvent.change(screen.getByPlaceholderText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'johnathan.doe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/department/i), { target: { value: 'Finance' } });

    fireEvent.click(screen.getByText(/update user/i));

    await waitFor(() => {
      expect(screen.getByText('Johnathan Doe')).toBeInTheDocument();
    });
  });

  test('deletes a user', async () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com', company: { name: 'HR' } },
      { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', company: { name: 'Finance' } }
    ];

    deleteUser.mockResolvedValueOnce({});
    fetchUsers.mockResolvedValueOnce({ data: mockUsers });

    render(<App />);

    fireEvent.click(screen.getByText(/delete/i));

    await waitFor(() => {
      expect(screen.queryByText('John Doe')).toBeNull(); // John Doe should be removed
    });
  });

  test('shows error when API fails', async () => {
    fetchUsers.mockRejectedValueOnce(new Error('API Error'));
    
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/error fetching users/i)).toBeInTheDocument();
    });
  });

});
