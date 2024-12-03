import mongoose, { Schema } from "mongoose"
import { ICategory } from "./category"
import { IWarehouse } from "./Warehouse"

// Product Interface
export interface IProduct {
	id: number
	name: string
	description?: string
	price: number
	quantity: number
	discount?: number
	category: ICategory
	warehouse: IWarehouse
	created_at: Date
	updated_at: Date
}

// Product Model
const productSchema: Schema = new Schema({
	name: { type: String, required: true },
	description: { type: String, default: "" },
	price: { type: Number, required: true },
	quantity: { type: Number, required: true },
	discount: { type: Number, default: 0 },
	category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
	warehouse: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse", required: true },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
})

const Product = mongoose.model<IProduct & Document>("Product", productSchema)

export default Product
