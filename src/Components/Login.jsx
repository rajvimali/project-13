import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../Firebase/Firebase'


const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();
    const handleForm = async (e) => {
        e.preventDefault();
        try {
            await auth.signInWithEmailAndPassword(email, password);
            navigate("/dashbord")
        } catch (error) {
            console.error(error);
            alert("Somthig gone wrong!")
        }
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div className="container col-3 mx-auto py-16 px-4 ">
            <h2 className="text-center font-bold mb-6">Login </h2>
            <form onSubmit={handleForm} className='border shadow p-4 rounded'>
                <div className="mb-4">
                    <label htmlFor="email" className="mt-3">Email :</label>
                    <input type="email" id="email" name="email" onChange={(e) => handleEmail(e)} className="form-control " placeholder='Enter your email' />

                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block">Password :</label>
                    <input type="password" id="password" name="password" onChange={(e) => handlePassword(e)} className="form-control" placeholder='Enter your password' />
                </div>
                <button className='btn btn-success form-control'>Login</button>
            </form>
        </div>

    )
}

export default Login