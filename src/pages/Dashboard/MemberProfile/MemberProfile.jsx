import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AgreementInfo from "../AgreementInfo/AgreementInfo";
import DashboardGreet from "../DashboardGreet/DashboardGreet";
import ProfileCard from "../ProfileCard/ProfileCard";

const MemberProfile = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: agreement = {} } = useQuery({
    queryKey: ["agreement"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/agreements/${user.email}/checked`);
      return res.data;
    },
  });
  return (
    <div className="p-6">
      <DashboardGreet></DashboardGreet>

      <div className="min-w-96 max-w-[31.25rem] mx-auto">
        <ProfileCard role="Member"></ProfileCard>
      </div>

      <AgreementInfo agreement={agreement}></AgreementInfo>
    </div>
  );
};

export default MemberProfile;
