import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  let role = null;
  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      role = decoded.role;
    } catch {}
  }

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
      {token ? (
        <>
          <Link to={role === 'admin' ? '/admin' : '/dashboard'} style={{ marginRight: 10 }}>
            {role === 'admin' ? 'Admin Panel' : 'Dashboard'}
          </Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/" style={{ marginRight: 10 }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
