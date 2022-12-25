import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { instance } from "../utils/axios_instance";

export const Login = () => {
	const navigate = useNavigate();
	const [authInfo, useAuthInfo] = useState<{
		matricNO: number;
		password: string;
	}>({
		matricNO: 0,
		password: "",
	});

	const submit = async () => {
		if (!authInfo.matricNO || !authInfo.password) {
			// alert
			return;
		}

		try {
			const { data } = await instance.get(
				"/login/",
				{ params: authInfo }
			);
			if (data.accessToken) {
				console.log(data.accessToken)
				localStorage.setItem("token", data.accessToken);
				navigate("/");
				return;
			}
			throw new Error("Your information is incorrect");
		} catch (error) {
			const err = error as AxiosError;
			alert(err?.response?.data?.message);
			console.log(err)
			console.log(err?.response?.data?.message);
		}
	};

	useEffect(() => {}, []);

	return (
		<div className='h-screen overflow-y-auto grid items-center justify-center'>
			<div className='w-[90vw] xs:w-96 p-4 bg-white xs:border border-gray-200 xs:rounded-lg xs:shadow-md sm:p-6 md:p-8'>
				<form
					className='space-y-6 w-full'
					onSubmit={(e) => e.preventDefault()}
				>
					<div>
						<img
							className='h-16 w-16 mx-auto'
							src='/TESA_logo_white.jpeg'
						/>
					</div>
					<h5 className='text-xl font-medium text-light-text-primary'>
						Sign in to vote
					</h5>
					<div>
						<label
							htmlFor='matric_no'
							className='block mb-2 text-sm font-medium text-light-text-primary'
						>
							Your Matric Number
						</label>
						<input
							type='number'
							name='matric_no'
							id='matric_no'
							className='bg-gray-50 border border-light-separator text-light-text-primary text-base rounded-lg focus:ring-light-main-secondary focus:border-light-main-secondary block w-full p-2.5 placeholder:tracking-wider'
							placeholder='Matric no.'
							required
							onChange={(e) => {
								useAuthInfo(
									(
										prev
									) => ({
										...prev,
										matricNO: +e
											.target
											.value,
									})
								);
							}}
						/>
					</div>
					<div>
						<label
							htmlFor='password'
							className='block mb-2 text-sm font-medium text-light-text-primary'
						>
							Your sign-in token
						</label>
						<input
							type='password'
							name='password'
							id='password'
							className='bg-gray-50 border border-light-separator text-light-text-primary text-base rounded-lg focus:ring-light-main-secondary focus:border-light-main-secondary block w-full p-2.5 placeholder:tracking-widest'
							placeholder='••••••••'
							required
							onChange={(e) => {
								useAuthInfo(
									(
										prev
									) => ({
										...prev,
										password: e
											.target
											.value,
									})
								);
							}}
						/>
					</div>
					<button
						className='text-light-text-primary text-base rounded-md py-2.5 px-5 border-2 border-light-separator w-full bg-light-secondary transform focus:scale-95 font-medium text-center '
						onClick={submit}
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};
