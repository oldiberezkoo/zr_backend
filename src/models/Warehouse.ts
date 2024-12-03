import mongoose, { Schema } from "mongoose"
import { IProduct } from "./product"
import { IStockMovement } from "./StockMovement"

// Warehouse Interface
export interface IWarehouse {
	id: number
	name: string
	location?: string
	capacity?: number
	products: IProduct[]
	stockMovements: IStockMovement[]
	created_at: Date
	updated_at: Date
}

// Warehouse Model
const warehouseSchema: Schema = new Schema({
	name: { type: String, required: true },
	location: { type: String, default: "" },
	capacity: { type: Number, default: 0 },
	products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
	stockMovements: [{ type: mongoose.Schema.Types.ObjectId, ref: "StockMovement" }],
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now },
})

const Warehouse = mongoose.model<IWarehouse & Document>("Warehouse", warehouseSchema)

export default Warehouse
