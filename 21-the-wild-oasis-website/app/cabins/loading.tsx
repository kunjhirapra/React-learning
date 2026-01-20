import Spinner from "../_components/Spinner";

function Loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className="text-xl">Loading cabin data...</p>
    </div>
  );
}

export default Loading;
