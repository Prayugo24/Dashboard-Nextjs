import { cards } from "@/app/lib/data";
import Card from "@/interfaces/components/dashboard/card/card";
import Chart from "@/interfaces/components/dashboard/chart/chart";
import styles from "@/styles/dashboard/dashboard.module.css";
import Rightbar from "@/interfaces/components/dashboard/rightbar/rightbar";
import Transactions from "@/interfaces/components/dashboard/transactions/transactions";

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
