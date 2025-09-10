import React from 'react';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-3xl mx-4 md:mx-0 overflow-hidden max-h-[90vh] flex flex-col md:flex-row">
        {/* Left: Live Preview */}
        <div className="md:w-1/2 w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center p-2 md:p-4">
          <iframe
            src={project.link}
            title="Live Demo"
            className="w-full h-56 md:h-[350px] rounded-lg border"
            allowFullScreen
          />
        </div>

        {/* Right: Details */}
        <div className="md:w-1/2 w-full p-6 flex flex-col gap-4 overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-3xl text-gray-400 hover:text-primary transition-colors z-10"
            aria-label="Close"
          >
            &times;
          </button>
          <h2 className="text-2xl font-bold text-primary">{project.title}</h2>
          <p className="text-gray-700 dark:text-gray-200">{project.description}</p>
          <div>
            <span className="font-semibold text-gray-800 dark:text-gray-100">Tech Stack:</span>
            <ul className="flex flex-wrap gap-2 mt-1">
              {project.techStack?.map((tech, idx) => (
                <li
                  key={idx}
                  className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white bg-primary px-3 py-1 rounded hover:bg-primary/80 transition"
            >
              Live Demo
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary border border-primary px-3 py-1 rounded hover:bg-primary hover:text-white transition"
              >
                GitHub Repo
              </a>
            )}
            {project.backendDocs && (
              <a
                href={project.backendDocs}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary border border-primary px-3 py-1 rounded hover:bg-primary hover:text-white transition"
              >
                Backend Docs
              </a>
            )}
          </div>
          {project.dbDiagram && (
            <div>
              <span className="font-semibold text-gray-800 dark:text-gray-100">Database Schema:</span>
              <div className="w-full h-40 mt-2 rounded border overflow-hidden">
                <iframe
                  src={project.dbDiagram}
                  title="DB Diagram"
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;