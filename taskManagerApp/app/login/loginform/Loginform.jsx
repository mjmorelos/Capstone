"use client";
import { authenticate } from "@/app/utility/action";
import styles from "./loginform.module.css";
import { useFormState } from "react-dom";

const Loginform = () => {
  const [state, formAction] = useFormState(authenticate, undefined);

  return (
    <form action={formAction} className={styles.form}>
      <h1 className={styles.title}>Sign In</h1>
      <p className={styles.welcome}>Welcome back!</p>
      <input type="text" placeholder="Enter name" name="name" />
      <input type="password" placeholder="Enter Password" name="password" />
      <button>LOGIN</button>
      {state && state}
      <span>
        <p className={styles.noaccount}>
          Don't have an account? <span>Sign Up</span>
        </p>
      </span>
    </form>
  );
};

export default Loginform;
