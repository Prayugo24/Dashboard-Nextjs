"use client";

// import { Authenticate } from "@/app/lib/actions";
// import styles from "./loginForm.module.css";
import styles from "@/styles/login/loginForm/loginForm.module.css";
import { useFormState } from "react-dom";

const LoginForm = () => {
  // const [state, formAction] = useFormState(Authenticate, undefined);

  return (
    <form action={"formAction"} className={styles.form}>
      <h1>Login</h1>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <button>Login</button>
      {/* {state && state} */}
    </form>
  );
};

export default LoginForm;
