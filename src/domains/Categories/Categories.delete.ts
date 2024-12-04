import type { Context } from "hono"
import mongoose from "mongoose"
import Category from "../../models/category"

export const CategoriesDelete = async (c: Context) => {
	try {
		const id = c.req.param("id")

		if (!id) {
			return c.json({ error: "ID категории не передан." }, 400)
		}

		if (!mongoose.isValidObjectId(id)) {
			return c.json({ error: "Неверный формат ID." }, 400)
		}

		const result = await Category.findByIdAndDelete(id)

		if (!result) {
			return c.json({ error: "Категория не найдена." }, 404)
		}

		// Успешный ответ
		return c.json({ success: true }, 200)
	} catch (error) {
		console.error("Ошибка при удалении категории:", error)

		return c.json({ error: "Внутренняя ошибка сервера. Пожалуйста, повторите попытку позже." }, 500)
	}
}

export default CategoriesDelete
