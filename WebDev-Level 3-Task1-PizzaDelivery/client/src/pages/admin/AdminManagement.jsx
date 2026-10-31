import mainLogo from "../../assets/logo.jpg";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { adminService } from "../../services/adminService";

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await adminService.list();
      setAdmins(data?.admins || []);
    } catch {
      setError(
        "Admins data is not available yet. Please check the API connection.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialLoad = setTimeout(load, 0);
    return () => clearTimeout(initialLoad);
  }, [load]);

  return (
    <div className="ops-page">
      <div className="mb-6">
        <Link
          to="/admin/dashboard"
          className="text-[var(--theme-highlight)] hover:text-[var(--theme-accent)] transition-colors font-medium flex items-center gap-2 text-sm uppercase tracking-wider w-fit"
        >
          <span>&larr;</span> Back to Dashboard
        </Link>
      </div>
      <div className="ops-heading">
        <div>
          <div className="ops-eyebrow">Operations / Admins</div>
          <h1>Admin Dashboard.</h1>
          <p>View all administrators on the platform.</p>
        </div>
      </div>

      {error && (
        <div className="error-state" role="alert">
          {error}
          <br />
          <button className="retry-button" onClick={load}>
            Retry
          </button>
        </div>
      )}

      <section className="ops-panel">
        {loading ? (
          <div className="empty-state">Loading admins...</div>
        ) : !admins.length ? (
          <div className="empty-state">No admins found.</div>
        ) : (
          <div className="ops-table-wrap">
            <table className="ops-table">
              <thead>
                <tr>
                  <th>Admin ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.id || admin._id}>
                    <td>
                      <strong>{admin.id || admin._id}</strong>
                    </td>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td>
                      <span
                        style={{
                          backgroundColor: "rgba(214, 90, 58, 0.15)",
                          color: "var(--theme-accent)",
                          border: "1px solid var(--theme-accent)",
                          padding: "0.2rem 0.5rem",
                          borderRadius: "4px",
                          fontSize: "0.75rem",
                        }}
                      >
                        {admin.role || "admin"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
