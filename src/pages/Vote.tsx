import React, { useState } from "react";
import Candidate from "../components/Candidate";
import { useDataContext } from "../context/DataContext";
import axios from "axios";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";
import { instance } from "../utils/axios_instance";

export const Vote = () => {
	const navigate = useNavigate()
	const { posts, position, changePositions, candidates, vote, setVote } =
		useDataContext();

	const onVoteClick = (candidate_id: string) => {
		const currentPost = posts[position].position_id;
		setVote((prev) => {
			return { ...prev, [currentPost]: candidate_id };
		});
	};

	return (
		<>
			<Header />
			<li className='w-full h-16 px-4 flex items-center justify-evenly'>
				<button
					className={`text-light-text-muted inline-flex items-center px-2.5 py-1 text-sm font-medium text-center bg-white border border-gray-300 rounded-lg  ${position <= 0 ? "disabled" : "hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200"}`}
					onClick={() => changePositions("minus")}
					disabled={position <= 0}
				>
					Prev
				</button>
				<p className='text-light-text-primary font-semibold text-xl truncate px-2 '>
					{posts[position]?.position_name}
				</p>
				<button
					className='text-light-text-muted inline-flex items-center px-2.5 py-1 text-sm font-medium text-center bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200'
					onClick={() => {
						if (position >= posts.length - 1) {
							navigate('/confirmation');
							return
						}
						changePositions("add")
					}}
				>
					Next
				</button>
			</li>

			<div className='my-8 mx-4 flex flex-wrap items-center justify-center gap-4'>
				{candidates.length ? (
					candidates
						.filter(
							(candidate) =>
								candidate
									.position
									.position_id ===
								posts[position]
									.position_id
						)
						.map((candidate) => (
							<Candidate
								key={
									candidate.candidate_id
								}
								onVoteClick={
									onVoteClick
								}
								{...candidate}
							/>
						))
				) : (
					<div>Loading...</div>
				)}
			</div>
		</>
	);
};
