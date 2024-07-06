import styles from "@/styles/login/login.module.css";
import LoginForm from "@/interfaces/components/login/loginForm";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <LoginForm/>
    </div>
  );
};

export default LoginPage;
