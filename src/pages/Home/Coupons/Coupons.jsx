import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import CouponCard from "../CouponCard/CouponCard";

const Coupons = () => {
  return (
    <div className="mt-6 pb-12 md:pb-24">
      <SectionHeader title="Coupons" desc="Exclusive discounts and special offers for residents to save on living costs."></SectionHeader>

      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-6">
        <CouponCard></CouponCard>
        <CouponCard></CouponCard>
        <CouponCard></CouponCard>
      </div>
    </div>
  );
};

export default Coupons;
