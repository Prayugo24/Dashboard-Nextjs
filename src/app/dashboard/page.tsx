import { cards } from "@/app/lib/data";
import Card from "@/component/dashboard/card/card";
import Chart from "@/component/dashboard/chart/chart";
import styles from "@/styles/dashboard/dashboard.module.css";
import Rightbar from "@/component/dashboard/rightbar/rightbar";
import Transactions from "@/component/dashboard/transactions/transactions";

const Dashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          {cards.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
        <Transactions />
        <Chart />
      </div>
      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;
