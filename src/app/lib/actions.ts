"use server";

import { revalidatePath } from "next/cache";
import { Product, User } from "./models";
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt  from "bcrypt";
import { signIn } from "../auth";


// export const addUser = async (formData:any) => {
//   const { username, email, password, phone, address, isAdmin, isActive } =
//     Object.fromEntries(formData);

//   try {
//     connectToDB();

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//       phone,
//       address,
//       isAdmin,
//       isActive,
//     });

//     await newUser.save();
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to create user!");
//   }

//   revalidatePath("/dashboard/users");
//   redirect("/dashboard/users");
// };

// export const updateUser = async (formData:any) => {
//   const { id, username, email, password, phone, address, isAdmin, isActive } =
//     Object.fromEntries(formData);

//   try {
//     connectToDB();

//     const updateFields = {
//       username,
//       email,
//       password,
//       phone,
//       address,
//       isAdmin,
//       isActive,
//     };

//     // Object.keys(updateFields).forEach(
//     //   (key) =>
//     //     (updateFields[key] === "" || undefined) && delete updateFields[key]
//     // );

//     await User.findByIdAndUpdate(id, updateFields);
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to update user!");
//   }

//   revalidatePath("/dashboard/users");
//   redirect("/dashboard/users");
// };

// export const addProduct = async (formData:any) => {
//   const { title, desc, price, stock, color, size } =
//     Object.fromEntries(formData);

//   try {
//     connectToDB();

//     const newProduct = new Product({
//       title,
//       desc,
//       price,
//       stock,
//       color,
//       size,
//     });

//     await newProduct.save();
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to create product!");
//   }

//   revalidatePath("/dashboard/products");
//   redirect("/dashboard/products");
// };

// export const updateProduct = async (formData:any) => {
//   const { id, title, desc, price, stock, color, size } =
//     Object.fromEntries(formData);

//   try {
//     connectToDB();

//     const updateFields = {
//       title,
//       desc,
//       price,
//       stock,
//       color,
//       size,
//     };

//     // Object.keys(updateFields).forEach(
//     //   (key) =>
//     //     (updateFields[key] === "" || undefined) && delete updateFields[key]
//     // );

//     await Product.findByIdAndUpdate(id, updateFields);
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to update product!");
//   }

//   revalidatePath("/dashboard/products");
//   redirect("/dashboard/products");
// };

// export const deleteUser = async (formData:any) => {
//   const { id } = Object.fromEntries(formData);

//   try {
//     connectToDB();
//     await User.findByIdAndDelete(id);
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to delete user!");
//   }

//   revalidatePath("/dashboard/products");
// };

// export const deleteProduct = async (formData:any) => {
//   const { id } = Object.fromEntries(formData);

//   try {
//     connectToDB();
//     await Product.findByIdAndDelete(id);
//   } catch (err) {
//     console.log(err);
//     throw new Error("Failed to delete product!");
//   }

//   revalidatePath("/dashboard/products");
// };

// export const Authenticate = async (prevState:any, formData:any) => {
//   const { username, password } = Object.fromEntries(formData);

//   try {
//     await signIn("credentials", { username, password });
//   } catch (err:any) {
//     if (err.message.includes("CredentialsSignin")) {
//       return "Wrong Credentials";
//     }
//     throw err;
//   }
// };




export const dataChart = [
  {
    name: "Sun",
    visit: 4000,
    click: 2400,
  },
  {
    name: "Mon",
    visit: 3000,
    click: 1398,
  },
  {
    name: "Tue",
    visit: 2000,
    click: 3800,
  },
  {
    name: "Wed",
    visit: 2780,
    click: 3908,
  },
  {
    name: "Thu",
    visit: 1890,
    click: 4800,
  },
  {
    name: "Fri",
    visit: 2390,
    click: 3800,
  },
  {
    name: "Sat",
    visit: 3490,
    click: 4300,
  },
];