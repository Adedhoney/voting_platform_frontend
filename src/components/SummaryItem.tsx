import React from "react";

export const SummaryItem = ({
	candidate_name,
	candidate_department,
	candidate_level,
	picture,
	running_position_name,
}: {
	candidate_name: string;
	candidate_department: string;
	candidate_level: string;
	picture: string | null;
	running_position_name: string;
}) => {
	return (
		<div className='flex flex-col items-center justify-between gap-4 cursor-pointer p-4 sm:flex-row sm:py-4 sm:px-8'>
			<div className='user flex items-center text-center flex-col sm:flex-row sm:text-left'>
				<div className='avatar-content mb-2.5 sm:mb-0 sm:mr-2.5'>
					<img
						className='avatar w-20 h-20 rounded-full'
						src={
							picture &&
							picture.startsWith(
								"http"
							)
								? picture
								: "/pfp.svg"
						}
						alt='candidate image'
					/>
				</div>
				<div className='flex flex-col mb-4 sm:mb-0 sm:mr-4'>
					<a
						href='#'
						className='title font-medium no-underline'
					>
						{candidate_name}
					</a>
					<div className='skills flex flex-col'>
						<span className='subtitle text-slate-500'>
							{candidate_department}
						</span>
						<span className='subtitle text-slate-500'>
							{candidate_level}
						</span>
					</div>
				</div>
			</div>
			{/* <!--Button content --> */}
            <div className='mx-auto sm:ml-auto sm:mr-0'>
				<div
					className='whitespace-nowrap rounded font-bold leading-6 tracking-tight text-light-text-primary text-center'
				>
                    {running_position_name}
				</div>
			</div>
			{/* <!--Close Button content --> */}
		</div>
	);
};
