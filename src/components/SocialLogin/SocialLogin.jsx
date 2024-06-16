import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = () => {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();
  const axiosPublic = useAxiosPublic();

  const handleLogin = () => {
    loginWithGoogle()
      .then((res) => {
        const userInfo = {
          name: res.user?.displayName,
          photoURL: res.user?.photoURL,
          email: res.user?.email,
          role: "user",
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            toast.success("Registration successful");
          } else {
            toast.success("Login successful");
          }
        });
        navigate(state || "/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      {/* Google login */}
      <button onClick={handleLogin} className="btn w-full py-3 h-auto min-h-0 text-base rounded-2xl bg-[#d3d3d360]">
        <FcGoogle className="text-xl" />
        Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
