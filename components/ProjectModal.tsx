import React from 'react';
import { Project } from '../types';
import BeforeAfterSlider from './BeforeAfterSlider';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-xl border border-gray-700 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-50 w-10 h-10 bg-gray-800 rounded-full text-white hover:bg-gray-700 flex items-center justify-center transition-colors"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* Left: Content Info */}
          <div className="p-8 lg:p-10 lg:border-r border-gray-700 bg-gray-900 lg:sticky lg:top-0 h-auto lg:h-full">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, index) => (
                <span key={index} className="text-xs font-bold text-gray-300 bg-gray-800 border border-gray-600 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="text-3xl font-bold text-white mb-6 leading-tight">{project.title}</h2>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-indigo-400 font-bold text-sm uppercase mb-1">Project Overview</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-gray-500 font-bold text-xs uppercase mb-1">Role</h4>
                  <p className="text-white text-sm">{project.role}</p>
                </div>
                <div>
                  <h4 className="text-gray-500 font-bold text-xs uppercase mb-1">Tools</h4>
                  <p className="text-white text-sm">{project.tools}</p>
                </div>
              </div>

              <div>
                <h4 className="text-indigo-400 font-bold text-sm uppercase mb-2">Design Solution</h4>
                <ul className="list-disc list-outside ml-4 text-gray-300 text-sm space-y-1">
                  {project.solutions.map((sol, index) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: sol }} />
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right: Visuals (Before/After) */}
          <div className="lg:col-span-2 bg-gray-800 p-8 lg:p-10 flex flex-col items-center">
            
            <h3 className="text-xl font-bold text-white mb-4 w-full flex items-center gap-2">
              <i className="fa-solid fa-wand-magic-sparkles text-yellow-500"></i> Before & After
            </h3>
            
            <div className="w-full mb-6">
               <BeforeAfterSlider beforeImg={project.beforeImg} afterImg={project.afterImg} />
            </div>

            <p className="text-center text-gray-400 text-sm mb-8">
              <i className="fa-solid fa-hand-pointer animate-bounce mr-2"></i>슬라이더를 좌우로 움직여 변화를 확인하세요.
            </p>

            {/* Gallery Grid */}
            <div className="w-full border-t border-gray-700 pt-8">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                    <i className={`fa-regular fa-images ${project.galleryColorClass}`}></i> Gallery
                </h4>
                <div className="grid grid-cols-2 gap-4">
                   {project.galleryImages.map((imgUrl, idx) => (
                      <img 
                        key={idx} 
                        src={imgUrl} 
                        alt={`Gallery ${idx + 1}`} 
                        className="w-full h-full object-cover rounded border border-gray-700" 
                      />
                   ))}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;