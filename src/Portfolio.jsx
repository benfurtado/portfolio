import { useState, useEffect } from 'react';
import './Portfolio.css';


export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Modal state for project videos
  const [modalVideo, setModalVideo] = useState(null);
  const [isPortraitVideo, setIsPortraitVideo] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.section');
      let current = '';

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
          current = section.getAttribute('id');
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3D Bento Scroll Animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all sections and animated elements
    const sections = document.querySelectorAll('.section');
    const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .scale-in');
    
    [...sections, ...animatedElements].forEach((el) => {
      observer.observe(el);
    });

    return () => {
      [...sections, ...animatedElements].forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && modalVideo) {
        closeVideoModal();
      }
    };

    if (modalVideo) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [modalVideo]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  // Modal open/close handlers
  const openVideoModal = (videoSrc) => {
    // Ensure assets work on GitHub Pages and any subpath deployments
    const isAbsolute = /^https?:\/\//i.test(videoSrc);
    const normalized = isAbsolute
      ? videoSrc
      : `${process.env.PUBLIC_URL}${videoSrc.startsWith('/') ? '' : '/'}${videoSrc}`;
    setModalVideo(normalized);
    setIsPortraitVideo(false); // Reset orientation
  };
  
  const closeVideoModal = () => {
    setModalVideo(null);
    setIsPortraitVideo(false);
  };

  // Handle video load to detect orientation
  const handleVideoLoad = (event) => {
    const video = event.target;
    const aspectRatio = video.videoWidth / video.videoHeight;
    setIsPortraitVideo(aspectRatio < 1); // Portrait if width < height
  };

  return (
    <div className="portfolio-container">
      <nav className="navbar" role="navigation" aria-label="Main Navigation">
        <div className="nav-content">
          <div className="logo" onClick={() => scrollToSection('profile')} tabIndex={0} aria-label="Go to Profile" style={{outline: 'none'}}>BF</div>
          <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} tabIndex={0} aria-label="Toggle menu" style={{outline: 'none'}}>
            <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            {[
              { id: 'profile', label: 'Profile' },
              { id: 'skills', label: 'Skills' },
              { id: 'works', label: 'Works' },
              { id: 'experience', label: 'Experience' },
              { id: 'education', label: 'Education' },
              { id: 'achievements', label: 'Achievements' },
              { id: 'contact', label: 'Contact' }
            ].map(link => (
              <li key={link.id} className={activeSection === link.id ? 'active' : ''}>
                <a
                  onClick={() => scrollToSection(link.id)}
                  tabIndex={0}
                  aria-label={`Go to ${link.label}`}
                  style={{outline: 'none'}}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Header/Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <div className="hero-grid">
            <div className="hero-left">
              <div className="hero-kicker"><span className="kicker-dot" aria-hidden>◎</span> Ben Furtado</div>
              <h1 className="hero-heading">Full‑Stack Developer</h1>
              <p className="hero-subhead">AI & Automation enthusiast crafting scalable apps across web and mobile. Focused on clean UX, performance, and shipping real products.</p>

              {/* Hero Cards - reference style */}
              <div className="hero-cards-wrapper">
                <div className="hero-card">
                <h3 className="hero-card-title">Bringing Ideas to Life</h3>
<p className="hero-card-subtitle">Designing & Building Digital Experiences</p>

                </div>
                <div className="hero-card">
                  <h3 className="hero-card-title">3+ Years</h3>
                  <p className="hero-card-subtitle">Experience</p>
                </div>
              </div>

              <div className="hero-actions">
                <button className="link-button" onClick={() => scrollToSection('works')}>View Projects</button>
                <button className="link-button" onClick={() => scrollToSection('contact')}>Contact Me</button>
              </div>
            </div>
            <div className="hero-right">
              <div className="hero-astronaut" aria-hidden></div>
          </div>
          </div>
        </div>
      </header>

      {/* Brands section removed per request */}

      {/* About */}
      <section className="section" id="profile">
        <div className="section-container">
          <h2 className="section-title">Profile Summary</h2>
          <div className="divider"></div>
          <p className="profile-text">
            Full-Stack Developer with expertise in UI/UX design, machine learning, and mobile app development. Experienced in building real-world solutions in Flutter, React, and Django, integrating AI-powered features and automation workflows. Skilled in web and mobile apps, embedded systems, and computer vision.
          </p>
        </div>
      </section>

      {/* Skills */}
      <section className="section" id="skills">
        <div className="section-container">
          <h2 className="section-title">Technical Skills</h2>
          <div className="divider"></div>
          
          <div className="skills-container">
            {/* Languages */}
            <div className="skill-group fade-in-up">
              <div className="skill-group-header">
                <div className="skill-icon">
                  <i className="fa fa-code"></i>
                </div>
              <h3>Languages</h3>
              </div>
              <div className="skill-tags">
                <span className="skill-tag">Rust</span>
                <span className="skill-tag">C++</span>
                <span className="skill-tag">C</span>
                <span className="skill-tag">Java</span>
                <span className="skill-tag">Python</span>
                <span className="skill-tag">JavaScript</span>
                <span className="skill-tag">HTML5</span>
                <span className="skill-tag">CSS3</span>
                <span className="skill-tag">Dart</span>
              </div>
            </div>

            {/* Frameworks */}
            <div className="skill-group fade-in-up">
              <div className="skill-group-header">
                <div className="skill-icon">
                  <i className="fa fa-layer-group"></i>
            </div>
              <h3>Frameworks & Libraries</h3>
              </div>
              <div className="skill-tags">
                <span className="skill-tag">Next.js</span>
                <span className="skill-tag">Flutter</span>
                <span className="skill-tag">React.js</span>
                <span className="skill-tag">Django</span>
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">Express</span>
                <span className="skill-tag">TensorFlow.js</span>
                <span className="skill-tag">OpenCV</span>
                <span className="skill-tag">NumPy</span>
                <span className="skill-tag">Pandas</span>
                <span className="skill-tag">scikit-learn</span>
                <span className="skill-tag">Tailwind CSS</span>
              </div>
            </div>

            {/* Tools & Platforms */}
            <div className="skill-group fade-in-up">
              <div className="skill-group-header">
                <div className="skill-icon">
                  <i className="fa fa-tools"></i>
            </div>
              <h3>Tools & Platforms</h3>
              </div>
              <div className="skill-tags">
                <span className="skill-tag">MySQL</span>
                <span className="skill-tag">MongoDB</span>
                <span className="skill-tag">Git</span>
                <span className="skill-tag">GitHub</span>
                <span className="skill-tag">Blender</span>
                <span className="skill-tag">Figma</span>
                <span className="skill-tag">Adobe Photoshop</span>
                <span className="skill-tag">Adobe Illustrator</span>
                <span className="skill-tag">Adobe XD</span>
                <span className="skill-tag">GIMP</span>
                <span className="skill-tag">Raspberry Pi</span>
                <span className="skill-tag">ESP32</span>
                <span className="skill-tag">Arduino</span>
                <span className="skill-tag">Linux</span>
              </div>
            </div>

            {/* Design & Other Skills */}
            <div className="skill-group fade-in-up">
              <div className="skill-group-header">
                <div className="skill-icon">
                  <i className="fa fa-palette"></i>
                </div>
                <h3>Design & Specializations</h3>
              </div>
              <div className="skill-tags">
                <span className="skill-tag">UI/UX Design</span>
                <span className="skill-tag">Graphic Design</span>
                <span className="skill-tag">Hardware Integration</span>
                <span className="skill-tag">Machine Learning</span>
                <span className="skill-tag">Computer Vision</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Works/Portfolio - 3D Bento Style */}
      <section className="section" id="works">
        <div className="section-container">
          <h2 className="section-title">Featured Works</h2>
          <div className="divider"></div>
          
          <div className="works-grid">
            <div className="works-card fade-in-up">
              <div className="works-image-wrapper">
                <div className="works-image-placeholder">
                  <i className="fa fa-mobile-alt"></i>
                </div>
                <div className="works-cut-out"></div>
              </div>
              <div className="works-details">
                <div className="works-badge">
                  <span>Mobile App</span>
                </div>
                <h3 className="works-title">Basch Tournament App</h3>
                <p className="works-description">Flutter & Django based tournament management system</p>
                <button className="works-button" onClick={() => openVideoModal("/media/Tournament.mp4")}>
                  <span>View Demo</span>
                  <i className="fa fa-arrow-right"></i>
                </button>
              </div>
            </div>

            <div className="works-card fade-in-up">
              <div className="works-image-wrapper">
                <div className="works-image-placeholder">
                  <i className="fa fa-eye"></i>
                </div>
                <div className="works-cut-out"></div>
              </div>
              <div className="works-details">
                <div className="works-badge">
                  <span>Computer Vision</span>
                </div>
                <h3 className="works-title">GateGuard System</h3>
                <p className="works-description">Facial recognition & barcode entry-exit system</p>
                <button className="works-button" onClick={() => openVideoModal("/media/GateGuard.mp4")}>
                  <span>View Demo</span>
                  <i className="fa fa-arrow-right"></i>
                </button>
              </div>
            </div>

            <div className="works-card fade-in-up">
              <div className="works-image-wrapper">
                <div className="works-image-placeholder">
                  <i className="fa fa-leaf"></i>
                </div>
                <div className="works-cut-out"></div>
              </div>
              <div className="works-details">
                <div className="works-badge">
                  <span>AI/ML</span>
                </div>
                <h3 className="works-title">AyurAstra Plant Recognition</h3>
                <p className="works-description">Plant recognition system with 3D model generation</p>
                <button className="works-button" onClick={() => openVideoModal("/media/AyurAstra.mp4")}>
                  <span>View Demo</span>
                  <i className="fa fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics section removed per request */}

      {/* CTA removed per request */}

      {/* Experience */}
      <section className="section" id="experience">
        <div className="section-container">
          <h2 className="section-title">Work Experience</h2>
          <div className="divider"></div>
          <div className="timeline">

            {/* DBIT Website Lead */}
            <div className="timeline-item">
              <div className="timeline-badge">
                <span></span>
              </div>
              <div className="timeline-content">
                <h3 className="job-title">Internship - Website Lead | DBIT Website</h3>
                <p className="job-date">Don Bosco Institute of Technology, Mumbai | July 2024 - July 2025</p>
                <ul className="job-duties">
                  <li>Refined UI/UX design for an improved website experience as the Web Dev Head of CSI DBIT.</li>
                  <li>Optimized code structure for better performance and scalability.</li>
                  <li>Led website management and enhancement initiatives.</li>
                </ul>
                <div className="project-links">
                  <a href="https://dbit.in/" target="_blank" rel="noreferrer" className="link-button">
                    Visit DBIT Website
                  </a>
                </div>
              </div>
            </div>

            {/* CS Tennis Academy Web */}
            <div className="timeline-item">
              <div className="timeline-badge">
                <span></span>
              </div>
              <div className="timeline-content">
                <h3 className="job-title">Full-Stack Web Developer | CS Tennis Academy</h3>
                <p className="job-date">CS Tennis Academy, Mumbai | March 2024</p>
                <ul className="job-duties">
                  <li>Developed and maintained the CS Tennis Academy website using HTML, CSS, and JavaScript.</li>
                  <li>Currently developing a Flutter and Django-based tournament application, set to be launched as a business product.</li>
                </ul>
                <div className="project-links">
                  <a href="https://cstennisacademy.co.in/" target="_blank" rel="noreferrer" className="link-button">
                    Visit CS Tennis Academy
                  </a>
                </div>
              </div>
            </div>

            {/* Basch Tournament App */}
            <div className="timeline-item">
              <div className="timeline-badge">
                <span></span>
              </div>
              <div className="timeline-content">
                <h3 className="job-title">Full-Stack App Developer | CS Tennis Academy</h3>
                <p className="job-date">Basch Tournament App | March 2025 – Present</p>
                <ul className="job-duties">
                  <li>Created and maintained Basch app, where players and organizations can hold multi-sport tournaments and manage registrations and scoring through the app.</li>
                  <li>Flutter and Django-based application, developed with a core Dev team.</li>
                  <li>Releasing on Play Store and App Store soon.</li>
                </ul>
                <button className="link-button" onClick={() => openVideoModal("/media/Tournament.mp4")}>
                  Watch Basch App Demo
                </button>
              </div>
            </div>

            {/* CS Tennis Tournament App */}
            <div className="timeline-item">
              <div className="timeline-badge">
                <span></span>
              </div>
              <div className="timeline-content">
                <h3 className="job-title">Internship - Website Lead | DBIT Website</h3>
                <p className="job-date">Don Bosco Institute of Technology, Mumbai | July 2024 - July 2025</p>
                <ul className="job-duties">
                  <li>Refined UI/UX design for an improved website experience as the Web Dev Head of CSI DBIT.</li>
                  <li>Optimized code structure for better performance and scalability.</li>
                  <li>Led website management and enhancement initiatives.</li>
                </ul>
                <div className="project-links">
                  <a href="https://dbit.in/" target="_blank" rel="noreferrer" className="link-button">
                    Visit DBIT Website
                  </a>
                </div>
              </div>
            </div>
          


            {/* NBA Form Automation */}
            <div className="timeline-item">
              <div className="timeline-badge">
                <span></span>
              </div>
              <div className="timeline-content">
                <h3 className="job-title">Codeverse Hackathon | 3rd Place Winner</h3>
                <p className="job-date">November 2024 - December 2024</p>
                <ul className="job-duties">
                  <li>Developed a plant recognition system featuring mapped navigation to sellers and live seller information display.</li>
                  <li>Built an automated 3D plant model generator using Blender.</li>
                  <li>Secured 3rd place in the DBIT "Codeverse" Hackathon.</li>
                </ul>
                <button className="link-button" onClick={() => openVideoModal("/media/AyurAstra.mp4")}>
                  Watch AyurAstra Demo
                </button>
                <div className="project-links">
                  <a href="https://github.com/benfurtado/Codeverse_hackathon" target="_blank" rel="noreferrer" className="link-button">
                    <i className="fa-brands fa-github"></i> GitHub Repo
                  </a>
                </div>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-badge">
                <span></span>
              </div>
              <div className="timeline-content">
                <h3 className="job-title">Facial Recognition & Barcode Entry-Exit System (GateGuard)</h3>
                <p className="job-date">College Project | July 2023 – Present</p>
                <ul className="job-duties">
                  <li>Developed "GateGuard" for access monitoring in the college library and incubation center using Django, HTML, CSS, and Raspberry Pi.</li>
                  <li>Integrated computer vision with OpenCV to track and analyze security data.</li>
                  <li>Created a fully functioning product to solve a real-world access control problem.</li>
                </ul>
                <button className="link-button" onClick={() => openVideoModal("/media/GateGuard.mp4")}>
                  Watch GateGuard Demo
                </button>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-badge">
                <span></span>
              </div>
              <div className="timeline-content">
                <h3 className="job-title">XRGO Securities — Cybersecurity Web Platform</h3>
                <p className="job-date">Product in development | 2025</p>
                <ul className="job-duties">
                  <li>Building an enterprise‑grade website for a cybersecurity startup with clear pricing, services, and blog content.</li>
                  <li>Focused on performance, accessibility, and scalable content architecture with reusable components.</li>
                  <li>Sections include plans matrix, zero‑trust approach, security pillars, compliance mappings, FAQs, and articles.</li>
                </ul>
                <div className="project-links">
                  <a href="https://xrgosecurities.com/" target="_blank" rel="noreferrer" className="link-button">
                    Visit XRGO Securities
                  </a>
                </div>
              </div>
            </div>

            {/* GateGuard */}

            {/* Web Scraping & KPI Automation */}

            {/* CSI Web Dev Head */}

            {/* DBIT Website */}

          </div>
        </div>
      </section>

      {/* Education */}
      <section className="section" id="education">
        <div className="section-container">
          <h2 className="section-title">Education</h2>
          <div className="divider"></div>
          <div className="education-card">
            <div className="education-icon">
              <i className="fa fa-graduation-cap"></i>
            </div>
            <div className="education-details">
              <h3>Don Bosco Institute of Technology, Mumbai</h3>
              <p>B.E. Information Technology</p>
              <p className="education-date">Expected Graduation: July 2026 (Currently 4th year)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section" id="achievements">
        <div className="section-container">
          <h2 className="section-title">Certificates & Achievements</h2>
          <div className="divider"></div>

          <div className="achievements-pro">
            <div className="certs-col">
              <h3 className="subsection-title">Certificates</h3>
              <ul className="cert-list">
                <li className="cert-row">
                  <div className="cert-icon">📜</div>
                  <div className="cert-main">
                    <h4 className="cert-title">Machine Learning</h4>
                    <div className="cert-meta"><span>Coursera</span><span>2024</span></div>
                    <p className="cert-desc">Supervised/unsupervised learning, model evaluation and pipelines.</p>
                  </div>
                  <div className="cert-actions">
                    <a className="chip" href="https://www.coursera.org/account/accomplishments/verify/OK17RBMA1D1Q" target="_blank" rel="noreferrer">Verify</a>
                  </div>
                </li>
                <li className="cert-row">
                  <div className="cert-icon">🤖</div>
                  <div className="cert-main">
                    <h4 className="cert-title">Agentic AI & LLM Apps</h4>
                    <div className="cert-meta"><span>Python / GenAI</span><span>2025</span></div>
                    <p className="cert-desc">Agent frameworks, tool use, orchestration, production readiness.</p>
                  </div>
                  <div className="cert-actions">
                    <a className="chip" href="https://www.coursera.org/account/accomplishments/verify/LXM60J4Q4CNC" target="_blank" rel="noreferrer">Verify</a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="awards-col">
              <h3 className="subsection-title">Awards</h3>
              <div className="awards-timeline">
                <div className="awards-line" aria-hidden></div>
                <div className="awards-item">
                  <div className="awards-dot"></div>
                  <div className="awards-content">
                    <h4 className="award-title">3rd Place — DBIT Hackathon (Codeverse)</h4>
                    <p className="award-desc">Plant recognition with seller mapping and procedural 3D models generator.</p>
                    <span className="award-date">Nov–Dec 2024</span>
                  </div>
                </div>
                <div className="awards-item">
                  <div className="awards-dot"></div>
                  <div className="awards-content">
                    <h4 className="award-title">3rd Place — CRM for Gym (InoQuest)</h4>
                    <p className="award-desc">CRM concept & prototype for gym member lifecycle management.</p>
                    <span className="award-date">2024</span>
            </div>
            </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section" id="contact">
        <div className="section-container">
          <h2 className="section-title">Contact</h2>
          <div className="divider"></div>
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fa fa-envelope"></i>
              </div>
              <div className="contact-info">
                <h3>Email</h3>
                <a href="mailto:raynfurtado@gmail.com">raynfurtado@gmail.com</a>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fa fa-phone"></i>
              </div>
              <div className="contact-info">
                <h3>Phone</h3>
                <p>+91 9822688110</p>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fa-brands fa-linkedin"></i>
              </div>
              <div className="contact-info">
                <h3>LinkedIn</h3>
                <a href="https://linkedin.com/in/ben-furtado-26ab4b201" target="_blank" rel="noreferrer">ben-furtado-26ab4b201</a>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon">
                <i className="fa-brands fa-github"></i>
              </div>
              <div className="contact-info">
                <h3>GitHub</h3>
                <a href="https://github.com/benfurtado" target="_blank" rel="noreferrer">github.com/benfurtado</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <p>
            &copy; {new Date().getFullYear()} Ben Furtado. All rights reserved.
            <span style={{ marginLeft: 8, fontSize: '0.95em', color: '#dadce0' }}>| Portfolio UI v2</span>
          </p>
        </div>
      </footer>

      {/* Video Modal */}
      {modalVideo && (
        <div className="video-modal-overlay" onClick={closeVideoModal}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-modal-close" onClick={closeVideoModal} aria-label="Close video">
              <i className="fa fa-times"></i>
            </button>
            
            <div className={`video-container ${isPortraitVideo ? 'portrait' : ''}`}>
              <video 
                key={modalVideo}
                className={`video-modal-player ${isPortraitVideo ? 'portrait' : ''}`}
                controls 
                autoPlay 
                src={modalVideo}
                onEnded={closeVideoModal}
                onLoadedMetadata={handleVideoLoad}
              >
                Your browser does not support the video tag.
              </video>
              
              <div className="video-controls-overlay">
                <div className="video-title">
                  {modalVideo.split('/').pop().replace('.mp4', '')}
                </div>
                <div className="video-hint">
                  Press <kbd>Esc</kbd> to close
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}