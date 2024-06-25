
import mongoose ,{Schema, Model}from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  img: string;
  isAdmin:boolean;
  isActive:boolean;
  phone:string;
  address:string;
  createtAt:Date;
  updateAt:Date;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    createtAt:{
      type:Date,
    },
    updateAt:{
      type:Date
    }
  },
  { timestamps: true }
);

interface IProductSchema extends Document {
  title: string;
  desc: string;
  price: number;
  stock: number;
  img:string;
  color:string;
  size:string;
  address:string;
  createtAt:Date;
  updateAt:Date;
}

const productSchema: Schema<IProductSchema> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    img: {
      type: String,
    },
    color: {
      type: String,
    },
    size: {
      type: String,
    },
    createtAt:{
      type:Date,
    },
    updateAt:{
      type:Date
    }
  },
  { timestamps: true }
);

export const User:Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export const Product:Model<IProductSchema> =
  mongoose.models.Product || mongoose.model<IProductSchema>("Product", productSchema);
