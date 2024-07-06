import Navbar from "@/interfaces/components/dashboard/navbar/navbar"
import Sidebar from "@/interfaces/components/dashboard/sidebar/sidebar"
import styles from "@/styles/dashboard/dashboard.module.css"
import Footer from "@/interfaces/components/dashboard/footer/footer"
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