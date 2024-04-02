"use client";
import './ForgotPasswordform.css';
import { useState } from 'react';

const ForgotForm = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const validateEmail = (email) => {
        return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateEmail(email)) {
            setMessage('Please enter a valid email address.');
            return;
        }
        // Here, you would usually send the email to the server for further processing
        setMessage('A password reset link has been sent to your email.');
    };

    return (
        <div className="forgot-password-form">
            <form onSubmit={handleSubmit}>
                <h1>Enter your email to receive a password reset link</h1>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Send Reset Link</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotForm;
