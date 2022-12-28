export const Error = () => {
	return (
		<div className='h-screen w-screen flex items-center justify-center'>
			<div className='flex flex-col gap-4 text-lg'>
				You have just found a error page.{" "}
				<button className='border w-fit mx-auto py-1 px-3 rounded-lg text-base'>
					Go back
				</button>
			</div>
		</div>
	);
};
