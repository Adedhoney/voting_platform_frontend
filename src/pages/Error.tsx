import { useNavigate } from "react-router-dom";

export const Error = () => {
	const navigate = useNavigate();
	return (
		<div className='h-screen w-screen flex items-center justify-center'>
			<div className='flex flex-col gap-4 text-xl'>
				You have just found a error page.{" "}
				<p className='text-center text-9xl text-gray-500 px-2 md:px-4'>
					404
				</p>
				<button
					className='border w-fit mx-auto py-1 px-3 rounded-lg bg-white text-gray-700 shadow-sm text-lg transform focus:scale-95 hover:bg-neutral-200 hover:text-light-text-primary font-bold hover:outline-2'
					onClick={() => navigate("/")}
				>
					Go back
				</button>
			</div>
		</div>
	);
};
