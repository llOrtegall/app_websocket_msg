import { useState } from "react";
import { useAuth } from "../../auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Register(){

    const [names, setNames] = useState('');
    const [lastnames, setLastnames] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()
    const { setUser, setIsAuthenticated } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await axios.post('/register', { names, lastnames, email, password })
            setUser(response.data)
            setIsAuthenticated(true)
            navigate('/')
        } catch (error) {
            // !! rendirizar un mensaje de error como contraseña incorrecta o usuario no encontrado etc etc etc
            console.error(error)
        }
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Names' className="border border-gray-300 rounded-md" value={names} onChange={ev => setNames(ev.target.value)} />
                <input type="text" placeholder='Lastnames' className="border border-gray-300 rounded-md" value={lastnames} onChange={ev => setLastnames(ev.target.value)} />
                <input type="email" placeholder='Email' className="border border-gray-300 rounded-md" value={email} onChange={ev => setEmail(ev.target.value)} />
                <input type="password" placeholder='Password' className="border border-gray-300 rounded-md" value={password} onChange={ev => setPassword(ev.target.value)} />
                <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md">Register</button>
            </form>
        </div>
    )
}