import Search from "@/app/ui/dashborad/search/search";
import React from "react";
import styles from "@/app/ui/dashborad/tasks/tasks.module.css";
import Link from "next/link";
import Pagination from "@/app/ui/dashborad/pagination/pagination";
import { fetchStudentTasks } from "@/app/utility/data";
import { deleteTask } from "@/app/utility/action";

const MyTasksPage = async ({ searchParams }) => {

  const search = searchParams?.search || "";
  const page = searchParams?.page || 1;
  const { count, tasks } = await fetchStudentTasks(search, page);

  // Filter tasks where student name matches the user name (case-insensitive)
  const filteredTasks = tasks.filter(
    (task) =>
      user.name?.toLowerCase() === `${task.fname} ${task.lname}`.toLowerCase()
  );

  function calculateTotalHours(startTime, endTime) {
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);
    const startDate = new Date(0, 0, 0, startHours, startMinutes);
    const endDate = new Date(0, 0, 0, endHours, endMinutes);
    let diff = endDate - startDate;
    const hours = diff / (1000 * 60 * 60);

    if (hours < 0) {
      diff += 24 * 60 * 60 * 1000; // Add a day
      return diff / (1000 * 60 * 60);
    }
    return hours;
  }

  function isPastDate(date) {
    const taskDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset today's date to the start of the day for accurate comparison
    return taskDate < today; // Returns true if taskDate is before today
  }

  return (

    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for Task..." />
        <Link href="/dashboard/MyTask/add">
          <button className={`${styles.addButton} ${styles.bouncy}`}>
            Add Task
          </button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Date</td>
            <td>Task</td>
            {/* <td>Student Name</td> */}
            <td>Time</td>
            <td>Total Hours</td>
            <td>Location</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr
              key={task.id}
              style={{ color: isPastDate(task.date) ? "SkyBlue" : "initial" }}
              >
              <td>{task.date?.toString().slice(4, 16)}</td>
              <td className={styles.taskname}>{task.task}</td>
              {/* <td>
                <div className={styles.user}>
                  {task.fname} {task.lname}
                </div>
              </td> */}
              <td>
                {task.startTime}~{task.endTime}
              </td>
              <td>
                {calculateTotalHours(task.startTime, task.endTime).toFixed(2)}{" "}
                hours
              </td>
              <td>{task.location}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/MyTask/${task.id}`}>
                    <button
                      className={styles.button}
                      disabled={isPastDate(task.date)}
                    >
                      View
                    </button>
                  </Link>
                  <form action={deleteTask}>
                    <input type="hidden" name="id" value={task.id} />
                    <button
                      className={`${styles.button} ${styles.delete}`}
                      disabled={isPastDate(task.date)}
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default MyTasksPage;
