import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NAV = [
  { to: "/programs",         icon: "📚", label: "Programs"         },
  { to: "/extra-resources",  icon: "🌟", label: "Extra Resources"  },
  { to: "/submit-resource",  icon: "📤", label: "Share a Resource" },
  { to: "/change-password",  icon: "🔒", label: "Change Password"  },
];

const ADMIN_NAV = [
  { to: "/admin/programs",    icon: "🗂️",  label: "Manage Programs"   },
  { to: "/admin/modules",     icon: "📦",  label: "Manage Modules"    },
  { to: "/admin/upload",      icon: "⬆️",  label: "Upload Material"   },
  { to: "/admin/submissions", icon: "📬",  label: "Submissions"       },
  { to: "/admin/users",       icon: "👥",  label: "Manage Users"      },
];

export default function Sidebar({ open, onClose }) {
  const { user, isAdmin, logout } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();

  // Close sidebar on route change (mobile)
  useEffect(() => { onClose(); }, [location.pathname]);

  return (
    <>
      {/* Overlay — mobile only, closes sidebar on tap outside */}
      {open && (
        <div onClick={onClose} style={{
          display: "none",
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,.55)",
          zIndex: 99,
        }} className="sidebar-overlay" />
      )}

      <aside className={`sidebar${open ? " sidebar-open" : ""}`}>
        <div  className="sidebar-logo">Teaching<span>Desk</span></div>

        <nav className="sidebar-nav">
          {NAV.map(({ to, icon, label }) => (
            <NavLink key={to} to={to}
              className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
              <span className="nav-icon">{icon}</span> {label}
            </NavLink>
          ))}

          {isAdmin && (
            <>
              <div style={{
                margin: "14px 12px 4px", fontSize: 11, fontWeight: 600,
                color: "var(--text3)", textTransform: "uppercase", letterSpacing: ".06em",
              }}>Admin</div>
              {ADMIN_NAV.map(({ to, icon, label }) => (
                <NavLink key={to} to={to}
                  className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                  <span className="nav-icon">{icon}</span> {label}
                </NavLink>
              ))}
            </>
          )}
        </nav>

        <div className="sidebar-user">
          <strong>{user?.name}</strong>
          <span style={{ display: "block", marginTop: 3 }}>
            {user?.role === "admin"
              ? <span className="badge badge-admin">Admin</span>
              : <span style={{ fontSize: 12, color: "var(--text3)" }}>Instructor</span>}
          </span>
          <button onClick={() => { logout(); navigate("/login"); }}
            className="btn btn-ghost btn-sm"
            style={{ marginTop: 10, width: "100%", justifyContent: "center" }}>
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
