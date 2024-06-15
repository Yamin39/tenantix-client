import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import ApartmentCard from "./ApartmentCard/ApartmentCard";

const Apartment = () => {
  const axiosPublic = useAxiosPublic();

  const { data: rooms = [], isPending } = useQuery({
    queryKey: ["apartmentRooms"],
    queryFn: async () => {
      const res = await axiosPublic.get("/rooms");
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
              <ApartmentCard key={room._id} room={room}></ApartmentCard>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Apartment;
