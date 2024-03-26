"use client";

import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "@/app/ui/dashborad/tasks/addtask.module.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/app/auth.js";


const Addtask = async () => {
  const { user } = await auth();

  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [isOtherTaskSelected, setIsOtherTaskSelected] = useState(false);
  const [customLocation, setCustomLocation] = useState("");
  const [customTask, setCustomTask] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleSelectChange = (e) => {
    setIsOtherSelected(e.target.value === "other");
    if (e.target.value === "other") {
      setCustomLocation("");
    }
  };

  const handleTaskSelectChange = (e) => {
    setIsOtherTaskSelected(e.target.value === "other");
    if (e.target.value === "other") {
      setCustomTask("");
    }
  };

  const handleCustomLocationChange = (e) => setCustomLocation(e.target.value);
  const handleCustomTaskChange = (e) => setCustomTask(e.target.value);

  const handleSubmit = async (event) => {

    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSubmissionSuccess(false);

    const taskData = {
      task: isOtherTaskSelected ? customTask : event.target.task.value,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      location: isOtherSelected ? customLocation : event.target.location.value,
      description: event.target.description.value,
      userId : user.id,
    };

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      await response.json();
      setSubmissionSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Example useEffect, reacting to submission success
  useEffect(() => {
    if (submissionSuccess) {
      // Redirect or inform the user of success
      console.log("Task was successfully added!");
      // Reset form or redirect user
    }
  }, [submissionSuccess]);

  return (
    <SessionProvider session={user}>
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Task selection or custom task input */}
        <select name="task" id="taskSelect" onChange={handleTaskSelectChange}>
          <option value="general">Choose a Task</option>
          {/* ... other options ... */}
          <option value="other">Other</option>
        </select>
        {isOtherTaskSelected && (
          <input
            type="text"
            placeholder="Enter Task"
            name="customTask"
            value={customTask}
            onChange={handleCustomTaskChange}
          />
        )}

        {/* Date pickers for start and end dates */}
        <DatePicker
          selected={startDate}
          onChange={setStartDate}
          name="startDate"
          dateFormat="MMMM d, yyyy h:mm aa"
          className={styles.calendar}
          showTimeSelect
          placeholderText="Start Date"
        />
        <DatePicker
          selected={endDate}
          onChange={setEndDate}
          name="endDate"
          dateFormat="MMMM d, yyyy h:mm aa"
          className={styles.calendar}
          showTimeSelect
          placeholderText="End Date"
        />

        {/* Location selection or custom location input */}
        <select
          name="location"
          id="locationSelect"
          onChange={handleSelectChange}
        >
          <option value="general">Choose a Location</option>
          {/* ... other options ... */}
          <option value="other">Other</option>
        </select>
        {isOtherSelected && (
          <input
            type="text"
            placeholder="Enter custom location"
            name="customLocation"
            value={customLocation}
            onChange={handleCustomLocationChange}
          />
        )}

        {/* Text area for the task description */}
        <textarea
          className={styles.textarea}
          placeholder="Description"
          name="description"
          required
        />

        {/* Submit button */}
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          Add Task
        </button>
      </form>

      {/* Error display */}
      {error && <p className={styles.error}>{error}</p>}
    </div>
    </SessionProvider>
  );
};

export default Addtask;
