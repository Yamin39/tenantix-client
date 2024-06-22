import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import NotFoundAnimation from "../../assets/animations/notFound.json";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col gap-4 justify-center items-center font-open-sans">
      <div>
        <Lottie className="max-w-[24rem]" animationData={NotFoundAnimation} />
      </div>
      <div className="text-center">
        <h4 className="text-3xl sm:text-5xl font-medium mt-4">Not Found</h4>
        <p className="sm:text-lg font-medium max-w-96 mx-auto mt-3 sm:mt-5 mb-3">
          Something went wrong or <br /> The page you are looking is doesn&apos;t exist!
        </p>
        <Link to="/" className="btn bg-primary-color text-white hover:bg-black h-auto min-h-0 text-base rounded-md py-2 xl:px-7 mt-4">
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
