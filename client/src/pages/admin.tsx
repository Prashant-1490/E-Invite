import { useEffect } from "react";
import { useLocation } from "wouter";
import { AdminPanel } from "@/components/AdminPanel";

function checkAdminAuth() {
  const isAuthenticated = localStorage.getItem("admin-authenticated");
  const sessionTime = localStorage.getItem("admin-session");
  
  if (!isAuthenticated || !sessionTime) {
    return false;
  }
  
  // Check if session is older than 24 hours
  const sessionAge = Date.now() - parseInt(sessionTime);
  const maxAge = 24 * 60 * 60 * 1000; // 24 hours
  
  if (sessionAge > maxAge) {
    localStorage.removeItem("admin-authenticated");
    localStorage.removeItem("admin-session");
    return false;
  }
  
  return true;
}

export default function Admin() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!checkAdminAuth()) {
      setLocation("/admin-login");
    }
  }, [setLocation]);

  // If not authenticated, don't render anything (will redirect)
  if (!checkAdminAuth()) {
    return null;
  }

  return <AdminPanel />;
}
