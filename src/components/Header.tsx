import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
import HTTPService from "@/services/HttpService";
import UrlConstants from "@/utils/constants/UrlConstants";
import { flushLocalstorage, getTokenLocal } from "@/utils/common";
import { useDispatch } from "react-redux";
import { setAuthentication } from "@/redux/authSlice";
import { userLogout } from "@/services/global";

const headerStyles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    color: "white",
    padding: "1rem",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  nav: {
    flex: 1,
    marginLeft: "1rem",
  },
  navList: {
    listStyle: "none",
    display: "flex",
    justifyContent: "space-around",
  },
  navItem: {
    margin: "0 0.5rem",
    color: "white",
    textDecoration: "none",
  },
  loginLogout: {
    backgroundColor: "transparent",
    border: "none",
    color: "white",
    cursor: "pointer",
    fontSize: "16px",
  },
};

const Header: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    let accessToken = getTokenLocal() ? getTokenLocal() : false;
    try {
      const response = await userLogout(accessToken);
      console.log(response);
      if (response.ok) {
        flushLocalstorage();
        router.push("/login");
        dispatch(setAuthentication(false));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header style={headerStyles.header}>
      <div style={headerStyles.logo}>Your Logo</div>
      <nav style={headerStyles.nav}>
        <ul style={headerStyles.navList}>
          <li style={headerStyles.navItem}>
            <Link href="/" style={{ color: "white", textDecoration: "none" }}>
              Home
            </Link>
          </li>
          <li style={headerStyles.navItem}>
            <Link
              href="/dashboard"
              style={{ color: "white", textDecoration: "none" }}
            >
              Dashboard
            </Link>
          </li>
          <li style={headerStyles.navItem}>
            <Link
              href="/contacts"
              style={{ color: "white", textDecoration: "none" }}
            >
              Contacts
            </Link>
          </li>
        </ul>
      </nav>
      <div>
        <button style={headerStyles.loginLogout} onClick={() => handleLogout()}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
