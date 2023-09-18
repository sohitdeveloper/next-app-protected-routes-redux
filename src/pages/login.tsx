import { setAuthentication } from "@/redux/authSlice";
import { RootState } from "@/redux/store";
import { userLogin } from "@/services/global";
import { setRoleLocal, setTokenLocal, setUser } from "@/utils/common";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.authenticated
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      let body = {
        email: username,
        password: password,
      };
      const response = await userLogin(body);
      console.log("handleLogin", response);
      if (response.ok) {
        setTokenLocal(response?.data?.token);
        setUser(response?.data?.user);
        setRoleLocal(response?.data?.user?.role);
        router.push("/dashboard");
        dispatch(setAuthentication(true));
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard"); // Redirect to the dashboard if authenticated
    }
  }, [isAuthenticated, router]);
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Login</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "183px",
            height: "44px",
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "183px",
            height: "44px",
            marginTop: "20px",
          }}
        />
        <button
          onClick={handleLogin}
          style={{
            width: "183px",
            height: "44px",
            marginTop: "20px",
          }}
        >
          Login
        </button>
        <button onClick={() => router.push("/reset-password")}>
          <a>Forgot Password?</a>
        </button>
      </div>
    </div>
  );
};

export default Login;
