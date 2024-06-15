import SectionHeader from "../../components/SectionHeader/SectionHeader";
import ApartmentCard from "./ApartmentCard/ApartmentCard";

const Apartment = () => {
  return (
    <div>
      <SectionHeader title="Apartment rooms" desc="Explore modern, luxurious apartment rooms with top amenities in prime locations."></SectionHeader>

      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-6">
        <ApartmentCard></ApartmentCard>
      </div>
    </div>
  );
};

export default Apartment;
