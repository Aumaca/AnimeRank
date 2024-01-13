import request from "supertest"
import { expect } from "chai"
import app from "../index.js"

let userAnimes

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
	id: 16498,
	title: {
		english: "Attack on Titan",
	},
	startDate: {
		day: 7,
		month: 4,
		year: 2013,
	},
	endDate: {
		day: 28,
		month: 9,
		year: 2013,
	},
	status: "FINISHED",
	episodes: 25,
	duration: 24,
	genres: ["Action", "Drama", "Fantasy", "Mystery"],
	popularity: 734201,
	averageScore: 84,
	meanScore: 84,
	coverImage: {
		medium:
			"https://s4.anilist.co/file/anilistcdn/media/anime/cover/small/bx16498-C6FPmWm59CyP.jpg",
	},
}

// anime title:
const formAnimeData = {
	id: 16498,
	status: "Completed",
	episodes: "25",
	score: "10",
	notes: "wawdwd",
	isFavorite: true,
}

let token = ""

let username = ""

describe("User Register", () => {
	it("Register user should return 201", async () => {
		const res = await request(app).post("/auth/register").send(userRegister)
		token = res.body.token
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
		expect(res.body).have.property("username")
	})
})

describe("User List", () => {
	it("Add anime should return 201", async () => {
		const res = await request(app)
			.put("/user/addUpdateAnime")
			.set("Authorization", `Bearer ${token}`)
			.send({ formAnimeData: formAnimeData, anime: anime })
		userAnimes = res.body
		expect(res.statusCode).equal(201)
	})

	it("Update anime in list should return 200", async () => {
		const res = await request(app)
			.put("/user/addUpdateAnime")
			.set("Authorization", `Bearer ${token}`)
			.send({
				formAnimeData: { ...formAnimeData, score: "8" },
				anime: anime,
			})

		expect(res.statusCode).equal(200)
	})
})

describe("Update User isFavorite", () => {
	it("Update isFavorite from true to false should return 200", async () => {
		const res = await request(app)
			.post("/user/setIsFavorite")
			.set("Authorization", `Bearer ${token}`)
			.send({
				newIsFavorite: !userAnimes.filter(
					(userAnime) => userAnime.id === anime.id
				)[0].isFavorite,
				animeId: anime.id,
			})

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
