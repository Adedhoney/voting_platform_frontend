import { Spinner } from "./Spinner";

export const LoadingScreen = () => {
  return (
    <div className="w-full h-full flex flex-col p-8 items-center justify-center gap-6">
      <h3 className="text-center">
        Please wait while the page loads, if it takes too long, try reloading
        the page
      </h3>
      <Spinner />
    </div>
  );
};
