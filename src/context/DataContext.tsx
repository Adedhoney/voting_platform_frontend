import { AxiosError } from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../utils/axios_instance";
import { ErrorAlert } from "../utils/alerts";
import { LoadingScreen } from "../components/LoadingScreen";

type User = {
	createdAt: string;
	password: string;
	updatedAt: string;
	user_department: string;
	user_email: string;
	user_id: string;
	user_level: string;
	user_name: string;
	vote_status: boolean;
};

type Post = {
	position_id: string;
	position_name: string;
	createdAt: string;
	updatedAt: string;
};

export type Candidate = {
	candidate_department: string;
	candidate_id: string;
	candidate_level: string;
	candidate_matric: string;
	candidate_name: string;
	createdAt: string;
	picture: null;
	position: Post;
	running_position: string;
	updatedAt: string;
};

type Vote = {
	[key: string]: string;
};

type DataContextType = {
	user: User;
	candidates: Candidate[];
	posts: Post[];
	vote: Vote;
	setVote: React.Dispatch<React.SetStateAction<Vote>>;
	position: number;
	setPosition: React.Dispatch<React.SetStateAction<number>>;
	changePositions: (command: string) => void;
};

const DataContext = createContext<DataContextType>({} as DataContextType);

export const DataProvider = ({ children }: any) => {
	const navigate = useNavigate();
	const [user, setUser] = useState<User>({} as User);
	const [candidates, setCandidates] = useState<Candidate[]>(
		[] as Candidate[]
	);
	const [posts, setPosts] = useState<Post[]>([] as Post[]);
	const [vote, setVote] = useState<Vote>({} as Vote);
	const [position, setPosition] = useState(0);

	const fetchData = async (token: string) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Basic ${token}`,
				},
			};

			const { data: userData } = await instance.get(
				"/getUserData/",
				config
			);

			const { data: voteData } = await instance.get(
				"/getElectionData/",
				config
			);
			if (userData) {
				setUser(userData);
			}
			if (voteData) {
				setPosts(voteData.positions);
				setCandidates(voteData.candidates);
			}
		} catch (error) {
			const err = error as AxiosError;
			if (
				err.code === "ERR_NETWORK" &&
				err.request.timeout === 0
			) {
				ErrorAlert(err).fire({
					titleText: "A network error has occurred",
					text: "Please check your network and try reloading the page again.",
				});
				localStorage.removeItem("token");
				navigate("/login");
				return;
			}
			if (
				err.response?.status === 401 ||
				err.response?.status === 402 ||
				err.response?.status === 403
			) {
				ErrorAlert(err).fire();
				localStorage.removeItem("token");
				navigate("/login");
				return;
			} else {
				ErrorAlert(err).fire();
			}
		}
	};

	const changePositions = (command: string) => {
		if (command === "add") {
			setPosition((prev_position) => {
				if (prev_position >= posts.length - 1) {
					// prev_position = 0;
				} else {
					prev_position = prev_position + 1;
				}
				return prev_position;
			});
			return;
		}

		setPosition((prev_position) => {
			if (prev_position <= 0) {
				// prev_position = posts.length - 1;
			} else {
				prev_position = prev_position - 1;
			}
			return prev_position;
		});
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			fetchData(token);
		}
	}, []);

	return (
		<DataContext.Provider
			value={{
				user,
				candidates,
				posts,
				vote,
				setVote,
				position,
				setPosition,
				changePositions,
			}}
		>
			{user?.user_id ? children : <LoadingScreen />}
		</DataContext.Provider>
	);
};

export const useDataContext = () => {
	return useContext(DataContext);
};
