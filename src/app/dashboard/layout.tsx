import Navbar from "@/app/ui/dashboard/navbar/navbar"
import Sidebar from "@/app/ui/dashboard/sidebar/sidebar"
import styles from "@/app/ui/dashboard/dashboard.module.css"
import Footer from "@/app/ui/dashboard/footer/footer"
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