import PropTypes from "prop-types";
import useAuth from "../../../hooks/useAuth";

const ProfileCard = ({ role }) => {
  const { user } = useAuth();
  return (
    <div className="mx-auto max-w-96 text-center bg-white rounded-3xl p-10 mt-6">
      <h3 className="font-semibold text-3xl">Profile details</h3>
      <ul className="mt-8 text-lg text-[#6b6b6b]">
        <li>
          <div className="mx-auto size-40 rounded-full bg-base-300">
            <img className="size-full rounded-full" src={user?.photoURL} alt="Profile pic" />
          </div>
        </li>
        <li className="w-fit mx-auto rounded-full px-6 py-1 mt-4 bg-violet-200 text-violet-700">{role}</li>
        <li className="mt-5">{user?.displayName}</li>
        <li className="mt-2">{user?.email}</li>
      </ul>
    </div>
  );
};

ProfileCard.propTypes = {
  role: PropTypes.string.isRequired,
};

export default ProfileCard;
