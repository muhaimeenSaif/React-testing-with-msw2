import React from 'react';

const ContactMe: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API", "JWT"],
      githubUrl: "https://github.com/username/ecommerce-platform",
      liveUrl: "https://ecommerce-demo.com",
      image: "🛒"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      technologies: ["React", "TypeScript", "Socket.io", "Express", "PostgreSQL"],
      githubUrl: "https://github.com/username/task-manager",
      liveUrl: "https://taskmanager-demo.com",
      image: "📋"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "Interactive weather dashboard with location-based forecasts, historical data visualization, and weather alerts.",
      technologies: ["React", "D3.js", "OpenWeather API", "Chart.js"],
      githubUrl: "https://github.com/username/weather-dashboard",
      liveUrl: "https://weather-demo.com",
      image: "🌤️"
    },
    {
      id: 4,
      title: "Social Media Analytics",
      description: "Analytics platform for social media metrics with data visualization, reporting, and automated insights generation.",
      technologies: ["React", "Python", "Django", "Redis", "Celery"],
      githubUrl: "https://github.com/username/social-analytics",
      liveUrl: "https://analytics-demo.com",
      image: "📊"
    }
  ];

  const experiences = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      company: "Tech Solutions Inc.",
      period: "2022 - Present",
      description: "Lead development of enterprise web applications using React, Node.js, and cloud technologies. Mentor junior developers and architect scalable solutions.",
      achievements: [
        "Increased application performance by 40%",
        "Led a team of 5 developers",
        "Implemented CI/CD pipelines"
      ]
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "Digital Innovations Ltd.",
      period: "2020 - 2022",
      description: "Developed responsive web applications and collaborated with UX/UI designers to create intuitive user interfaces.",
      achievements: [
        "Built 15+ responsive web applications",
        "Reduced load times by 35%",
        "Implemented modern React patterns"
      ]
    },
    {
      id: 3,
      title: "Junior Web Developer",
      company: "StartUp Hub",
      period: "2019 - 2020",
      description: "Started career developing websites and learning modern web technologies. Contributed to various client projects.",
      achievements: [
        "Completed 20+ client projects",
        "Learned React, Node.js, and databases",
        "Received 'Rising Star' award"
      ]
    }
  ];

  const skills = [
    { category: "Frontend", items: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Next.js"] },
    { category: "Backend", items: ["Node.js", "Express", "Python", "Django", "REST APIs", "GraphQL"] },
    { category: "Database", items: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"] },
    { category: "Tools & Others", items: ["Git", "Docker", "AWS", "Jest", "Webpack", "CI/CD"] }
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="profile-image">
            <div className="avatar">👨‍💻</div>
          </div>
          <h1 className="hero-title">John Doe</h1>
          <h2 className="hero-subtitle">Full Stack Software Developer</h2>
          <p className="hero-description">
            Passionate software developer with 5+ years of experience creating innovative web applications 
            and solving complex problems through clean, efficient code.
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn btn-primary">Get In Touch</a>
            <a href="#projects" className="btn btn-secondary">View Projects</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" id="about">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                I'm a passionate full-stack developer who loves creating digital experiences that make a difference. 
                With over 5 years of experience in web development, I specialize in building scalable, user-friendly 
                applications using modern technologies.
              </p>
              <p>
                My journey in software development started with a curiosity about how websites work, and it has 
                evolved into a career where I get to solve complex problems and bring ideas to life through code. 
                I believe in writing clean, maintainable code and staying up-to-date with the latest industry trends.
              </p>
              <p>
                When I'm not coding, you can find me contributing to open-source projects, writing technical blogs, 
                or exploring new technologies. I'm always eager to take on new challenges and collaborate with 
                like-minded individuals.
              </p>
            </div>
            <div className="skills-grid">
              {skills.map((skillGroup, index) => (
                <div key={index} className="skill-group">
                  <h3 className="skill-category">{skillGroup.category}</h3>
                  <div className="skill-items">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <span key={skillIndex} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section">
        <div className="container">
          <h2 className="section-title">Professional Experience</h2>
          <div className="timeline">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3 className="job-title">{exp.title}</h3>
                  <h4 className="company">{exp.company}</h4>
                  <span className="period">{exp.period}</span>
                  <p className="job-description">{exp.description}</p>
                  <ul className="achievements">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section" id="projects">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  <span className="project-icon">{project.image}</span>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-technologies">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a href={project.githubUrl} className="project-link" target="_blank" rel="noopener noreferrer">
                      📁 GitHub
                    </a>
                    <a href={project.liveUrl} className="project-link" target="_blank" rel="noopener noreferrer">
                      🚀 Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <div className="container">
          <h2 className="section-title">Let's Work Together</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Get In Touch</h3>
              <p>
                I'm always interested in hearing about new opportunities and exciting projects. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
              <div className="contact-methods">
                <div className="contact-method">
                  <span className="contact-icon">📧</span>
                  <div>
                    <strong>Email</strong>
                    <p>john.doe@example.com</p>
                  </div>
                </div>
                <div className="contact-method">
                  <span className="contact-icon">📱</span>
                  <div>
                    <strong>Phone</strong>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="contact-method">
                  <span className="contact-icon">📍</span>
                  <div>
                    <strong>Location</strong>
                    <p>San Francisco, CA</p>
                  </div>
                </div>
              </div>
              <div className="social-links">
                <a href="https://github.com/johndoe" className="social-link">GitHub</a>
                <a href="https://linkedin.com/in/johndoe" className="social-link">LinkedIn</a>
                <a href="https://twitter.com/johndoe" className="social-link">Twitter</a>
              </div>
            </div>
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={5} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactMe;