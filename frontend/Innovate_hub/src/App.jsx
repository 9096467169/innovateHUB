import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import components
import Navbar from './Components/Navbar';
import Landing from './Components/Landing';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Projects from './Components/Projects';
import Footer from './Components/Footer';

// Import student components
import StudentDashboard from "./Student/pages/StudentDashboard";
import ProjectCreate from "./Student/pages/ProjectCreate";
import Portfolio from "./Student/pages/Portfolio";
import Leaderboard from "./Student/pages/LeaderBoard";
import StudentHome from './Student/StudentHome';
import UploadProject from './Student/pages/UploadProject';

//fetch each project details
import ProjectDetailsPage from "./Student/pages/ProjectDetailsPage";

// Import admin components
import AdminDashboard from './Student/pages/AdminDashboard';
import AdminUsers from './Student/pages/AdminUsers';

// Import ProtectedRoute
import ProtectedRoute from './Components/ProtectedRoute';
import Unauthorized from './Components/Unauthorized'; // <-- Create this page
import EditProjectPage from './Student/pages/EditProject';
import PendingProjects from './Student/pages/PendingProjects';

function App() {

  return (
    <Router>
      <div className="App">
      <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/signup" element={<SignUp />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/projects/:id" element={<ProjectDetailsPage />} />
          <Route path="/portfolio/:id" element={<Portfolio />} />


          {/* Protected Student Routes */}
          <Route
            path="/student/home"
            element={
              <ProtectedRoute roles={["student"]}>
                <StudentHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute roles={["student"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/projects/new"
            element={
              <ProtectedRoute roles={["student"]}>
                <ProjectCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/portfolio"
            element={
              <ProtectedRoute roles={["student"]}>
                <Portfolio />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/uploadProject"
            element={
              <ProtectedRoute roles={["student"]}>
                <UploadProject />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/project/:id"
            element={
              <ProtectedRoute roles={["student"]}>
              <EditProjectPage/>
              </ProtectedRoute>
            }
          />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminDashboard/>
              </ProtectedRoute>
            }
          />
        
           <Route
            path="/admin/users"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
            <Route
            path="/admin/pending-projects"
            element={
              <ProtectedRoute roles={["admin"]}>
               <PendingProjects/>
              </ProtectedRoute>
            }
            />
          {/* <Route
            path="/admin/notifications"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminNotifications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminReports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/sdg-tracking"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminSDGTracking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute roles={["admin"]}>
                <AdminSettings />
              </ProtectedRoute>
            }
          /> */}

          {/* Future Protected Routes for Faculty/Admin can go here */}
        </Routes>
       <Footer />
      </div>
    </Router>
  );
}

export default App;