import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Spinner = () => {
  return (
    <div className="mx-auto w-fit text-5xl">
      <AiOutlineLoading3Quarters className="animate-spin" />
    </div>
  );
};

export default Spinner;
