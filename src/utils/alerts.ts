import { AxiosError } from "axios";
import Swal from "sweetalert2";

export const WarningAlert = Swal.mixin({
	iconColor: "#404040",
	showCancelButton: true,
	icon: "warning",
});

export const SuccessAlert = Swal.mixin({
	icon: "success",
});

export const InfoAlert = Swal.mixin({
	icon: "info",
});

export const QuestionAlert = Swal.mixin({
	icon: "question",
});

export const ErrorAlert = (err: AxiosError) =>
	Swal.mixin({
		icon: "error",
		titleText: (err?.response?.data as { message: string })
			?.message
	});
