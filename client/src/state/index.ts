import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface AuthState {
	user: userState | null
	token: string | null
}

interface userState {
	username: string
	email: string
	password: string
	country: string
	picture: string | null
}

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
	},
})

export const { setLogin, setLogout } = authSlice.actions
export default authSlice.reducer