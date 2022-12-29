import { AxiosError } from "axios";
import Swal from "sweetalert2";

const myCustomClass = {
	popup: "rounded-lg bg-neutral-50",
	confirmButton:
		"py-1 px-2 border bg-white shadow-sm rounded-md text-lg transform focus:scale-95 hover:bg-neutral-200 hover:text-light-text-primary font-bold hover:outline-2",
	cancelButton:
		"py-1 px-2 border bg-red-900 text-white shadow-sm rounded-md text-lg transform focus:scale-95 hover:bg-neutral-200 hover:text-light-text-primary font-bold hover:outline-2",
	actions: "space-x-1",
};

export const WarningAlert = Swal.mixin({
	iconColor: "#404040",
	showCancelButton: true,
	icon: "warning",
	buttonsStyling: false,
	customClass: { ...myCustomClass },
});

export const SuccessAlert = Swal.mixin({
	iconColor: "#404040",
	icon: "success",
	buttonsStyling: false,
	customClass: { ...myCustomClass },
});

export const InfoAlert = Swal.mixin({
	iconColor: "#404040",
	icon: "info",
	buttonsStyling: false,
	customClass: { ...myCustomClass },
});

export const QuestionAlert = Swal.mixin({
	iconColor: "#404040",
	icon: "question",
	buttonsStyling: false,
	customClass: { ...myCustomClass },
});

export const ErrorAlert = (err: AxiosError) =>
	Swal.mixin({
		iconColor: "#404040",
		icon: "error",
		titleText: (err?.response?.data as { message: string })
			?.message,
		buttonsStyling: false,
		customClass: {
			...myCustomClass,
			confirmButton:
				"py-2.5 px-6 border bg-white shadow-sm rounded-md text-lg transform focus:scale-95 hover:bg-neutral-100 hover:text-light-text-primary font-bold hover:outline-2 tracking-wider",
		},
	});
