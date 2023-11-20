// import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Spinner = () => {
  return (
    <div className="mx-auto w-fit text-5xl">
      {/* <AiOutlineLoading3Quarters className="animate-spin" /> */}
      <img
        class="w-20 h-20 animate-spin"
        src="https://www.svgrepo.com/show/199956/loading-loader.svg"
        alt="Loading icon"
      />
    </div>
  );
};

export default Spinner;
