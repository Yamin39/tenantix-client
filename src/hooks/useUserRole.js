import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const token = localStorage.getItem("access-token");

  const {
    data: userRole = "",
    isLoading: userRoleLoading,
    // isSuccess,
    refetch,
  } = useQuery({
    queryKey: [user?.email],
    enabled: !loading && !!user?.email && !!token,
    // gcTime: 0,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data?.role;
    },
  });

  // // useEffect to update token when it's set in localStorage
  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     setToken(localStorage.getItem("access-token"));
  //   };
  //   window.addEventListener("storage", handleStorageChange);
  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);

  return { userRole, userRoleLoading, refetch };
};

export default useUserRole;
