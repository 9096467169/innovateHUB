import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "../Student/dashboard/ProjectCard";
import StudentNavbar from "../Student/StudendNavbar";

const sdgOptions = [
  'No Poverty', 'Zero Hunger', 'Good Health and Well-being',
  'Quality Education', 'Gender Equality', 'Clean Water and Sanitation',
  'Affordable and Clean Energy', 'Decent Work and Economic Growth',
  'Industry, Innovation and Infrastructure', 'Reduced Inequalities',
  'Sustainable Cities and Communities', 'Responsible Consumption and Production',
  'Climate Action', 'Life Below Water', 'Life on Land',
  'Peace, Justice and Strong Institutions', 'Partnerships for the Goals'
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSDG, setSelectedSDG] = useState("");
  const [mostLiked, setMostLiked] = useState(false);

  useEffect(() => {
    fetchApprovedProjects();
  }, []);

  const fetchApprovedProjects = async () => {
    try {
      const res = await axios.get("http://localhost:9000/projects");
      const allProjects = res.data || [];

      const approvedProjects = allProjects.filter(
        (proj) => proj.status === "Approved"
      );

      const formatted = approvedProjects.map((proj) => ({
        id: proj._id,
        title: proj.title,
        description: proj.readMe || "No description available",
        image: proj.projectImage
          ? `http://localhost:9000/${proj.projectImage.replace(/\\/g, "/")}`
          : "/placeholder.svg",
        github: proj.githubRepoUrl,
        status: proj.status,
        sdgs: proj.sdgMapping || [],
        rating: proj.averageRating || 0,
        comments: proj.comments?.length || 0,
        views: proj.views || 0,
        likes: proj.likes || 0,
      }));

      setProjects(formatted);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const filteredProjects = projects
    .filter((project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((project) =>
      selectedSDG ? project.sdgs.includes(selectedSDG) : true
    );

  const sortedProjects = mostLiked
    ? [...filteredProjects].sort((a, b) => b.likes - a.likes)
    : filteredProjects;

  return (
    <>
      <StudentNavbar />
      <div className="bg-[#FFF2F2] min-h-screen py-12 px-6 pt-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Explore Student Projects
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Discover innovations built by creative minds.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <select
                value={selectedSDG}
                onChange={(e) => setSelectedSDG(e.target.value)}
                className="px-4 py-2 border rounded-lg shadow-sm"
              >
                <option value="">All SDGs</option>
                {sdgOptions.map((sdg) => (
                  <option key={sdg} value={sdg}>
                    {sdg}
                  </option>
                ))}
              </select>

              <label className="flex items-center space-x-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={mostLiked}
                  onChange={() => setMostLiked(!mostLiked)}
                  className="form-checkbox"
                />
                <span>Most Liked</span>
              </label>
            </div>
          </div>

          {sortedProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedProjects.map((project) => (
                <ProjectCard
                  project={project}
                  key={project.id}
                  showEditButton={false}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No approved projects found.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Projects;
