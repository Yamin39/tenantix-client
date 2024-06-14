import aptImg from "../../../assets/images/about.jpg";

const About = () => {
  return (
    <div className="mt-10 py-12 md:py-24 flex flex-col-reverse lg:flex-row gap-10 justify-evenly items-center">
      <div className="lg:w-1/2 text-center lg:text-left">
        <h1 className="text-[3rem] sm:text-[3.45rem] lg:text-[3.4rem] xl:text-[3.65rem] leading-[3.7rem] sm:leading-[4.5rem] font-semibold mt-4">
          About the <br />
          Building
        </h1>
        <p className="max-w-[36.875rem] mx-auto lg:mx-0 text-lg leading-8 mt-4">
          Welcome to the epitome of modern luxury. Our building is a testament to the harmonious blend of rich history and contemporary living. Constructed in
          2010. Our building stands as a beacon of sophistication and elegance, offering residents an unparalleled living experience. Designed with contemporary
          aesthetics and cutting-edge technology, our apartments provide the perfect blend of style and functionality, making every day feel like a retreat.
        </p>
      </div>

      <div className="lg:w-1/2">
        <div className="xl:w-11/12 ml-auto">
          <img className="rounded-3xl" src={aptImg} />
        </div>
      </div>
    </div>
  );
};

export default About;
