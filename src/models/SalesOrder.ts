import mongoose, { Schema } from "mongoose"
import { IProduct } from "./product"
import { ICustomer } from "./Customer"

export interface ISalesOrder {
	id: number
	customer: ICustomer
	status: "PENDING" | "SHIPPED" | "COMPLETED"
	totalCost: number
	items: ISalesOrderItem[]
	created_at: Date
	updated_at: Date
}

// SalesOrder Item Interface
export interface ISalesOrderItem {
	product: IProduct
	quantity: number
	totalPrice: number
}

// SalesOrder Model
const salesOrderSchema: Schema = new Schema({
	customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
	status: { type: String, enum: ["PENDING", "SHIPPED", "COMPLETED"], default: "PENDING" },
	totalCost: { type: Number, required: true },
	items: [{ type: mongoose.Schema.Types.ObjectId, ref: "SalesOrderItem" }],
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
})

const SalesOrder = mongoose.model<ISalesOrder & Document>("SalesOrder", salesOrderSchema)

export default SalesOrder
