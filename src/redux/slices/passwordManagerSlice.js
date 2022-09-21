import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	passwordData: [
		{
			password: '',
			passwordName: '',
			id: '',
		},
	],
};

const passwordSlice = createSlice({
	name: 'passwordInfo',
	initialState,
	reducers: {
		setPassword(state, action) {
			state.passwordData = action.payload;
		},
		setDeletePassword(state, action) {
			state.passwordData = state.passwordData.filter((password) => password.id !== action.payload);
		},
		setChangePassword(state, action) {
			state.passwordData.splice(
				state.passwordData.findIndex((password) => password.id === action.payload),
				1,
				action.payload,
			);
		},
	},
});

export const { setPassword, setDeletePassword, setChangePassword } = passwordSlice.actions;

export default passwordSlice.reducer;
