"use client"
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { handleRegisterData } from '../../../redux/features/auth-slice';
import * as yup from 'yup'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const RegistrationForm = () => {
    const dispatch = useDispatch();
    const { registerData } = useSelector((state: any) => state.auth)
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const validationSchema = yup.object().shape({
        firstName: yup.string().min(2).required('First Name is required'),
        lastName: yup.string().min(2).required('Last Name is required'),
        email: yup.string().email('Invalid email').required('Email is required'),
        password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    });
    const [errors, setErrors] = useState<any>({});
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        validationSchema.validate(formData, { abortEarly: false })
            .then(() => {
                dispatch(handleRegisterData(formData))
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                });
                router.push("/login")
            })
            .catch((err) => {
                const validationErrors: any = {};
                err.inner.forEach((error: any) => {
                    validationErrors[error.path] = error.message;
                });
                setErrors(validationErrors);
            });
    };
    return (
        <div className="bg-gray-600 min-h-screen flex items-center justify-center">
            <div className="bg-black text-white w-96 p-6 rounded-md">
                <h2 className="text-2xl text-center font-bold mb-6">Registration Form</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            className="bg-black border border2 text-white w-full p-2 rounded-md"
                        />
                        {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            className="bg-black border border2 text-white w-full p-2 rounded-md"
                        />
                        {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="bg-black border border2 text-white w-full p-2 rounded-md"
                        />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="bg-black border border2 text-white w-full p-2 rounded-md"
                        />
                        {errors.password && <p className="text-red-500">{errors.password}</p>}
                    </div>
                    <div className="mb-6 flex flex-col gap-2">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white w-full p-2 rounded-md"
                        >
                            Register
                        </button>
                        <Link href="/login"
                            className="bg-green-500 text-center text-white w-full p-2 rounded-md"
                        >
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default RegistrationForm;