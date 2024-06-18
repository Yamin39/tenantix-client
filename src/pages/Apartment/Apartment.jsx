import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loading from "../../components/Loading/Loading";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ApartmentCard from "./ApartmentCard/ApartmentCard";

const Apartment = () => {
  const axiosPublic = useAxiosPublic();

  const { data: count = 0 } = useQuery({
    queryKey: ["roomsCount"],
    queryFn: async () => {
      const res = await axiosPublic.get("/roomsCount");
      return res.data.count;
    },
  });

  const roomsPerPage = 6;
  const totalPages = Math.ceil(count / roomsPerPage);
  const pages = [...Array(totalPages).keys()];
  const [currentPage, setCurrentPage] = useState(0);

  const handlePrevBtn = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextBtn = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const {
    data: rooms = [],
    isPending,
    refetch: refetchRooms,
  } = useQuery({
    queryKey: ["apartmentRooms", currentPage, roomsPerPage],
    queryFn: async () => {
      const res = await axiosPublic.get(`/rooms?page=${currentPage}&size=${roomsPerPage}`);
      return res.data;
    },
  });

  return (
    <>
      {isPending ? (
        <Loading></Loading>
      ) : (
        <div>
          <SectionHeader title="Apartment rooms" desc="Explore modern, luxurious apartment rooms with top amenities in prime locations."></SectionHeader>

          <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-6">
            {rooms.map((room) => (
              <ApartmentCard key={room._id} room={room} refetchRooms={refetchRooms}></ApartmentCard>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="join">
              <button className="join-item btn btn-lg bg-primary-color hover:bg-primary-color hover:brightness-90 text-white" onClick={handlePrevBtn}>
                «
              </button>
              {pages.map((page) => (
                <button onClick={() => setCurrentPage(page)} className={`join-item btn btn-lg ${currentPage === page ? "btn-active" : ""}`} key={page}>
                  {page + 1}
                </button>
              ))}
              <button className="join-item btn btn-lg bg-primary-color hover:bg-primary-color hover:brightness-90 text-white" onClick={handleNextBtn}>
                »
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Apartment;
