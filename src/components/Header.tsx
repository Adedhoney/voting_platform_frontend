import { useDataContext } from "../context/DataContext"
import { useNavigate } from "react-router-dom"

export function Header({}) {
    const navigate = useNavigate()
    const { user } = useDataContext()
    const username = user?.user_name ? user.user_name : ""

    const logout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }

    return (
        <div className="w-full h-16 flex md:pr-10">
            <div className="flex flex-col gap-0.5 my-auto ml-auto mr-4 w-fit justify-end items-center">
                <h3 className="md:text-lg truncate px-2">
                    Welcome{user?.user_name && ", "}
                    <span className="font-semibold">{username}</span>
                </h3>
                <button
                    className="inline-flex items-center gap-1 justify-center text-neutral-700 self-end font-semibold underline hover:opacity-70"
                    onClick={logout}
                >
                    Logout
                    <span>
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    )
}
