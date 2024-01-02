import request from "supertest"
import { assert, expect } from "chai"
import app from "../index.js"

const userRegister = {
	username: "testUsername",
	email: "test@gmail.com",
	password: "12345678910",
	country: "Brazil",
}

const userLogin = {
	email: "test@gmail.com",
	password: "12345678910",
}

const anime = {
	id: 1535,
	title: {
		english: "Death Note",
	},
	startDate: {
		day: 4,
		month: 10,
		year: 2006,
	},
	endDate: {
		day: 27,
		month: 6,
		year: 2007,
	},
	status: "FINISHED",
	episodes: 37,
	duration: 23,
	genres: ["Mystery", "Psychological", "Supernatural", "Thriller"],
	popularity: 664857,
	averageScore: 84,
	coverImage: {
		large:
			"https://s4.anilist.co/file/anilistcdn/media/anime/cover/medium/bx1535-lawCwhzhi96X.jpg",
	},
}

const formAnimeData = {
	id: 1535,
	status: "Watching",
	episodes: "25",
	score: "9",
	notes: "wawdwd",
}

let token = ""

describe("User Register", () => {
	it("Register user should return 201", async () => {
		const res = await request(app).post("/auth/register").send(userRegister)
		expect(res.statusCode).equal(201)
	})
})

describe("User Login", () => {
	it("Login should return 200", async () => {
		const res = await request(app).post("/auth/login").send(userLogin)
		token = res.body.token
		expect(res.statusCode).equal(200)
	})

	it("Login should return token and user data", async () => {
		const res = await request(app).post("/auth/login").send(userLogin)
		expect(res.body).have.property("token")
		expect(res.body).have.property("userObject")
	})
})

describe("Add anime to user list", () => {
	it("Add anime should return 200", async () => {
		const res = await request(app)
			.post("/user/addAnime")
			.set("Authorization", `Bearer ${token}`)
			.send({ formAnimeData: formAnimeData, anime: anime })
		expect(res.statusCode).equal(200)
	})
})

describe("Delete User", () => {
	it("Delete user should return 200", async () => {
		const res = await request(app)
			.delete("/user/deleteUser")
			.set("Authorization", `Bearer ${token}`)
		expect(res.statusCode).equal(200)
	})
})
