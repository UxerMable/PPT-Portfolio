import React, { useState, useEffect } from 'react';
import { PROJECTS } from './constants';
import { Project } from './types';
import ProjectModal from './components/ProjectModal';
import FadeInSection from './components/FadeInSection';

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300); // Wait for fade out
    document.body.style.overflow = 'auto';
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="bg-[#111827] text-[#f3f4f6] min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <i className="fa-solid fa-layer-group text-indigo-500 text-xl"></i>
              <span className="font-bold text-xl tracking-tight">PPT Designer <span className="text-indigo-400">김예송</span></span>
            </div>
            <div className="hidden md:flex space-x-8 text-sm font-medium">
              <a href="#home" onClick={(e) => handleSmoothScroll(e, 'home')} className="hover:text-indigo-400 transition-colors">Home</a>
              <a href="#portfolio" onClick={(e) => handleSmoothScroll(e, 'portfolio')} className="hover:text-indigo-400 transition-colors">Portfolio</a>
              <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="hover:text-indigo-400 transition-colors">Contact</a>
            </div>
            {/* Mobile Menu Button */}
            <button 
                className="md:hidden text-gray-300 hover:text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <i className="fa-solid fa-bars text-xl"></i>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
             <div className="md:hidden bg-gray-900 border-b border-gray-800">
                 <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                     <a href="#home" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-indigo-400" onClick={(e) => handleSmoothScroll(e, 'home')}>Home</a>
                     <a href="#portfolio" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-indigo-400" onClick={(e) => handleSmoothScroll(e, 'portfolio')}>Portfolio</a>
                     <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-indigo-400" onClick={(e) => handleSmoothScroll(e, 'contact')}>Contact</a>
                 </div>
             </div>
        )}
      </nav>

      {/* 1. Cover / Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden scroll-mt-16">
        {/* Background decorative elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <FadeInSection delay="delay-100">
              <h1 className="text-3xl md:text-5xl font-black leading-[40px] md:leading-[60px] mb-6">
                비즈니스의 <br /> 가치를 높이는 <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">가장 명확한 전략</span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl mb-8 leading-relaxed max-w-lg">
                단순히 예쁜 슬라이드가 아닙니다.<br />
                복잡한 정보를 명료하게 시각화하여<br />
                청중을 설득하는 전략적 파트너가 되겠습니다.
              </p>
              <div className="flex gap-4">
                <a 
                  href="#portfolio" 
                  onClick={(e) => handleSmoothScroll(e, 'portfolio')}
                  className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-indigo-500/30 cursor-pointer"
                >
                  프로젝트 보기
                </a>
              </div>
            </FadeInSection>

            {/* Hero Visual */}
            <FadeInSection delay="delay-300" className="hidden md:block">
              <div className="relative w-full aspect-video bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                    src="https://postfiles.pstatic.net/MjAyNjAyMTBfOCAg/MDAxNzcwNzIzNjA1OTIx.Ys8YN_UwsKVdjnG-_CRxWw_nyEisQAxJ8h85pbcvhMEg.PCm5xpl7vrzD3YUqm0UYCkPL9W9B5WWk_yeASTVlKTog.PNG/image.png?type=w966" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                    alt="Hero Visual" 
                />
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* 3. Selected Works */}
      <section id="portfolio" className="py-24 bg-gray-800 relative scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-indigo-400 font-bold tracking-wider uppercase mb-2">Selected Works</h2>
            <h3 className="text-4xl font-black text-white">Project Showcase</h3>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              단순한 결과물이 아닌, 개선 과정을 보여드립니다. <br />
              카드를 클릭하여 상세 내용과 <strong>Before & After</strong>를 확인하세요.
            </p>
          </FadeInSection>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((project, index) => (
              <FadeInSection key={project.id} delay={`delay-${index * 100}`}>
                <article 
                  className="group relative bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer" 
                  onClick={() => openModal(project)}
                >
                  <div className="aspect-video bg-gray-700 overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                      <span className="text-white border border-white px-4 py-2 rounded-full font-bold">상세보기</span>
                    </div>
                    <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${project.categoryColorClass}`}>
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2">{project.shortDesc}</p>
                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                      <span>기여도 {project.contribution}%</span>
                      <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                      <span>{project.tools}</span>
                    </div>
                  </div>
                </article>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Contact Section */}
      <section id="contact" className="py-24 bg-gray-900 border-t border-gray-800 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <FadeInSection>
            <h2 className="text-3xl md:text-5xl font-black leading-[40px] md:leading-[60px] mb-6">
              비즈니스의 가치를<br className="hidden md:block" /> 감각적인 비주얼로 설계합니다
            </h2>
            <p className="text-gray-400 mb-12 max-w-xl mx-auto leading-[24px]">
              책임감 있는 근태와 빠른 소통을 약속드립니다.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-16">
              <a href="mailto:soyerworks@gmail.com" className="flex items-center gap-3 text-xl font-medium hover:text-indigo-400 transition-colors">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-indigo-500">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                soyerworks@gmail.com
              </a>
              <a href="tel:010-7378-3484" className="flex items-center gap-3 text-xl font-medium hover:text-indigo-400 transition-colors">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-indigo-500">
                  <i className="fa-solid fa-phone"></i>
                </div>
                010-7378-3484
              </a>
            </div>
          </FadeInSection>
        </div>
      </section>

      <footer className="bg-black py-8 text-center text-gray-600 text-sm">
        <p>&copy; 2026 PPT Designer Kim. All rights reserved.</p>
      </footer>

      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
}

export default App;