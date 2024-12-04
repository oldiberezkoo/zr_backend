import mongoose from "mongoose"
import { log } from "../utils/log"

const connect = async (): Promise<void> => {
	try {
		if (mongoose.connection.readyState === 0) {
			await mongoose.connect(process.env.MONGODB_URI!, {
				minPoolSize: Number(process.env.MONGODB_minPoolSize!),
				maxPoolSize: Number(process.env.MONGODB_maxPoolSize!),
			})
			log("INFO", "Соединение с базой данных установлено")
			log("DEBUG", `Минимальное количество подключений: ${process.env.MONGODB_minPoolSize}`)
			log("DEBUG", `Максимальное количество подключений: ${process.env.MONGODB_maxPoolSize}`)
		}
	} catch (error) {
		log("ERROR", `Ошибка при подключении к базе данных: ${error}`)
		process.exit(1)
	}
}

export default connect
