import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const token = localStorage.getItem("access-token");

  // console.log(token);

  // console.log("!loading", !loading);
  // console.log("!!user?.email", !!user?.email);
  // console.log("!!token", !!token);

  const {
    data: userRole = "",
    isLoading: userRoleLoading,
    // isSuccess,
  } = useQuery({
    queryKey: [user?.email],
    enabled: !loading && !!user?.email && !!token,
    // gcTime: 0,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data?.role;
    },
  });

  return { userRole, userRoleLoading };
};

export default useUserRole;
