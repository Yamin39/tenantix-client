import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUserRole from "../../../hooks/useUserRole";
import AgreementInfo from "../AgreementInfo/AgreementInfo";
import DashboardGreet from "../DashboardGreet/DashboardGreet";
import ProfileCard from "../ProfileCard/ProfileCard";

const UserProfile = () => {
  const { userRole } = useUserRole();
  const navigate = useNavigate();

  if (userRole !== "user") {
    navigate(-1);
  }

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

  return (
    <div className="p-6">
      <DashboardGreet></DashboardGreet>

      <div className="min-w-96 max-w-[31.25rem] mx-auto">
        <ProfileCard role="User"></ProfileCard>
      </div>

      <AgreementInfo agreement={agreement}></AgreementInfo>
    </div>
  );
};

export default UserProfile;
