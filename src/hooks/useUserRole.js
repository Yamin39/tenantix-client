import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const token = localStorage.getItem("access-token");

  const { data: userRole = "", isPending: userRoleLoading } = useQuery({
    queryKey: [user?.email, "userRole", token],
    enabled: !loading && !!user?.email && !!token,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data?.role;
    },
  });

  return { userRole, userRoleLoading };
};

export default useUserRole;
