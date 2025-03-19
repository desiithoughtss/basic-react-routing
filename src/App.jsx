import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useState } from "react";
import "./App.css";

export default function App() {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

function NavBar() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("authToken");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {!isAuthenticated ? (
          <>
            <Link className="nav-link" to="/signup">
              Signup
            </Link>
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </>
        ) : (
          <>
            <span className="welcome-message">Welcome, {username}!</span>
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
            <Link className="nav-link" to="/profile">
              Profile
            </Link>
            <Link className="nav-link" to="/messages">
              Messages
            </Link>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSignup() {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    alert("Signup successful! Please login.");
    navigate("/login");
  }

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <input
        className="form-input"
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="form-input"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="form-button" onClick={handleSignup}>
        Signup
      </button>
    </div>
  );
}

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (username === storedUsername && password === storedPassword) {
      localStorage.setItem("authToken", "12345689");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <div className="form-container">
      <h2>Login</h2>
      <input
        className="form-input"
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="form-input"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="form-button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("authToken");
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function Dashboard() {
  return (
    <div className="page-container">
      <h2>Dashboard Page</h2>
    </div>
  );
}

function Profile() {
  return (
    <div className="page-container">
      <h2>Profile Page</h2>
    </div>
  );
}

function Messages() {
  return (
    <div className="page-container">
      <h2>Messages Page</h2>
    </div>
  );
}

function NotFound() {
  return (
    <div className="page-container">
      <h2>404: Page Not Found</h2>
      <p>The page you're looking for does not exist.</p>
      <Link className="nav-link" to="/login">
        Return to Login
      </Link>
    </div>
  );
}
