import type { Context } from "hono"
import UserModel from "../../models/UserModel"
import { log } from "../../utils/log"

const Login = async (c: Context) => {
	try {
		const { email, password } = await c.req.json<{ email: string; password: string }>()
		if (!email || !password) {
			return c.json({ error: "Нет пользователя или пароля" }, 400)
		}
		const user = await UserModel.findOne({ email })
		if (!user) {
			return c.json({ error: "Нет пользователя" }, 400)
		}
		if (user.password !== password) {
			return c.json({ error: "Неверный пароль" }, 400)
		}
		log("INFO", `Пользователь ${user.username} авторизован`)
		return c.json({ success: true, token: user!.accessToken })
	} catch {}
}

export default Login
