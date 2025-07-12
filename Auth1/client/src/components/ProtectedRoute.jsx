import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem('token');

  if (!token) return <Navigate to="/" />;

  try {
    const decoded = JSON.parse(atob(token.split('.')[1]));

    // If role is required and doesn't match → deny
    if (role && decoded.role !== role) {
      return <Navigate to="/" />;
    }

    return children; // allowed

  } catch (err) {
    return <Navigate to="/" />;
  }
}

export default ProtectedRoute;
