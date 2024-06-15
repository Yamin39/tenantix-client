import PropTypes from "prop-types";

const ApartmentCard = ({ room }) => {
  const { apartment_image, floor_no, block_name, apartment_no, rent } = room;

  return (
    <div className="bg-white shadow-md rounded-3xl">
      <div className="w-full h-[14rem] sm:h-[18.75rem] md:h-[22vw] lg:h-[11rem] xl:h-[12.5rem] 2xl:h-[18.75rem] p-2">
        <img className="size-full rounded-2xl" src={apartment_image} />
      </div>

      <div className="p-6 pt-0">
        <h6 className="text-2xl text-primary-color mt-2 font-semibold">
          {/* rent */}${rent}/<span className="text-lg text-gray-500">month</span>
        </h6>

        <div className="rounded-3xl p-2 mt-4 mb-6 bg-[#6b59f546]">
          <ul className="bg-white space-y-2 shadow-inner rounded-2xl p-2">
            {/* floor no */}
            <li className="bg-[#e9e9e98c] px-4 py-2 rounded-xl">
              <span className="font-semibold">Floor no: </span> {floor_no}
            </li>

            {/* Block name */}
            <li className="bg-[#e9e9e98c] px-4 py-2 rounded-xl">
              <span className="font-semibold">Block name: </span> {block_name}
            </li>

            {/* Apartment no */}
            <li className="bg-[#e9e9e98c] px-4 py-2 rounded-xl">
              <span className="font-semibold">Apartment no: </span> {apartment_no}
            </li>
          </ul>
        </div>

        <button className="w-full btn bg-primary-color text-white hover:bg-primary-color hover:brightness-90 h-auto min-h-0 lg:text-base rounded-2xl py-3">
          Agreement
        </button>
      </div>
    </div>
  );
};

ApartmentCard.propTypes = {
  room: PropTypes.object,
};

export default ApartmentCard;
