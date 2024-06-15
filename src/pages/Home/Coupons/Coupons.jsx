import Loading from "../../../components/Loading/Loading";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import useCoupon from "../../../hooks/useCoupon";
import CouponCard from "../CouponCard/CouponCard";

const Coupons = () => {
  const { coupons, couponLoading } = useCoupon();
  return (
    <div className="mt-6 pb-12 md:pb-24">
      <SectionHeader title="Coupons" desc="Exclusive discounts and special offers for residents to save on living costs."></SectionHeader>

      {couponLoading ? (
        <Loading></Loading>
      ) : (
        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-6">
          {coupons.map((coupon) => (
            <CouponCard key={coupon._id} coupon={coupon}></CouponCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default Coupons;
