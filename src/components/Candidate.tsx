import { useDataContext } from "../context/DataContext"

const Candidate = ({
    candidate_name,
    candidate_department,
    candidate_level,
    candidate_id,
    picture,
    onVoteClick,
}: {
    candidate_name: string
    candidate_department: string
    candidate_level: string
    candidate_id: string
    picture: string | null
    onVoteClick: (candidate_id: string) => void
}) => {
    const { vote, posts, position } = useDataContext()
    const current_post = posts[position].position_id
    const isSelected = vote[current_post] === candidate_id

    return (
        <div
            className={`transform duration-300 relative px-4 w-full max-w-sm ${
                isSelected ? "bg-[#F5F9E5]" : "bg-white"
            } border border-gray-200 rounded-lg shadow-md`}
        >
            <div
                className={`absolute top-4 right-4 text-gray-600 ${
                    isSelected ? "" : "hidden"
                }`}
            >
                <svg
                    className="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                </svg>
            </div>
            <div className="flex flex-col items-center pb-10 pt-8">
                <img
                    className="w-24 h-24 mb-3 rounded-full shadow-lg bg-white object-cover"
                    src={
                        picture?.startsWith("http")
                            ? picture
                            : "/assets/pfp.svg"
                    }
                    alt="profile"
                />
                <h5 className="mb-1 text-xl font-medium text-light-text-primary text-center">
                    {candidate_name || "No candidate name available"}
                </h5>
                <span className="text-sm text-light-text-muted">
                    {candidate_department}
                </span>
                <span className="text-sm text-light-text-muted">
                    {candidate_level + " "}level
                </span>
                <div
                    className={`${
                        isSelected ? "invisible" : "visible"
                    } mt-4 grid grid-col transform duration-75`}
                >
                    <button
                        className={`inline-flex items-center px-4 py-2 text-sm font-medium text-center text-light-text-primary bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 tracking-widest`}
                        onClick={() => {
                            onVoteClick(candidate_id)
                        }}
                    >
                        Vote
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Candidate
