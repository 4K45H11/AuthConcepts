import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

const Regiser = () => {
    const [data, setData] = useState({ email: '', name: '', password: '', role: 'user' })

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/auth/register`, data)
            toast.success('Registered successfully')
            setTimeout(() => {
                navigate('/')
            }, 2200);

        } catch (error) {
            alert(error.response?.data?.error || 'Registration failed')
        }
    };

    const navigate = useNavigate()
    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" onChange={handleChange} required /><br /><br />
                <input name="email" placeholder="Email" onChange={handleChange} required /><br /><br />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required /><br /><br />
                <select name="role" onChange={handleChange}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select><br /><br />
                <button type="submit">Register</button>
            </form>
            <ToastContainer autoClose={1500} />
        </div>
    )
}
export default Regiser;