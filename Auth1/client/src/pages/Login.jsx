import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [data, setData] = useState({ email: '', password: '' })
    const navigate = useNavigate()

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`http://localhost:5000/auth/login`, data)
            localStorage.setItem('token', res.data.token);
            const payload = JSON.parse(atob(res.data.token.split('.')[1])) //decodeing role
            console.log(payload)

            navigate(payload.role === 'admin' ? '/admin' : '/dashboard');

        } catch (error) {
            alert(err.response?.data?.error || 'Login failed');
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input name="email" placeholder="Email" onChange={handleChange} required /><br /><br />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required /><br /><br />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
export default Login;