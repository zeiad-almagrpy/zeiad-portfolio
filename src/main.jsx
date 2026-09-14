import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { projects, site } from "./data";
import "./styles.css";
import { FaWhatsapp, FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
const waLink = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappMessage)}`;

function App() {
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = [...document.querySelectorAll("main section[id]")];
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
    };
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: "-35% 0px -55%", threshold: 0 }
    );
    sections.forEach(section => observer.observe(section));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navItems = useMemo(() => [
    ["home", "Home"], ["about", "About"], ["skills", "Skills"], ["projects", "Projects"], ["contact", "Contact"]
  ], []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <span style={{ "--progress": `${progress}%` }} />
        <b>{Math.round(progress)}%</b>
      </div>

      <header className="nav">
        <button className="brand" onClick={() => scrollTo("home")} aria-label="Go to home">
          <span className="brand-code">&lt;/&gt;</span> ZEIAD<span>.</span>
        </button>

        <button className="menu-btn" onClick={() => setMenuOpen(v => !v)} aria-label="Open menu">
          {menuOpen ? "×" : "☰"}
        </button>

        <nav className={menuOpen ? "open" : ""}>
          {navItems.map(([id, label]) => (
            <button className={activeSection === id ? "active" : ""} key={id} onClick={() => scrollTo(id)}>
              {label}
            </button>
          ))}
          <a className="talk-btn" href={waLink} target="_blank" rel="noreferrer">Let's Talk ↗</a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="grid-bg" />
          <div className="hero-copy reveal">
            <div className="eyebrow">✦ Hello, I'm</div>
            <h1>ZEIAD<br /><span>ALMAGRAPY</span></h1>
            <h2>{site.role}<span className="cursor">|</span></h2>
            <p>
              I build modern, responsive websites and web applications that turn ideas into useful digital products.
            </p>
            <div className="actions">
              <button className="primary" onClick={() => scrollTo("projects")}>View My Work ↗</button>
              <a className="secondary" href={waLink} target="_blank" rel="noreferrer">Contact Me ◌</a>
            </div>
          </div>

          <div className="hero-visual reveal">
            <div className="orbit orbit-a" />
            <div className="orbit orbit-b" />
            <div className="laptop">
              <div className="screen">
                <div className="dots"><i/><i/><i/></div>
                <pre>{`const developer = {
  name: "Ziad Almagrapy",
  role: "Web Developer",
  passion: "Building things",
  stack: ["React", "JS", "Supabase"]
};

function create() {
  return "Success";
}`}</pre>
              </div>
              <div className="keyboard" />
            </div>
            <div className="floating-code">Building<br /><b>Digital</b><br />Experiences</div>
          </div>

          <button className="scroll-hint" onClick={() => scrollTo("about")}>↓ &nbsp; Scroll Down</button>
        </section>

        <section id="about" className="section compact">
          <div className="about-card reveal">
            <div className="avatar-placeholder"><span>ZA</span><small>WEB DEV</small></div>
            <div className="about-copy">
              <span className="section-kicker">About Me</span>
              <h3>Turning ideas into useful digital experiences.</h3>
              <p>
                I'm a Business Information Systems student passionate about programming and web development. I enjoy solving problems and building clean, practical web experiences.
              </p>
              <a className="secondary inline-btn" href={waLink} target="_blank" rel="noreferrer">More About Me ↗</a>
            </div>
            <div className="facts">
              <div><small>Name</small><b>Zeiad Almagrapy</b></div>
              <div><small>Focus</small><b>Web Development</b></div>
              <div><small>Location</small><b>{site.location}</b></div>
              <div><small>Status</small><b className="available">● Open to Work</b></div>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="section-title reveal">
            <span>My Skills</span>
            <p>Technologies and tools I'm currently building with.</p>
          </div>
          <div className="skills-grid">
            {[
              ["Frontend", "HTML · CSS · JavaScript · React", 90, "&lt;/&gt;"],
              ["Backend & Database", "Supabase · REST APIs · Authentication · SQL", 82, "DB"],
              ["Tools & Platforms", "Git · GitHub · VS Code · Postman", 85, "GIT"],
              ["Other Skills", "Responsive Design · UI/UX Basics · Problem Solving", 78, "✦"],
            ].map(([title, text, value, icon]) => (
              <article className="skill-card reveal" key={title}>
                <div className="skill-icon" dangerouslySetInnerHTML={{ __html: icon }} />
                <h3>{title}</h3>
                <p>{text}</p>
                <div className="meter"><span style={{ width: `${value}%` }} /></div>
                <small>{value}%</small>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section-title row reveal">
            <div><span>Featured Projects</span><p>Real projects, not just screenshots.</p></div>
            <span className="project-count">{projects.length.toString().padStart(2, "0")} PROJECTS</span>
          </div>
          <div className="projects-grid">
            {projects.map(project => (
              <article className="project-card reveal" key={project.title}>
                <div className={`project-preview ${project.type}`}>
                  <div className="mock-window">
                    <div className="mock-top"><i/><i/><i/></div>
                    <div className="mock-content">
                      {project.type === "store" && <><strong>ELMAGHRPY</strong><div className="mock-products"><b/><b/><b/></div></>}
                      {project.type === "makeup" && <><strong>WESAM</strong><div className="mock-photo"/><div className="mock-lines"><i/><i/></div></>}
                      {project.type === "todo" && <><strong>TO DO LIST</strong><div className="mock-task"/><div className="mock-task"/><div className="mock-task"/></>}
                    </div>
                  </div>
                </div>
                <div className="project-body">
                  <div className="project-number">0{projects.indexOf(project) + 1}</div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                  <div className="project-links">
                    {project.live ? <a href={project.live} target="_blank" rel="noreferrer">Live Demo ↗</a> : <span className="disabled">Live Demo —</span>}
                    {project.github ? <a href={project.github} target="_blank" rel="noreferrer">GitHub <FaGithub /></a> : <span className="disabled">GitHub —</span>}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="contact-card reveal">
            <div className="contact-copy">
              <span className="section-kicker">Let's Work Together</span>
              <h2>Have a project<br />in mind?</h2>
              <p>Send me a message and let's talk about what we can build together.</p>
              <a className="primary inline-btn" href={waLink} target="_blank" rel="noreferrer">Let's Talk on WhatsApp ↗</a>
            </div>
            <div className="contact-links">
              <a className="contact-item whatsapp" href={waLink} target="_blank" rel="noreferrer"><div className="contact-icon"><FaWhatsapp /></div><div><b>WhatsApp</b><small>Start a conversation</small></div></a>
              <a className="contact-item" href={`mailto:${site.email}`}><div className="contact-icon"><MdEmail /></div><div><b>Email</b><small>{site.email}</small></div></a>
              <a className="contact-item" href={site.github} target="_blank" rel="noreferrer"><div className="contact-icon"><FaGithub /></div><div><b>GitHub</b><small>View my code</small></div></a>
              <a className="contact-item" href={site.linkedin} target="_blank" rel="noreferrer"><div className="contact-icon"><FaLinkedin /></div><div><b>LinkedIn</b><small>Let's connect</small></div></a>
            </div>
          </div>
        </section>
      </main>

      <a className="floating-wa" href={waLink} target="_blank" rel="noreferrer" aria-label="Contact on WhatsApp"><FaWhatsapp /></a>
      <footer>© 2026 {site.name} · Built with React</footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
