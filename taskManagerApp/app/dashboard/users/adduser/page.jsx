"use client";
import { addUser } from "@/app/utility/action";
import styles from "@/app/ui/dashborad/users/adduser.module.css";
import { useState } from "react";

const AddUserPage = () => {

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const formData = new FormData(event.target);
    try {
      await addUser(formData); // Assuming addUser is adapted to work client-side
      setErrorMessage(''); // Clear any existing error messages
      // Optionally, redirect or inform the user of success here
    } catch (error) {
      // Capture and display error message from the addUser function
      setErrorMessage(error.message);
    }
  };

  return (
    <div className={styles.container}>
      {errorMessage && <div className={`${styles.error} ${styles.errorMessage}`}>{errorMessage}</div>} {/* Display error message */}
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" placeholder="Enter username" name="name" required />
        <input type="email" placeholder="Enter email" name="email" required />
        <input
          type="password"
          placeholder="Enter password"
          name="password"
          required
        />
        <input type="phone" placeholder="Enter phone number" name="phone" />
        <select name="isAdmin" id="isAdmin">
          <option value={false}>Is Admin?</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <select name="isActive" id="isActive">
          <option value={true}>Is Active?</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <textarea
          name="image"
          id="imageinfo"
          rows="6"
          placeholder="Please paste your Image URL"
        ></textarea>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default AddUserPage;
