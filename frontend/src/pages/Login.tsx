import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  role: "admin" | "user";
};

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  // ✅ Auto redirect if already logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser: User = JSON.parse(user);
      if (parsedUser.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ✅ Admin login (UNCHANGED)
    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("user", JSON.stringify({ role: "admin" }));
      navigate("/admin-dashboard");
      return;
    }

    // ✅ Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const foundUser = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (foundUser) {
      localStorage.setItem("user", JSON.stringify({ role: "user" }));
      navigate("/");
    } else {
      alert("Invalid Email or Password OR User not registered");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Welcome Back 💖</h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        {/* ✅ Register Link (your code added) */}
        <p
          onClick={() => navigate("/register")}
          style={{ marginTop: "10px", cursor: "pointer", color: "blue" }}
        >
          New user? Register here
        </p>

      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #fbc2eb, #a6c1ee)",
  },
  box: {
    background: "#fff",
    padding: "40px",
    borderRadius: "15px",
    width: "320px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    color: "#e91e63",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#e91e63",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};