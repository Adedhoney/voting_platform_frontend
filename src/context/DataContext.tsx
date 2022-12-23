import axios from "axios";
import {
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

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

type Candidate = {
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
	[key: string]: string
}

type DataContextType = {
	user: User;
	candidates: Candidate[];
	posts: Post[];
	vote: Vote;
	setVote: React.Dispatch<React.SetStateAction<Vote>>;
	position: number,
	changePositions: (command: string) => void
};

const DataContext = createContext<DataContextType>({} as DataContextType);

export const DataProvider = ({ children }: any) => {
	const [user, setUser] = useState<User>({} as User);
	const [candidates, setCandidates] = useState<Candidate[]>([] as Candidate[]);
  const [posts, setPosts] = useState<Post[]>([] as Post[]);
	const [vote, setVote] = useState<Vote>({} as Vote)
	const [position, setPosition] = useState(0);

	const fetchData = async (token: string) => {
		try {
			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Basic ${token}`,
				},
			};

			const { data: userData } = await axios.get(
				"http://192.168.0.101:4000/user/getUserData/",
				config
			);

			const { data: voteData } = await axios.get(
				"http://192.168.0.101:4000/user/getElectionData/",
				config
			);
			if (userData) {
				setUser(userData);
			}
			if (voteData) {
				setCandidates(voteData.candidates);
				setPosts(voteData.positions);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const changePositions = (command: string) => {
		if (command === "add") {
			setPosition((prev_position) => {
				if (prev_position >= posts.length - 1) {
					prev_position = 0;
				} else {
					prev_position = prev_position + 1;
				}
				return prev_position;
			});
			return;
		}

		setPosition((prev_position) => {
			if (prev_position <= 0) {
				prev_position = posts.length - 1;
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
		<DataContext.Provider value={{ user, candidates, posts, vote, setVote, position, changePositions }}>
			{user ? children : <div>Loading...</div>}
		</DataContext.Provider>
	);
};

export const useDataContext = () => {
	return useContext(DataContext);
};
