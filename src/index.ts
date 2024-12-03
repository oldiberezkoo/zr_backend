import dotenv from "dotenv"
import { Hono } from "hono"
import { logger } from "hono/logger"
import { prettyJSON } from "hono/pretty-json"
import connect from "./config/database"

dotenv.config()

const app = new Hono()
const port = Number(process.env.SERVER__PORT)
const host = process.env.SERVER__HOST
app.use("*", prettyJSON())
app.use("*", logger())
app.use("*", (ctx, next) => {
	connect()

	return next()
})
app.get("/", (c) => {
	return c.text("Hello Hono!")
})

export default app
