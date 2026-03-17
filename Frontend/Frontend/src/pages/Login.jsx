import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { loginUser } from "../authSlice";
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

// --- Zod Schema ---
const loginSchema = z.object({
  emailId: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(1, "Password is required")
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur'
  });

  const [showPassword, setShowPassword] = useState(false);
  const [gridMode, setGridMode] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-5xl">
        
        {/* Left Branding Card */}
        <div
          onClick={() => setGridMode(!gridMode)}
          className="hidden lg:flex flex-col justify-center items-center bg-gray-800 rounded-2xl shadow-xl p-8 relative overflow-hidden cursor-pointer transition-all border border-gray-700"
        >
          {/* Background effect */}
          {!gridMode ? (
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,0,0,0.15)_1px,transparent_1px)] bg-[length:20px_20px]" />
          ) : (
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[length:30px_30px] animate-pulse" />
          )}
          
          <div className="relative z-10 text-center">
            <h1 className="text-4xl font-bold text-gray-200 mb-4">&lt;DSA-MENTOR&gt;</h1>

            <p className="text-sm text-gray-400 mt-10">
              <span className="text-orange-400">DSA-MENTOR🔥</span> Crack Interviews. Get Hired. <br />
              Your Journey to Tech Success Starts Here
            </p>
          </div>
        </div>

        {/* Right Login Card with purple border hover */}
        <div className="relative group rounded-2xl transition-all duration-300">
          {/* Animated border */}
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-600 group-hover:animate-pulseBorder pointer-events-none" />

          {/* Actual Card */}
          <div className="relative bg-gray-800 rounded-2xl shadow-xl p-10 flex flex-col justify-center transition border border-gray-700">
            <h2 className="text-3xl font-extrabold text-center text-gray-100 mb-8">
              Welcome Back
            </h2>

            {error && (
              <div className="bg-red-100/20 border-l-4 border-red-500 text-red-400 p-3 text-sm mb-4 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-green-400" size={20} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("emailId")}
                  className="w-full pl-10 pr-3 py-2 bg-transparent border-b border-gray-600 focus:border-green-400 text-gray-100 placeholder-gray-500 outline-none"
                />
                {errors.emailId && (
                  <p className="text-red-400 text-xs mt-1">{errors.emailId.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-green-400" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  className="w-full pl-10 pr-10 py-2 bg-transparent border-b border-gray-600 focus:border-green-400 text-gray-100 placeholder-gray-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2 text-gray-400 hover:text-gray-200"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <a href="#" className="text-sm text-green-400 hover:text-green-500">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white font-medium hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? "Signing In..." : "Login"}
              </button>
            </form>

            {/* Signup */}
            <p className="mt-6 text-center text-sm text-gray-400">
              Don’t have an account?{" "}
              <NavLink to="/signup" className="text-green-400 hover:text-green-500">
                Signup here
              </NavLink>
            </p>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes pulseBorder {
          0% { border-width: 3px; border-color: rgba(147, 51, 234, 0.4); }
          50% { border-width: 3px; border-color: rgba(147, 51, 234, 1); }
          100% { border-width: 3px; border-color: rgba(147, 51, 234, 0.4); }
        }
        .animate-pulseBorder {
          animation: pulseBorder 2s infinite;
        }
      `}</style>
    </div>
  );
}

export default Login;
