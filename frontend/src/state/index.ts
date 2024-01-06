import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AuthState } from "../interfaces/user"

const initialState: AuthState = {
	token: null,
	username: null
}

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setLogin: (state: AuthState, action: PayloadAction<AuthState>): void => {
			state.token = action.payload.token
			state.username = action.payload.username
		},
		setLogout: (state: AuthState): void => {
			state.token = null
			state.username = null
		},
	},
})

export const { setLogin, setLogout } = authSlice.actions
export default authSlice.reducer
