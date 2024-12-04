import type { Context } from "hono"
import UserModel from "../../models/UserModel"
import { log } from "../../utils/log"

const Register = async (c: Context) => {
	try {
		const body = await c.req.json()

		// Проверка наличия обязательных полей
		if (!body.username || !body.password || !body.email) {
			console.log("Отсутствуют необходимые поля. Полученные поля:", {
				username: body.username,
				email: body.email,
				password: body.password,
			})
			return c.json(
				{
					success: false,
					error: "Username, email и password обязательны",
					receivedBody: body,
				},
				400
			)
		}

		const { username, email, password, avatar, bio, role } = body

		const generateAccessToken = () => {
			const date = new Date()
			const time = date.getTime()
			const keys = `${username}${time}${date}`
			return Buffer.from(keys).toString("base64")
		}

		const existingUser = await UserModel.findOne({ $or: [{ username }, { email }] })
		if (existingUser) {
			return c.json(
				{
					success: false,
					error: "Пользователь с таким именем или email уже существует",
				},
				400
			)
		}

		const newUser = await UserModel.create({
			username,
			email,
			password,
			avatar,
			bio,
			role: "user",
			accessToken: generateAccessToken(),
		})

		log("INFO", `Создан новый пользователь: ${newUser.username}`)

		return c.json({
			success: true,
			accessToken: newUser.accessToken,
			user: {
				username: newUser.username,
				email: newUser.email,
				role: newUser.role,
			},
		})
	} catch (error) {
		console.error({
			name: (error as Error).name,
			message: (error as Error).message,
			stack: (error as Error).stack,
		})

		if ((error as Error).name === "MongoServerError" && (error as any).code === 11000) {
			return c.json(
				{
					success: false,
					error: "Пользователь с таким UUID уже существует",
				},
				400
			)
		}

		return c.json(
			{
				success: false,
				error: "Ошибка при создании пользователя",
			},
			500
		)
	}
}

export default Register
