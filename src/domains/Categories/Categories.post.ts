import type { Context } from "hono"
import Category from "../../models/category"

const CategoriesPost = async (c: Context) => {
	try {
		const body = await c.req.json()
		const { name, description } = body
		if (!name || !description) {
			return c.json({ error: "Не все поля заполнены" }, 400)
		}
		const category = await Category.create({ name, description })
		return c.json({ success: true, category })
	} catch (error) {
		console.log(error)
		c.json({ error: "Неавторизованный: Неверный токен" }, 401)
	}
}

export default CategoriesPost
