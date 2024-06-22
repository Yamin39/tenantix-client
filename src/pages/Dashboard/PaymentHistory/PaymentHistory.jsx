import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState(null);

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email, search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}/${search}`);
      return res.data;
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const searchText = e.target.search_box.value;
    setSearch(searchText);
  };
  return (
    <div className="p-6 min-h-screen">
      <div className="bg-white rounded-3xl p-3 pb-8">
        <div className="p-6 rounded-3xl bg-[#e9e9e98c]">
          <h3 className="font-semibold text-2xl">Payment History</h3>
          <p className="text-gray-500 mt-1">Find your all payment history here.</p>
        </div>

        <div>
          <div className="flex justify-center items-center gap-4 mt-9 mb-4">
            <form onSubmit={handleSearch}>
              <div className="input items-center input-bordered flex justify-center rounded-full shadow-inner text-black pr-1">
                <input name="search_box" type="text" placeholder="Search (ex: January)" required />
                <div className="p-1">
                  <button className="btn btn-circle btn-sm bg-primary-color hover:bg-primary-color hover:brightness-90 text-white">
                    <FiSearch className="text-lg" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table-xs md:table-md table table-zebra">
            <thead>
              <tr>
                <th>Paid Amount</th>
                <th>Transaction Id</th>
                <th>Room no</th>
                <th>Month</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment?._id}>
                  <td>${payment?.paid_amount}</td>
                  <td style={{ wordBreak: "break-all" }}>{payment?.transactionId}</td>
                  <td>{payment?.room_no}</td>
                  <td>{payment?.paid_month}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
