import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Candidate, useDataContext } from "../context/DataContext";
import { SummaryItem } from "../components/SummaryItem";
import { instance } from "../utils/axios_instance";

export const Confirmation = () => {
	const navigate = useNavigate();
	const { vote, posts, candidates } = useDataContext();
	const summary = Object.entries(vote).map(([key, value]) => {
		const position = posts.filter((p) => p.position_id === key);
		const candidate_selected = candidates.filter(
			(p) => p.candidate_id === value
		);
		return {
			position: position[0].position_name,
			selectedCandidate: candidate_selected[0],
		};
	});

	const submitVotes = async () => {
		const votesFormat = Object.entries(vote).map(([key, val]) => {
			return { positionId: key, candidateId: val };
		});

		const postBody = { votes: votesFormat };

		try {
			const config = {
				headers: {
					Authorization: `Basic ${localStorage.getItem(
						"token"
					)}`,
				},
			};
			console.log(votesFormat);
			const res = await instance.post(
				"/submitVote/",
				postBody,
				config
			);
			alert(res.data.message);
			console.log(res);
		} catch (error) {
			alert(error.response.data.message)
			console.log(error.response.data);
		}
	};

	return (
		<div className='h-screen w-screen overflow-y-auto'>
			<Header />
			<div className='relative w-full h-16 px-4 flex items-center justify-center border-b mb-8'>
				<button
					className='absolute left-4 py-1 px-2 border rounded-md'
					onClick={() => {
						navigate(-1);
					}}
				>
					Go back
				</button>
				<h3 className='text-light-text-primary font-semibold text-2xl truncate px-2 underline'>
					Confirm your vote!
				</h3>
			</div>
			<div
				className={`w-full max-w-lg divide-y md:divide-y-0 mx-auto flex flex-col ${
					summary.length > 0
						? "md:bg-white md:rounded-xl md:shadow-xl"
						: ""
				}`}
			>
				{/* Start */}
				{summary.length > 0 ? (
					summary.map(
						({
							position,
							selectedCandidate,
						}) => {
							console.log(position);
							const {
								candidate_name,
								candidate_department,
								candidate_level,
								picture,
							} = selectedCandidate;
							const data = {
								running_position_name:
									position,
								candidate_name,
								candidate_department,
								candidate_level,
								picture,
							};
							return (
								<SummaryItem
									key={
										selectedCandidate.candidate_id
									}
									{...data}
								/>
							);
						}
					)
				) : (
					<div className='text-center text-light-text-muted text-lg text-wrap'>
						You did not make any selection
					</div>
				)}
				{/* End */}
			</div>
			<div className='mt-8 flex justify-center'>
				<button
					className='py-1.5 px-2.5 border rounded-md transform focus:scale-95 hover:bg-gray-300 hover:text-bold hover:outline-2 shadow-md'
					onClick={submitVotes}
				>
					Sumit vote
				</button>
			</div>
		</div>
	);
};
