import mongoose, { Schema } from "mongoose"
import { IProduct } from "./product"

// Category Interface
export interface ICategory {
	id: number
	name: string
	description?: string
	products: IProduct[]
	created_at: Date
	updated_at: Date
}

// Category Model
const categorySchema: Schema = new Schema({
	name: { type: String, required: true },
	description: { type: String, default: "" },
	products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
})

const Category = mongoose.model<ICategory & Document>("Category", categorySchema)

export default Category
