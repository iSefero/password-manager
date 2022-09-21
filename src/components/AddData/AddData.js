import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux/es/exports';

import s from './AddData.module.scss';
import { setPassword } from '../../redux/slices/passwordManagerSlice';

function AddData() {
	const passRef = React.useRef();
	const nameRef = React.useRef();
	const dispatch = useDispatch();

	const [newPassword, setNewPassword] = React.useState({
		passwordName: '',
		password: '',
	});

	const addNewPassword = async () => {
		try {
			await axios.post('https://630f7dc23792563418911561.mockapi.io/password-manager', newPassword);
			passRef.current.value = '';
			nameRef.current.value = '';

			await axios
				.get('https://630f7dc23792563418911561.mockapi.io/password-manager')
				.then((resp) => {
					dispatch(setPassword(resp.data));
				});
		} catch (error) {
			alert('Errors with adding data, possibly problems with the server.');
			console.error(error);
		}
	};

	const handleChange = (e, inputName) => {
		setNewPassword({ ...newPassword, [inputName]: e.target.value });
	};

	return (
		<div className={s.wrapper}>
			<h2 className={s.title}>Your new password</h2>
			<form className={s.formInput}>
				<div className={s.inputArea}>
					<span>name password:</span>
					<input
						ref={nameRef}
						onChange={(e) => handleChange(e, 'passwordName')}
						type="text"
						value={newPassword.passwordName}
					/>
				</div>
				<div className={s.inputArea}>
					<span>password:</span>
					<input
						ref={passRef}
						onChange={(e) => handleChange(e, 'password')}
						type="text"
						value={newPassword.password}
					/>
				</div>
				<div className={s.spanSkin}>
					<div onClick={addNewPassword} className={s.spanButton}>
						save
					</div>
				</div>
			</form>
		</div>
	);
}

export default AddData;
