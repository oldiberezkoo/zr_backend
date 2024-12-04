import * as dotenv from "dotenv"
import { Hono } from "hono"
import { logger } from "hono/logger"
import { prettyJSON } from "hono/pretty-json"
import connect from "./config/database"
import Login from "./domains/Auth/Login.controller"
import Me from "./domains/Auth/Me.controller"
import Register from "./domains/Auth/Register.controller"
import CategoriesDelete from "./domains/Categories/Categories.delete"
import Categories from "./domains/Categories/Categories.get"
import CategoriesPost from "./domains/Categories/categories.post"
import authenticate from "./middlewares/Auth"
import { log } from "./utils/log"

dotenv.config()

const app = new Hono()
const port = Number(process.env.SERVER__PORT) || 3000

;(async () => {
	await connect()

	app.use("*", prettyJSON())
	app.use("*", logger())

	app.get("/", (c) => {
		return c.text("Zephyrix: Server is running")
	})

	/*     */
	app.post("/api/auth/register", (c) => Register(c))
	app.post("/api/auth/login", (c) => Login(c))
	app.get("/api/auth/me", (c) => Me(c))
	/*     */

	/*     */
	app.get("/api/categories", (c) => Categories(c))
	app.post("/api/categories", authenticate, (c) => CategoriesPost(c))
	app.delete("/api/categories/:id", authenticate, (c) => CategoriesDelete(c))
	/*     */
	log("INFO", `Сервер запущен на http://localhost:${port}`)
})()

export default app
