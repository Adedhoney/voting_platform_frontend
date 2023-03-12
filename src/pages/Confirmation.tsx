import { useNavigate } from "react-router-dom"
import { Header } from "../components/Header"
import { useDataContext } from "../context/DataContext"
import { SummaryItem } from "../components/SummaryItem"
import { instance } from "../utils/axios_instance"
import { AxiosError } from "axios"
import { ErrorAlert, SuccessAlert, WarningAlert } from "../utils/alerts"

export const Confirmation = () => {
    const navigate = useNavigate()
    const { vote, posts, candidates, setVote, setPosition } = useDataContext()
    const summary = Object.entries(vote).map(([key, value]) => {
        const position = posts.filter((p) => p.position_id === key)
        const candidate_selected = candidates.filter(
            (p) => p.candidate_id === value
        )
        return {
            position: position[0].position_name,
            selectedCandidate: candidate_selected[0],
        }
    })

    const reset = () => {
        setPosition(0)
        setVote({})
        navigate("/")
    }

    const confirmReset = async () => {
        const response = await WarningAlert.fire({
            titleText: "Are you sure you want to reset your vote?",
            text: "All of your votes will be cleared, you can reselect them again.",
            confirmButtonText: "Yes, reset my vote",
        })

        if (response.isConfirmed) {
            reset()
        }
    }

    const confirmVote = async () => {
        const result = await WarningAlert.fire({
            titleText: "Are you sure you want to submit your vote?",
            text: "You cannot change it later!",
            confirmButtonText: "Yes, submit my vote",
        })

        if (result.isConfirmed) {
            const votesFormat = Object.entries(vote).map(([key, val]) => {
                return {
                    positionId: key,
                    candidateId: val,
                }
            })

            const postBody = { votes: votesFormat }
            submitVotes(postBody)
        }
    }

    const submitVotes = async (postBody: {
        votes: { positionId: string; candidateId: string }[]
    }) => {
        try {
            const config = {
                headers: {
                    Authorization: `Basic ${localStorage.getItem("token")}`,
                },
            }
            const res = await instance.post("/submitVote/", postBody, config)

            SuccessAlert.fire("You have voted successfully")
            navigate("/success")
        } catch (error) {
            const err = error as AxiosError
            ErrorAlert(err).fire()
        }
    }

    return (
        <div className="h-full w-full pb-10 bg-neutral-50">
            <Header />
            <div className="relative w-full md:h-16 px-4 flex flex-col md:flex-row items-center justify-center md:border-b mb-8">
                <button
                    className="md:absolute mr-auto mb-4 left-4 py-1 px-2 border rounded-md"
                    onClick={() => {
                        navigate(-1)
                    }}
                >
                    Go back
                </button>
                <h3 className="text-light-text-primary font-semibold text-2xl truncate px-2 underline">
                    Confirm your vote!
                </h3>
            </div>
            <div
                className={`w-full max-w-lg divide-y mx-auto flex flex-col ${
                    summary.length > 0
                        ? "md:bg-white md:rounded-xl md:shadow-xl"
                        : ""
                }`}
            >
                {/* Start */}
                {summary.length > 0 ? (
                    summary.map(({ position, selectedCandidate }) => {
                        const {
                            candidate_name,
                            candidate_department,
                            candidate_level,
                            picture,
                        } = selectedCandidate
                        const data = {
                            running_position_name: position,
                            candidate_name,
                            candidate_department,
                            candidate_level,
                            picture,
                        }
                        return (
                            <SummaryItem
                                key={selectedCandidate.candidate_id}
                                {...data}
                            />
                        )
                    })
                ) : (
                    <div className="text-center text-light-text-muted text-lg text-wrap">
                        You did not make any selection
                    </div>
                )}
                {/* End */}
            </div>
            {summary.length > 0 && (
                <div className="mt-8 flex justify-center gap-2 pb-10">
                    <button
                        className="py-1.5 px-4 border bg-white shadow-sm rounded-md text-lg transform focus:scale-95 hover:bg-neutral-200 hover:text-light-text-primary font-bold hover:outline-2 tracking-wider"
                        onClick={confirmReset}
                    >
                        Reset
                    </button>
                    <button
                        className="py-1.5 px-4 border bg-red-900 text-white shadow-sm rounded-md text-lg transform focus:scale-95 hover:bg-neutral-200 hover:text-light-text-primary font-bold hover:outline-2 tracking-wider"
                        onClick={confirmVote}
                    >
                        Cast vote
                    </button>
                </div>
            )}
        </div>
    )
}
