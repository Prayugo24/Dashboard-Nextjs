import Navbar from "@/component/dashboard/navbar/navbar"
import Sidebar from "@/component/dashboard/sidebar/sidebar"
import styles from "@/styles/dashboard/dashboard.module.css"
import Footer from "@/component/dashboard/footer/footer"
import React, { FC } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar/>
      </div>
      <div className={styles.content}>
        <Navbar/>
        {children}
        <Footer/>
      </div>
    </div>
  )
}

export default Layout