import mongoose from "mongoose";


export interface Category {
	_id: string
	name: string
	description: string
	products: Product[]
}

