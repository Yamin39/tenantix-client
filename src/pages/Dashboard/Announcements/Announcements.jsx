import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Loading from "../../../components/Loading/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Announcements = () => {
  const axiosSecure = useAxiosSecure();

  const { data: announcements = [], isPending: announcementsLoading } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements");
      return res.data;
    },
  });
  return (
    <div className="p-6 min-h-screen">
      <div className="bg-white rounded-3xl p-3">
        <div className="p-6 rounded-3xl bg-[#e9e9e98c]">
          <h3 className="font-semibold text-2xl">Announcements</h3>
          <p className="text-gray-500 mt-1">View all important announcements and updates from the apartment owner here.</p>
        </div>
      </div>

      {announcementsLoading ? (
        <Loading></Loading>
      ) : (
        <div className="bg-white rounded-3xl p-3 mt-6">
          <h3 className="font-semibold text-2xl pl-3 mt-4 mb-4">
            All announcements:
            <span className="rounded-full ml-3 text-base px-3 border border-violet-700 bg-violet-200 text-violet-700">{announcements.length}</span>
          </h3>

          <div className="space-y-3">
            {announcements.map((announcement) => (
              <div key={announcement._id} className="p-6 rounded-3xl bg-[#e9e9e98c]">
                <h3 className="font-semibold text-2xl">{announcement.title}</h3>
                <p className="text-gray-400">{moment(announcement.announcement_date).format("dddd, MMM DD, LT")}</p>
                <br />
                <p className="text-gray-700">{announcement.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;
