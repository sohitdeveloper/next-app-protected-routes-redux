"use client";
import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Login from "@/pages/login";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.authenticated
  );

  const excludedHeaderRoutes = ["/login", "/reset-password"];

  return (
    <div>
      {!excludedHeaderRoutes.includes(router.pathname) && isAuthenticated && (
        <Header />
      )}
      {isAuthenticated || router.pathname === "/reset-password" ? (
        children
      ) : (
        <Login />
      )}
      <Footer />
    </div>
  );
};

export default Layout;
