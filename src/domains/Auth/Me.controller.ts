import type { Context } from "hono"
import UserModel from "../../models/UserModel"

const Me = async (c: Context) => {
	try {
		const token = c.req.header("Authorization")

		if (!token) {
			return c.json({ error: "Токен отсутствует" }, 401)
		}
		const User = await UserModel.findOne({ accessToken: token })
		if (!User) {
			return c.json({ error: "Неавторизованный: Пользователь не найден" }, 401)
		}
		return c.json({
			success: true,
			user: {
				id: User._id,
				name: User.bio?.name || User.username,
				email: User.email,
				role: User.role,
				tasks: User.tasks,
				avatar: User.avatar,
				bio: User.bio,
			},
		})
	} catch (error) {
		console.log(error)
		c.json({ error: "Неавторизованный: Неверный токен" }, 401)
	}
}

export default Me
