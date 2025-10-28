import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

// ----------- Pages -----------
import Home from "./pages/Home";
import About from "./pages/About";
import AuthPage from "./pages/AuthPage";
import BookAppointment from "./pages/BookAppointment";
import DoctorList from "./pages/DoctorList";
import Doctors from "./pages/Doctors";
import Profile from "./pages/Profile";
import PatientDashboard from "./pages/PatientDashboard";
import AppointmentsScheduled from "./pages/AppointmentsScheduled";
import MedicinesRecommended from "./pages/MedicinesRecommended";
import PreviousAppointments from "./pages/PreviousAppointments";
import Settings from "./pages/Settings";
import MyAppointments from "./pages/MyAppointments";

// ----------- Doctor Pages -----------
import DoctorSignIn from "./pages/DoctorSignIn";
import DoctorDashboard from "./pages/DoctorDashboard";
import DoctorSchedule from "./pages/DoctorSchedule";
import DoctorRegistration from "./pages/DoctorRegistration";
import DoctorProfile from "./pages/DoctorProfile";

// ----------- Admin Pages -----------
import RoleSelection from "./pages/RoleSelection";
import SignIn from "./pages/SignIn";
import AdminSignIn from "./pages/AdminSignIn";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDoctors from "./pages/AdminDoctors";
import AdminPatients from "./pages/AdminPatients";


import "./App.css";

const AppContent = () => {
  const location = useLocation();

  // Hide navbar on dashboard-like routes
  const hiddenNavbarRoutes = [
    "/DoctorDashboard",
    "/doctor-schedule",
    "/doctor-appointments",
    "/doctor-profile",
    "/AdminDashboard",
  ];

  return (
    <div className="app">
      {!hiddenNavbarRoutes.includes(location.pathname) && <Navbar />}

      <main className="main-content">
        <Routes>
          {/* ---------- Public Routes ---------- */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />

          {/* ---------- Patient Routes ---------- */}
          <Route
            path="/doctors"
            element={
              <PrivateRoute allowedRoles={["patient"]}>
                <Doctors />
              </PrivateRoute>
            }
          />
          <Route
            path="/speciality/:path"
            element={
              <PrivateRoute allowedRoles={["patient"]}>
                <DoctorList />
              </PrivateRoute>
            }
          />
          <Route
            path="/book"
            element={
              <PrivateRoute allowedRoles={["patient"]}>
                <BookAppointment />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-appointments"
            element={
              <PrivateRoute allowedRoles={["patient"]}>
                <MyAppointments />
              </PrivateRoute>
            }
          />
          <Route
            path="/patient-dashboard"
            element={
              <PrivateRoute allowedRoles={["patient"]}>
                <PatientDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/about"
            element={
              <PrivateRoute allowedRoles={["patient"]}>
                <About />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute allowedRoles={["patient"]}>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <PrivateRoute allowedRoles={["patient"]}>
                <AppointmentsScheduled />
              </PrivateRoute>
            }
          />
          <Route
            path="/previous-appointments"
            element={
              <PrivateRoute allowedRoles={["patient"]}>
                <PreviousAppointments />
              </PrivateRoute>
            }
          />
          <Route
            path="/medicines"
            element={
              <PrivateRoute allowedRoles={["patient"]}>
                <MedicinesRecommended />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute allowedRoles={["patient"]}>
                <Settings />
              </PrivateRoute>
            }
          />

          {/* ---------- Doctor Routes ---------- */}
          <Route path="/DoctorSignIn" element={<DoctorSignIn />} />
          <Route path="/DoctorRegistration" element={<DoctorRegistration />} />

          <Route path="/DoctorDashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-schedule" element={<DoctorSchedule />} />
          <Route path="/doctor-appointments" element={<AppointmentsScheduled />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />

          {/* ---------- Admin Routes ---------- */}
          <Route path="/RoleSelection" element={<RoleSelection />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/AdminSignIn" element={<AdminSignIn />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/AdminDoctors" element={<AdminDoctors />} />
<Route path="/AdminPatients" element={<AdminPatients />} />

        </Routes>
      </main>

      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
