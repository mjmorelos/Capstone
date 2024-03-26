"use client";
// Modify the login form to include error message handling and display
import React, { useState } from 'react';
import { authenticate } from "@/app/utility/action";
import styles from "./loginform.module.css";

const Loginform = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    try {
      const result = await authenticate(undefined, formData);
      setErrorMessage(result); // Assuming `authenticate` returns error message on failure
    } catch (error) {
      setErrorMessage('The name or password provided is incorrect. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.title}>Sign In</h1>
      <p className={styles.welcome}>Welcome back!</p>
      <input type="text" placeholder="Enter name" name="name" />
      <input type="password" placeholder="Enter Password" name="password" />
      {errorMessage && <div className={`${styles.error} ${styles.errorMessage}`}>{errorMessage}</div>}
      <button type="submit">LOGIN</button>
      <span>
        <p className={styles.noaccount}>
          Don't have an account? <span>Sign Up</span>
        </p>
      </span>
    </form>
  );
};

export default Loginform;
