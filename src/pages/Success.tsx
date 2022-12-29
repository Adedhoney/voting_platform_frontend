import React from "react";
import { Header } from "../components/Header";

export const Success = () => {
	return (
		<div className='h-screen w-full overflow-y-auto space-y-12 md:space-y-20'>
			<Header />
			<div className='flex flex-col gap-8 font-medium items-center justify-center'>
				<img
					src={"/assets/voted.svg"}
					className='object-cover'
					alt='voted image file'
				></img>
				<p className='text-light-text-primary text-center text-lg md:text-2xl px-4'>
					You have voted successfully, wait for
					the results to be announced.
				</p>
			</div>
		</div>
	);
};
