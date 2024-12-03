import mongoose, { Schema } from "mongoose"
import { ISalesOrder } from "./SalesOrder"

// Customer Interface
export interface ICustomer {
	id: number
	name: string
	phoneNumber?: string
	address?: string
	salesOrders: ISalesOrder[]
	created_at: Date
	updated_at: Date
}

// Customer Model
const customerSchema: Schema = new Schema({
	name: { type: String, required: true },
	phoneNumber: { type: String, default: "" },
	address: { type: String, default: "" },
	salesOrders: [{ type: mongoose.Schema.Types.ObjectId, ref: "SalesOrder" }],
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
})

const Customer = mongoose.model<ICustomer & Document>("Customer", customerSchema)

export default Customer
