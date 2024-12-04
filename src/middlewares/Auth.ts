import UserModel from "../models/UserModel"
import { log } from "../utils/log"

const authenticate = async (c: any, next: any) => {
	try {
		const token = c.req.header("Authorization")
		if (!token) {
			return c.json({ error: "Токен отсутствует" }, 401)
		}
		const accessToken = token
		if (!accessToken) {
			return c.json({ error: "Неавторизованный: Неверный формат токена" }, 401)
		}
		const user = await UserModel.findOne({ accessToken })
		if (!user) {
			return c.json({ error: "Неавторизованный: Пользователь не найден" }, 401)
		}
		if (user.accessToken === "banned-token") {
			return c.json({ error: "Unauthorized: Access token is banned" }, 403)
		}
		log("DEBUG", `Пользователь ${user!.username} авторизован`)
		await next()
	} catch (error) {
		console.log(error)
		c.json({ error: "Неавторизованный: Неверный токен" }, 401)
	}
}

export default authenticate
