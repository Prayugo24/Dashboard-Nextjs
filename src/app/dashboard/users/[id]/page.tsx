"use client"
import Image from "next/image";
import styles from '@/styles/dashboard/users/singleUser/singleUser.module.css';
import { UserApi } from "@/app/lib/service";
import { useEffect, useState } from "react";

const SingleUserPage = ({ params }:{params:any}) => {
  const [user, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const { id } = params;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const {data} = await UserApi.findUsersByID(id);  
        setUsers(data)
      } catch (error) {
        setError("Failed to load users");
        console.error("Error fetching users:", error);
      }finally {
        setLoading(false)
      }      
    }
    fetchUsers()
  },[id])
  if (loading) return <div>Loading...</div>;
  if (error) return <div className={styles.container}>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={"/noavatar.png"} alt="" fill />
        </div>
        {user.username}
      </div>
      <div className={styles.formContainer}>
        <form action={"updateUser"} className={styles.form}>
          <input type="hidden" name="id" value={user._id}/>
          <label>Username</label>
          <input type="text" name="username" placeholder={user.username} />
          <label>Email</label>
          <input type="email" name="email" placeholder={user.email} />
          <label>Password</label>
          <input type="password" name="password" />
          <label>Phone</label>
          <input type="text" name="phone" placeholder={user.phone} />
          <label>Address</label>
          <textarea name="address" placeholder={user.address} />
          <label>Is Admin?</label>
          <select name="isAdmin" id="isAdmin">
            <option value={"true"} selected={user.isAdmin}>Yes</option>
            <option value={"false"} selected={!user.isAdmin}>No</option>
          </select>
          <label>Is Active?</label>
          <select name="isActive" id="isActive">
            <option value={"true"} selected={user.isActive}>Yes</option>
            <option value={"false"} selected={!user.isActive}>No</option>
          </select>
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
