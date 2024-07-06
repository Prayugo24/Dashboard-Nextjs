"use client"
import { UserApi } from "@/app/lib/service";
import Pagination from "@/component/dashboard/pagination/pagination";
import Search from "@/component/dashboard/search/search";
import styles from "@/styles/dashboard/users/users.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


const UsersPage = ({ searchParams }: { searchParams: any }) => {
  const [users, setUsers] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const keyword = searchParams?.keyword || "";
  const page = searchParams?.page || "1";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await UserApi.getAllUsers(keyword, page);
        const {users, count} = response.data 
        setUsers(users);
        setCount(count);
        setLoading(false);
      } catch (error: any) {
        setError("Failed to load users");
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers()
  }, [keyword, page]);

  if (loading && !keyword) return <div>Loading...</div>;
  if (error) return <div className={styles.container}>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => ( 
            <tr key={user._id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={"/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {user.username}
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.createdAt?.toString().slice(4, 16)}</td>
              <td>{user.isAdmin ? "Admin" : "Client"}</td>
              <td>{user.isActive ? "active" : "passive"}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${user._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={"deleteUser"}>
                    <input type="hidden" name="id" value={(user._id)} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
           ))} 
        </tbody>
      </table>
      <Pagination count={1} />
    </div>
  );
};

export default UsersPage;
