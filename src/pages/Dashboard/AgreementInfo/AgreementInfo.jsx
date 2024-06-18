import moment from "moment";
import PropTypes from "prop-types";
import useAuth from "../../../hooks/useAuth";

const AgreementInfo = ({ agreement }) => {
  const { loading } = useAuth();

  const { accepted_date, room_no, floor_no, block_name, apartment_no, rent } = agreement;

  return (
    <div className="mt-10 bg-white rounded-3xl p-3 pb-8">
      <div className="flex items-center gap-3 p-6 rounded-3xl bg-[#e9e9e98c]">
        <h3 className="font-semibold text-2xl">Agreement accept date:</h3>
        <p className="rounded-full px-6 py-1 bg-green-200 text-green-700">{accepted_date ? moment(accepted_date).format("DD MMMM YYYY, LT") : "none"}</p>
      </div>

      <h3 className="font-semibold text-2xl pt-5 pl-1 sm:pl-3 mb-2">Rented apartment info</h3>

      <div className="overflow-x-auto">
        <table className="w-full table-xs sm:table-md md:table-lg lg:table table-zebra">
          <thead>
            <tr className="text-left text-gray-500 text-xs sm:text-base">
              <th>Floor no</th>
              <th>Block name</th>
              <th>Room no</th>
              <th>Apartment no</th>
              <th>Rent</th>
            </tr>
          </thead>

          {!loading && (
            <tbody>
              <tr className="text-xs sm:text-base">
                <td>{floor_no || "none"}</td>
                <td>{block_name || "none"}</td>
                <td>{room_no || "none"}</td>
                <td>{apartment_no || "none"}</td>
                <td>{rent ? `$${rent}` : "none"}</td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

AgreementInfo.propTypes = {
  agreement: PropTypes.object,
};

export default AgreementInfo;
