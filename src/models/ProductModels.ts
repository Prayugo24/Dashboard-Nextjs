import mongoose ,{Schema, Model}from "mongoose";

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
export const Product:Model<IProductSchema> =
  mongoose.models.Product || mongoose.model<IProductSchema>("Product", productSchema);