import mongoose from "mongoose"

export type Role = "manager" | "admin" | "user" | "guest"

export interface UserInterface {
	_id: string
	username: string
	email: string
	password: string
	avatar?: {
		url: string
		file: string
	}
	bio?: {
		name: string
	}
	role: Role
	tasks?: mongoose.Schema.Types.ObjectId[]
	accessToken: string
}

const UserSchema = new mongoose.Schema<UserInterface>(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			minlength: 3,
			maxlength: 50,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
			match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		avatar: {
			url: { type: String },
			file: { type: String },
		},
		bio: {
			name: { type: String, maxlength: 100 },
		},
		role: {
			type: String,
			enum: ["manager", "admin", "user", "guest"],
			default: "user",
		},
		tasks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Task",
			},
		],
		accessToken: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
)

const UserModel = mongoose.model<UserInterface>("User", UserSchema)

export default UserModel
