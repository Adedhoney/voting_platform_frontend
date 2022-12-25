import React from "react";
import { useDataContext } from "../context/DataContext";

export function Header({}) {
	const {
		user
	} = useDataContext();
  return <div className='h-16 w-full flex'>
				<div className='md:text-lg my-auto ml-auto mr-4 w-fit justify-end items-center'>
					Welcome, <span className='font-semibold'>{user.user_name}</span>
				</div>
			</div>;
}
  