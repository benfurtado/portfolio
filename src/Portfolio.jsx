import { useState, useEffect } from 'react';
import './Portfolio.css';


export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <div className="portfolio-container">
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo" onClick={() => scrollToSection('profile')}>BF</div>
          <div className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li className={activeSection === 'profile' ? 'active' : ''}>
              <a onClick={() => scrollToSection('profile')}>Profile</a>
            </li>
            <li className={activeSection === 'skills' ? 'active' : ''}>
              <a onClick={() => scrollToSection('skills')}>Skills</a>
            </li>
            <li className={activeSection === 'experience' ? 'active' : ''}>
              <a onClick={() => scrollToSection('experience')}>Experience</a>
            </li>
            <li className={activeSection === 'education' ? 'active' : ''}>
              <a onClick={() => scrollToSection('education')}>Education</a>
            </li>
            <li className={activeSection === 'achievements' ? 'active' : ''}>
              <a onClick={() => scrollToSection('achievements')}>Achievements</a>
            </li>
            <li className={activeSection === 'contact' ? 'active' : ''}>
              <a onClick={() => scrollToSection('contact')}>Contact</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Header/Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1 className="name">Ben Furtado</h1>
          <div className="title-container">
            <p className="profession">Full-Stack Developer</p>
            <p className="specialty">AI & Automation Enthusiast</p>
          </div>
          <div className="social-links">
            <a href="https://linkedin.com/in/benfurtado" target="_blank" rel="noreferrer" className="social-button">
              <i className="fa fa-linkedin"></i> LinkedIn
            </a>
            <a href="https://github.com/benfurtado" target="_blank" rel="noreferrer" className="social-button">
              <i className="fa-brands fa-github"></i> GitHub
            </a>
            <a href="mailto:raynfurtado@gmail.com" className="social-button">
              <i className="fa fa-envelope"></i> Email
            </a>
          </div>
        </div>
      </header>

      {/* About */}
      <section className="section" id="profile">
        <div className="section-container">
          <h2 className="section-title">Profile Summary</h2>
          <div className="divider"></div>
          <p className="profile-text">
            I am a Full-Stack Developer with expertise in UI/UX design, machine learning, and mobile app development.
            I have built real-world solutions in Flutter, React, and Django, integrating AI-powered features and automation workflows. 
            My work spans web and mobile apps, embedded systems, and computer vision.
          </p>
        </div>
      </section>

      {/* Skills */}
      <section className="section" id="skills">
        <div className="section-container">
          <h2 className="section-title">Technical Skills</h2>
          <div className="divider"></div>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Frontend & UI/UX</h3>
              <ul className="skill-list">
                <li>Flutter</li>
                <li>React Native</li>
                <li>React.js</li>
                <li>HTML5 / CSS3</li>
                <li>JavaScript</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Backend</h3>
              <ul className="skill-list">
                <li>Django : Python, MySQL</li>
                <li>Node.js</li>
                <li>Express.js</li>
                <li>REST APIs</li>
                <li>Java</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>ML & AI</h3>
              <ul className="skill-list">
                <li>Supervised Machine Learning - <a href='https://www.coursera.org/account/accomplishments/verify/OK17RBMA1D1Q' target='_blank'>Coursera</a></li>
                <li>NumPy / Pandas</li>
                <li>scikit-learn</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Embedded & Tools</h3>
              <ul className="skill-list">
                <li>ESP32 / Raspberry Pi</li>
                <li>Git / GitHub</li>
                <li>Blender / Linux</li>
                <li>AWS</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="section" id="experience">
        <div className="section-container">
          <h2 className="section-title">Experience</h2>
          <div className="divider"></div>
          <div className="timeline">

            {/* CS Tennis Tournament App */}
            <div className="timeline-item">
              <div className="timeline-badge">
                <span></span>
              </div>
              <div className="timeline-content">
                <h3 className="job-title">CS Tennis Website & Tournament App</h3>
                <p className="job-date">CS Tennis Academy - Mumbai, India | March 2025 – Present</p>
                <ul className="job-duties">
                  <li>Developed and maintained the CS Tennis website using HTML, CSS, and JavaScript.</li>
                  <li>Currently developing a Flutter + Django-based tournament app for CS Tennis Academy.</li>
                  <li>Receiving a stipend for app development, which will soon be launched as a business product.</li>
                </ul>
                <div className="project-media">
                <div className="media-card">
                    <video controls style={{ width: '450px', height: '300px' }}>
                    <source src="/media/Tournament.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                    </video>
                </div>
                <div className="media-card">
                    <img 
                    src="media/image.png" 
                    alt="Tournament App Preview" 
                    style={{ width: 'auto', height: '300px' }} 
                    />
                </div>
                </div>

                <div className="project-links">
                  <a href="https://cstennisacademy.co.in/" target="_blank" rel="noreferrer" className="link-button">
                    <i className="fa fa-globe"></i> Live Website
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
                <h3 className="job-title">AyurAstra For Codeverse Hackathon</h3>
                <p className="job-date">Codeverse Hackathon - Mumbai, India | May 2023</p>
                <p className="job-date">Won 3rd place in the Hackathon</p>
                <ul className="job-duties">
                  <li>Automated plant 3D model generation and plant identification </li>
                  <li>Developed using React js and blender suitable for a virtual herbal garden</li>
                </ul>
                <div className="project-media">
                  <div className="media-card full-width">
                    <video controls>
                      <source src="/media/AyurAstra.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
                <div className="project-links">
                  <a href="https://github.com/benfurtado/Codeverse_hackathon" target="_blank" rel="noreferrer" className="link-button">
                    <i className="fa-brands fa-github"></i> GitHub Repo
                  </a>
                </div>
              </div>
            </div>

            {/* GateGuard */}
            <div className="timeline-item">
              <div className="timeline-badge">
                <span></span>
              </div>
              <div className="timeline-content">
                <h3 className="job-title">GateGuard – Automated Entry-Exit System</h3>
                <p className="job-date">College Library & Incubation Center - Mumbai, India | July 2023 – Present</p>
                <ul className="job-duties">
                  <li>Developed GateGuard Facial Recognition System using Django, HTML, CSS, and Raspberry Pi for access monitoring.</li>
                  <li>Integrated computer vision using OpenCV to track and analyze security data.</li>
                </ul>
                <div className="project-media">
                  <div className="media-card full-width">
                    <video controls>
                      <source src="/media/GateGuard.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </div>

            {/* Web Scraping & KPI Automation */}
            <div className="timeline-item">
              <div className="timeline-badge">
                <span></span>
              </div>
              <div className="timeline-content">
                <h3 className="job-title">Web Scraping & KPI Automation</h3>
                <p className="job-date">Company Assignment - Mumbai, India | Nov 2024 – Dec 2024</p>
                <ul className="job-duties">
                  <li>Automated Amazon web scraping using Python.</li>
                  <li>Implemented KPI calculations using Python & Shell scripting.</li>
                </ul>
                <div className="project-links">
                  <a href="https://github.com/benfurtado/Web-Scrapping-and-KPI-calculation" target="_blank" rel="noreferrer" className="link-button">
                    <i className="fa-brands fa-github"></i> GitHub Repo
                  </a>
                </div>
              </div>
            </div>

            {/* CSI Web Dev Head */}
            <div className="timeline-item">
              <div className="timeline-badge">
                <span></span>
              </div>
              <div className="timeline-content">
                <h3 className="job-title">CSI Web Dev Head</h3>
                <ul className="job-duties">
                <li>Refined the UI/UX to elevate user interaction and ensure a seamless experience across all devices.</li>
                <li>Improved the codebase for improved performance and scalability, preparing it for long-term growth.</li>
                </ul>

                <div className="project-links">
                  <a href="https://csi.dbit.in/" target="_blank" rel="noreferrer" className="link-button">
                    <i className="fa fa-globe"></i> Website
                  </a>
                </div>
              </div>
            </div>

            {/* DBIT Website */}
            <div className="timeline-item">
              <div className="timeline-badge">
                <span></span>
              </div>
              <div className="timeline-content">
                <h3 className="job-title">Internship - DBIT Website</h3>
                <p className="job-date">DBIT Website Lead - Mumbai, India | July 2024 – July 2025</p>
                <ul className="job-duties">
                  <li>Redesigned UI/UX design for an improved website experience.</li>
                  <li>Optimized code structure for better performance and scalability.</li>
                </ul>
                <p className="note">Changes in this website will be pushed after completion (not updated)</p>
                <div className="project-links">
                  <a href="https://dbit.in/" target="_blank" rel="noreferrer" className="link-button">
                    <i className="fa fa-globe"></i> Website
                  </a>
                </div>
              </div>
            </div>

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
              <h3>Don Bosco Institute of Technology</h3>
              <p>B.E. Information Technology</p>
              <p className="education-date">Expected Graduation: July 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="section" id="achievements">
        <div className="section-container">
          <h2 className="section-title">Achievements & Hackathons</h2>
          <div className="divider"></div>
          <div className="achievements-grid">
            <div className="achievement-card">
              <div className="achievement-icon">🏆</div>
              <p>3rd Place - DBIT Hackathon (Codeverse)</p>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon">🏅</div>
              <p>Placed 3rd in a college-level CRM project</p>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon">💻</div>
              <p>SIH Participant | Multiple Hackathons</p>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon">🚀</div>
              <p>Project selected for incubation deployment</p>
            </div>
            <div className="achievement-card">
              <div className="achievement-icon">👨‍💻</div>
              <p>Web Dev Head of CSI DBIT</p>
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
                <a href="https://linkedin.com/in/benfurtado" target="_blank" rel="noreferrer">linkedin.com/in/benfurtado</a>
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
          <p>&copy; {new Date().getFullYear()} Ben Furtado. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}