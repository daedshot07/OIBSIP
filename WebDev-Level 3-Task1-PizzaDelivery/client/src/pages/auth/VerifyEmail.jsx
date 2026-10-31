import { useEffect, useState } from "react";
import mainLogo from "../../assets/logo.jpg";
import { Link, useParams } from "react-router-dom";
import { authService } from "../../services/authService";
export default function VerifyEmail() {
  const { token } = useParams();
  const [state, setState] = useState({ loading: true, message: "" });
  useEffect(() => {
    const run = async () => {
      try {
        const data = await authService.verifyEmail(token);
        setState({
          loading: false,
          message: data.message || "Email verified. You can now log in.",
        });
      } catch (error) {
        setState({
          loading: false,
          message:
            error.response?.data?.message ||
            "This verification link is invalid or expired.",
        });
      }
    };
    const id = setTimeout(run, 0);
    return () => clearTimeout(id);
  }, [token]);
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-secondary">
          Email verification
        </h2>
        <p className="text-gray-600 mb-6">
          {state.loading ? "Verifying your email…" : state.message}
        </p>
        {!state.loading && (
          <Link
            to="/login"
            className="inline-block bg-primary text-white px-6 py-2 rounded"
          >
            Continue to login
          </Link>
        )}
      </div>
    </div>
  );
}
