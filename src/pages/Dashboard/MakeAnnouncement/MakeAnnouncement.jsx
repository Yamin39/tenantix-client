import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MakeAnnouncement = () => {
  const axiosSecure = useAxiosSecure();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const announcement_date = new Date();
    const announcementData = {
      title,
      description,
      announcement_date,
    };

    axiosSecure.post("/announcements", announcementData).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Announcement posted successfully.",
          icon: "success",
        });
        form.reset();
      }
    });
  };
  return (
    <div className="p-6 min-h-screen">
      <div className="bg-white rounded-3xl p-3 pb-8">
        <div className="p-6 rounded-3xl bg-[#e9e9e98c]">
          <h3 className="font-semibold text-2xl">Make Announcement</h3>
          <p className="text-gray-500 mt-1">Quickly share important updates and announcements with all residents here</p>
        </div>

        <h3 className="font-semibold text-2xl pt-5 pl-1 sm:pl-3 mt-6 mb-2">Create an announcement</h3>

        <form onSubmit={handleSubmit} className="card-body pl-1 sm:pl-3 pt-0">
          <div className="form-control">
            <label htmlFor="title" className="label">
              <span className="label-text text-base font-semibold">Title</span>
            </label>
            {/* title */}
            <input name="title" id="title" type="text" placeholder="Enter announcement title" className="input py-7 input-bordered rounded-2xl" required />
          </div>

          <div className="form-control">
            <label htmlFor="description" className="label">
              <span className="label-text text-base font-semibold">Description</span>
            </label>
            {/* description */}
            <textarea
              name="description"
              id="description"
              type="text"
              rows={7}
              placeholder="Enter announcement description"
              className="textarea textarea-bordered rounded-2xl"
              required
            />
          </div>

          <button className="btn bg-primary-color text-white hover:bg-primary-color hover:brightness-90 h-auto min-h-0 text-base rounded-xl py-3 xl:px-7 mt-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MakeAnnouncement;
