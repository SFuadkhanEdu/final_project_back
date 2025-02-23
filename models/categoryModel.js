import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String, default: "" },
});

const Category = model("Category", categorySchema);
export default Category;
