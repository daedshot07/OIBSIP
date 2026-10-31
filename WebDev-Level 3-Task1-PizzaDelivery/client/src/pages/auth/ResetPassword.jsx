import mainLogo from "../../assets/logo.jpg";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import toast from "react-hot-toast";
export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8)
      return toast.error("Password must be at least 8 characters");
    if (password !== confirmPassword)
      return toast.error("Passwords do not match");
    try {
      setLoading(true);
      await authService.resetPassword(token, { password });
      toast.success("Password reset successful. Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-secondary">
          Reset Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-gray-600 mb-1"
              htmlFor="reset-password"
            >
              New Password
            </label>
            <input
              id="reset-password"
              type="password"
              required
              minLength="8"
              className="w-full border p-2 rounded focus:outline-none focus:border-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1" htmlFor="reset-confirm">
              Confirm New Password
            </label>
            <input
              id="reset-confirm"
              type="password"
              required
              minLength="8"
              className="w-full border p-2 rounded focus:outline-none focus:border-primary"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded hover:bg-primary-dark transition disabled:bg-gray-400"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
