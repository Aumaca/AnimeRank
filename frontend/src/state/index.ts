import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { AuthState } from "../interfaces/user"

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
