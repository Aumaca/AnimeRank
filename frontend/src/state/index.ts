import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AuthState } from "../interfaces/user"
import { UserAnime } from "../interfaces/user"

const initialState: AuthState = {
	user: null,
	token: null,
}

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setLogin: (state: AuthState, action: PayloadAction<AuthState>): void => {
			state.user = action.payload.user
			state.token = action.payload.token
		},
		setLogout: (state: AuthState): void => {
			state.user = null
			state.token = null
		},
		setAnimes: (state: AuthState, action: PayloadAction<UserAnime[]>): void => {
			console.log(action.payload)
			state.user!.animes = action.payload
		},
	},
})

export const { setLogin, setLogout, setAnimes } = authSlice.actions
export default authSlice.reducer
