import { configureStore } from '@reduxjs/toolkit';
import passwordInfo from './slices/passwordManagerSlice';

export const store = configureStore({
	reducer: {
		passwordInfo,
	},
});
