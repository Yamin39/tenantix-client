import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { TiClipboard } from "react-icons/ti";

const CouponCard = ({ coupon }) => {
  const { coupon_code, discount_percentage, coupon_description, availability } = coupon;
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 1100);

      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon_code);
    setIsCopied(true);
  };
  return (
    <div className="relative rounded-3xl shadow-lg flex flex-col justify-center items-center border border-[#bcbcbc9f] pt-20 p-10">
      <div
        className={`absolute top-6 right-6 px-5 text-sm py-2 rounded-2xl ${
          availability ? "bg-green-200 text-green-700 border border-green-700" : "bg-red-200 text-red-700 border border-red-700"
        }`}
      >
        {availability ? "Available" : "Unavailable"}
      </div>

      <div className="text-center">
        <h1 className="text-5xl font-semibold">
          <span className="text-primary-color font-bold">{discount_percentage}%</span> Discount
        </h1>
        <p className="mt-4 max-w-[12.5rem] mx-auto">{coupon_description}</p>
      </div>

      <div className="bg-[#6b59f512] py-2 px-2 pl-6 rounded-full flex justify-between mt-6 max-w-[16.9375rem]">
        <input className="font-semibold bg-transparent text-[#636363] outline-none" defaultValue={coupon_code} type="text" readOnly />
        <div className="tooltip" data-tip={isCopied ? "Copied" : "Copy"}>
          <button className="btn btn-circle text-xl shadow-inner bg-[#6b59f5c0] hover:bg-[#6b59f5c0] hover:brightness-90 text-white" onClick={handleCopy}>
            {isCopied ? <FaCheck /> : <TiClipboard />}
          </button>
        </div>
      </div>
    </div>
  );
};

CouponCard.propTypes = {
  coupon: PropTypes.object,
};

export default CouponCard;
