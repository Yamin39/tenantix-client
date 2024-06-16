import { useContext } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const SocialLogin = () => {
  const { loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleLogin = () => {
    loginWithGoogle()
      .then(() => {
        toast.success("Login Successful");
        navigate(state || "/");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.message);
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
