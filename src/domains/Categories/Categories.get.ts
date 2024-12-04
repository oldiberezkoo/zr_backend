import type { Context } from "hono"
import Category from "../../models/category"

const Categories = async (c: Context) => {
	try {
		const categories = await Category.find()
		return c.json({ success: true, categories })
	} catch (error) {
		console.log(error)
		c.json({ error: "Неавторизованный: Неверный токен" }, 401)
	}
}

export default Categories
