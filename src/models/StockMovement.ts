import mongoose, { Schema } from "mongoose"
import { IProduct } from "./product"
import { IWarehouse } from "./Warehouse"

// StockMovement Interface
export interface IStockMovement {
	id: number
	product: IProduct
	warehouse: IWarehouse
	type: "IN" | "OUT"
	quantity: number
	created_at: Date
	updated_at: Date
}

// StockMovement Model
const stockMovementSchema: Schema = new Schema({
	product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
	warehouse: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse", required: true },
	type: { type: String, enum: ["IN", "OUT"], required: true },
	quantity: { type: Number, required: true },
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
})

const StockMovement = mongoose.model<IStockMovement & Document>("StockMovement", stockMovementSchema)

export default StockMovement
