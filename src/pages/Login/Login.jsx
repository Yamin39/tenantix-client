import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const [passToggle, setPassToggle] = useState(false);
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // login
    logIn(email, password)
      .then((res) => {
        console.log(res.user);
        toast.success("Login Successful");
        navigate(state || "/");
      })
      .catch((err) => {
        console.error(err);
        if (/invalid-credential/.test(err.message)) {
          toast.error("Email or Password is wrong");
        } else {
          toast.error(err.message);
        }
      });
  };
  return (
    <div className="max-w-[23.125rem] mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-[3rem] sm:text-[3.45rem] lg:text-5xl font-bold mt-4">Login</h1>
        <p className="text-gray-500 mt-4 pb-2">
          Welcome back, <br /> Login to access your account
        </p>
      </div>

      <SocialLogin></SocialLogin>

      <div className="divider before:bg-gray-400 after:bg-gray-400 my-6">OR</div>

      <form onSubmit={handleLogin} className="card-body p-0">
        <div className="form-control">
          <label htmlFor="email" className="label">
            <span className="label-text text-base font-semibold">EMAIL</span>
          </label>
          {/* email */}
          <input name="email" id="email" type="email" placeholder="Enter email" className="input py-7 input-bordered rounded-2xl" required />
        </div>

        <div className="form-control">
          <label htmlFor="pass" className="label">
            <span className="label-text text-base font-semibold">Password</span>
            <div className="flex items-center gap-2 mt-3">
              <input name="checkbox" onChange={() => setPassToggle(!passToggle)} type="checkbox" id="checkbox" className="checkbox checkbox-sm" />
              <label htmlFor="checkbox">Show</label>
            </div>
          </label>
          {/* password */}
          <input
            name="password"
            id="pass"
            type={passToggle ? "text" : "password"}
            placeholder="Enter password"
            className="input input-bordered py-7 rounded-2xl"
            required
          />
        </div>
        <div className="form-control mt-2">
          <button className="btn bg-primary-color text-white hover:bg-primary-color hover:brightness-90 h-auto min-h-0 text-base rounded-xl py-3 xl:px-7 mt-4">
            Login
          </button>

          <p className="text-center mt-4">
            Don&apos;t have an account yet?{" "}
            <Link to="/register" className="text-primary underline">
              Register now
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
