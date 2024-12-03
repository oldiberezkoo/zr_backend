import { Category } from "./category"

export interface Product {
	id: string
	name: string
	description: string
	price: number
	quantity: number
	discount: number
	category: Category[]
}
