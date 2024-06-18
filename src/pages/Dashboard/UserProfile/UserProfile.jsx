import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AgreementInfo from "../AgreementInfo/AgreementInfo";
import ProfileCard from "../ProfileCard/ProfileCard";

const UserProfile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: agreement = {} } = useQuery({
    queryKey: ["agreement"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreements/${user.email}/confirmed`);
      return res.data;
    },
  });

  console.log(typeof agreement);

  return (
    <div className="p-6">
      <div className="bg-white rounded-3xl p-6">
        <h3 className="font-semibold text-2xl">Welcome, {user?.displayName?.split(" ")[0]}</h3>
        <p className="text-gray-400">{moment().format("dddd, MMM DD")}</p>
      </div>

      <ProfileCard role="User"></ProfileCard>

      <AgreementInfo agreement={agreement}></AgreementInfo>
    </div>
  );
};

export default UserProfile;
