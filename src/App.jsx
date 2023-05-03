import React,{useEffect} from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import SignIn from "./views/auth/SignIn";
import ProtectedRoute from "util/protectedRoute";
import ErrorBoundary from "./errorboundary";

const App = () => {
  const navigate = useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem('token')){
      navigate('/auth/login')
    }
  },[])
 
  return (
      // <Routes>
      //   {/* <Route path="auth/login" element={<SignIn/>} />
      //   
      //   <Route path="auth/*" element={<AuthLayout />} />
      //   <Route path="rtl/*" element={<RtlLayout />} />

      //   <ProtectedRoute>
      //     <Route path="admin/*" element={<AdminLayout />} />
      //   </ProtectedRoute>  
      // </Routes>
      <ErrorBoundary>
        <Routes>
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
          <Route path="auth/*" element={<AuthLayout />} />
          <Route path="rtl/*" element={<RtlLayout />} />
         
              <Route path="admin/*" element={<AdminLayout />} />
        </Routes>
      </ErrorBoundary>
  );
};

export default App;
