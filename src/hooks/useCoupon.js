import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCoupon = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: coupons = [],
    isPending: couponLoading,
    refetch: refetchCoupons,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosPublic.get("/coupons");
      return res.data;
    },
  });
  return { coupons, couponLoading, refetchCoupons };
};

export default useCoupon;
