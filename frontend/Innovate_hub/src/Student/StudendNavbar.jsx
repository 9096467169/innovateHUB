"use client";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Menu,
  X,
  Home,
  BookOpen,
  Award,
  FileText,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import axios from "axios";

const StudentNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [studentProfile, setStudentProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9000/student/profile",
          {
            withCredentials: true,
          }
        );

        if (response.data) {
          setStudentProfile({
            name: response.data.name || "Student",
            team: response.data.team || "",
            avatar: response.data.ProfileUrl
              ? `http://localhost:9000${response.data.ProfileUrl}`
              : "/placeholder.svg",
          });
        }
      } catch (err) {
        console.error("Error fetching student profile:", err);
        setError("Failed to load profile");
        setStudentProfile({
          name: "Student",
          team: "",
          avatar: "/placeholder.svg",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStudentProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:9000/student/logout", {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#FFF2F2] shadow-[6px_6px_12px_#e6d6d6,-6px_-6px_12px_#ffffff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex-shrink-0 flex items-center">
            <img
              src="/game-development.png"
              alt="Game Development"
              className="h-12 w-auto"
            />
            <Link
              to="/student/dashboard"
              className="text-2xl font-bold text-gray-800 mr-4"
            >
              InnovateHub
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-4 absolute left-1/2 transform -translate-x-1/2">
            {[
              { to: "/student/dashboard", icon: Home, label: "Dashboard" },
              { to: "/projects", icon: BookOpen, label: "Projects" },
              { to: "/student/portfolio", icon: FileText, label: "Portfolio" },
              {
                to: "/leaderboard",
                icon: BarChart3,
                label: "Leaderboard",
              },
             
            ].map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className="text-gray-800 hover:bg-[#A9B5DF] hover:text-white px-3 py-2 rounded-lg transition-all duration-300 ease-in-out shadow-[3px_3px_6px_#e6d6d6,-3px_-3px_6px_#ffffff] hover:shadow-inner flex items-center"
              >
                <Icon className="mr-2" size={20} />
                {label}
              </Link>
            ))}
          </div>

          {/* Profile - Right Side */}
          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
            ) : error ? (
              <div className="text-red-500 text-sm">{error}</div>
            ) : (
              <div className="relative">
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center space-x-3 focus:outline-none"
                >
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-gray-700">
                      {studentProfile?.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {studentProfile?.team}
                    </span>
                  </div>
                  <img
                    src={studentProfile?.avatar}
                    alt="Profile"
                    className="h-12 w-12 rounded-full object-cover border-2 border-[#A9B5DF] shadow-[3px_3px_6px_#e6d6d6,-3px_-3px_6px_#ffffff]"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg";
                    }}
                  />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10">
                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#A9B5DF] hover:text-white"
                    >
                      <LogOut className="mr-2" size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 hover:text-[#A9B5DF] focus:outline-none shadow-[3px_3px_6px_#e6d6d6,-3px_-3px_6px_#ffffff] p-2 rounded-lg"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Links */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#FFF2F2] rounded-lg shadow-[6px_6px_12px_#e6d6d6,-6px_-6px_12px_#ffffff]">
              {[
                { to: "/student/dashboard", icon: Home, label: "Dashboard" },
                { to: "/student/projects", icon: BookOpen, label: "My Projects" },
                { to: "/student/portfolio", icon: FileText, label: "Portfolio" },
                {
                  to: "/student/leaderboard",
                  icon: BarChart3,
                  label: "Leaderboard",
                },
                { to: "/achievements", icon: Award, label: "Achievements" },
                { to: "/profile", icon: User, label: "Profile" },
                { to: "/settings", icon: Settings, label: "Settings" },
              ].map(({ to, icon: Icon, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-gray-800 hover:bg-[#A9B5DF] hover:text-white block px-3 py-2 rounded-lg flex items-center"
                >
                  <Icon className="mr-2" size={20} />
                  {label}
                </Link>
              ))}

              <button
                onClick={handleLogout}
                className="w-full text-left text-gray-800 hover:bg-[#A9B5DF] hover:text-white block px-3 py-2 rounded-lg flex items-center"
              >
                <LogOut className="mr-2" size={20} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default StudentNavbar;