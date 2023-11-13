"use client"
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleLoginData } from '../../../redux/features/auth-slice';
import { useRouter } from 'next/navigation';
const LoginForm = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        dispatch(handleLoginData(formData))
        router.push("/")
    };
    return (
        <div className="bg-gray-600 min-h-screen flex items-center justify-center">
            <div className="bg-black text-white w-96 p-6 rounded-md">
                <div className='ml-20 mb-20'>
                    <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png" className='w-[180px] h-[50px]' />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor='email'>Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="bg-black border border2 text-white w-full p-2 rounded-md"
                        />
                    </div>
                    <div className="mb-4 flex flex-col gap-2">
                        <label htmlFor='password'>Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="bg-black border border2 text-white w-full p-2 rounded-md"
                        />
                        <div className='flex gap-2 items-center '>
                            <input
                                id="show"
                                type="checkbox"
                                onClick={handleShowPassword}
                                className="form-checkbox h-5 w-5 text-blue-500"
                            />
                            <label htmlFor='show'>
                                Show Password
                            </label>
                        </div>
                    </div>
                    <div className="mb-6">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white w-full p-2 rounded-md"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;