import React from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import axios from 'axios';

import s from './ListData.module.scss';
import { setDeletePassword, setChangePassword } from '../../redux/slices/passwordManagerSlice';

function ListData() {
	const [saveChanges, setSaveChanges] = React.useState(true);
	const dispatch = useDispatch();
	const passwordInfo = useSelector((state) => state.passwordInfo.passwordData);
	const [changePasswordData, setChangePasswordData] = React.useState({
		passwordName: '',
		password: '',
	});

	const onSaveChanges = () => {
		setSaveChanges(!saveChanges);
	};

	const returnData = () => {
		setSaveChanges(true);
	};
	const onRemoveData = async (id) => {
		try {
			await axios.delete(`https://630f7dc23792563418911561.mockapi.io/password-manager/${id}`);
			dispatch(setDeletePassword(id));
		} catch (error) {
			alert('Errors with deleting data, possibly problems with the server.');
			console.error(error);
		}
	};

	const onChangeData = async (id) => {
		try {
			await axios.put(
				`https://630f7dc23792563418911561.mockapi.io/password-manager/${id}`,
				changePasswordData,
			);
			setSaveChanges(true);
			dispatch(setChangePassword(id));
		} catch (error) {
			alert('Errors when saving data, possibly problems with the server.');
			console.error(error);
		}
	};

	const handleChange = (e, inputName) => {
		setChangePasswordData({ ...changePasswordData, [inputName]: e.target.value });
	};

	return (
		<div className={s.wrapper}>
			{passwordInfo.map((obj) => (
				<div key={obj.id} className={s.passwordList}>
					<div className={saveChanges ? s.entryFieldFalse : s.entryField}>
						<span>name password:</span>
						<input
							maxLength={20}
							onChange={(e) => handleChange(e, 'passwordName')}
							disabled={saveChanges}
							type="text"
							value={saveChanges ? obj.passwordName : changePasswordData.passwordName || ''}
							placeholder={obj.passwordName}
						/>
						<span>password:</span>
						<input
							maxLength={20}
							onChange={(e) => handleChange(e, 'password')}
							disabled={saveChanges}
							type="text"
							value={saveChanges ? obj.password : changePasswordData.password || ''}
							placeholder={obj.password}
						/>
					</div>
					<div className={s.changeMenu}>
						<div>
							<span onClick={() => onRemoveData(obj.id)}>Delete</span>
						</div>
						{saveChanges ? (
							<div>
								<span onClick={() => onSaveChanges(obj.id)}>Change</span>
							</div>
						) : (
							<div className={s.hiddenMenu}>
								<div>
									<span onClick={() => onChangeData(obj.id)}>Save</span>
								</div>
								<div>
									<span onClick={returnData}>Return</span>
								</div>
							</div>
						)}
					</div>
				</div>
			))}
		</div>
	);
}

export default ListData;
