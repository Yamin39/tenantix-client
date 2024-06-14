import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import slide1 from "../../../assets/images/slide1.jpg";
import slide2 from "../../../assets/images/slide2.jpg";
import slide3 from "../../../assets/images/slide3.jpg";

const Banner = () => {
  return (
    <div className="bg-[#ffffff67] shadow-lg rounded-3xl p-10">
      <div className="text-center w-full mb-10">
        <h1 className="text-[3rem] sm:text-[3.45rem] lg:text-[3.4rem] xl:text-[3.65rem] leading-[3.7rem] sm:leading-[4.5rem] font-bold mt-4">
          Modern Comfort in <br />
          <span className="text-primary-color">Apartment</span> Living
        </h1>
        <p className="max-w-[21.875rem] mx-auto text-lg leading-8 mt-2">Experience the best apartment living with modern amenities.</p>
        <Link
          to="/apartments"
          className="btn bg-primary-color text-white hover:bg-primary-color hover:brightness-90 h-auto min-h-0 text-base rounded-xl py-2 xl:px-7 mt-4"
        >
          Explore
        </Link>
      </div>
      <div>
        <Swiper
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          loop={true}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          grabCursor={true}
          modules={[Autoplay, Pagination]}
          className="xl:w-10/12 xl:mb-10 max-h-[30rem] shadow rounded-3xl"
        >
          <SwiperSlide className="h-[16rem] sm:h-auto">
            <img className="size-full object-cover" src={slide1} />
          </SwiperSlide>
          <SwiperSlide className="h-[16rem] sm:h-auto">
            <img className="size-full object-cover" src={slide2} />
          </SwiperSlide>
          <SwiperSlide className="h-[16rem] sm:h-auto">
            <img className="size-full object-cover" src={slide3} />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
