"use client";

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Sun,
  Moon,
  Menu,
  X,
  Github,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";

const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
});
interface ThemeProviderProps {
  children: React.ReactNode;
}
const useTheme = () => useContext(ThemeContext);

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default function Home() {
  return (
    <ThemeProvider>
      <MarketingPortfolio />
    </ThemeProvider>
  );
}


const MarketingPortfolio = () => {
  const { theme, toggleTheme } = useTheme();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleCloseModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  const formRef = useRef(null);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const projects = [
    {
      id: "rebranding",
      title: "Corporate Rebranding",
      category: "Branding",
      image:
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&h=500&fit=crop",
      description:
        "Led a comprehensive rebranding campaign for a major tech company, resulting in a modernized visual identity and increased brand recognition.",
      challenge: "Outdated brand image and low market visibility.",
      solution:
        "Developed a new brand strategy, visual identity, and marketing collateral.",
      results:
        "40% increase in brand recognition, 25% boost in customer engagement.",
      color: "#8B5CF6",
      images: [
        "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&h=500&fit=crop",
        "https://plus.unsplash.com/premium_photo-1689977968861-9c91dbb16049?w=500&h=500&fit=crop",
      ],
    },
    {
      id: "digital",
      title: "Digital Transformation",
      category: "Strategy",
      image:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Spearheaded a digital transformation initiative that modernized marketing processes and improved customer experience.",
      challenge: "Legacy systems and manual processes hindering efficiency.",
      solution:
        "Implemented AI-powered analytics, marketing automation, and CRM integration.",
      results:
        "50% reduction in campaign execution time, 30% increase in conversion rates.",
      color: "#e74c3c",
      images: [
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1542744174-7c97c32b00b4?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
    },
    {
      id: "content",
      title: "Content Marketing",
      category: "Campaign",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop",
      description:
        "Developed and executed a content marketing strategy that positioned the brand as a thought leader in the industry.",
      challenge: "Low brand authority and limited content reach.",
      solution:
        "Created high-quality, data-driven content and implemented a multi-channel distribution strategy.",
      results:
        "200% increase in organic traffic, 150% growth in social media following.",
      color: "#2ecc71",
      images: [
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1542744174-7c97c32b00b4?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
    },
    {
      id: "social",
      title: "Social Media Revamp",
      category: "Digital",
      image:
        "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&h=500&fit=crop",
      description:
        "Transformed the brand's social media presence through a comprehensive strategy and content overhaul.",
      challenge: "Stale content and low engagement on social platforms.",
      solution:
        "Developed a social media strategy, created engaging content, and implemented community management practices.",
      results:
        "300% increase in engagement, 120% growth in followers within 6 months.",
      color: "#f39c12",
      images: [
        "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&h=500&fit=crop",
        "https://images.unsplash.com/photo-1597226012661-ee865b212f51?w=500&h=500&fit=crop",
      ],
    },
  ];

  const achievements = [
    {
      id: 1,
      title: "Award-Winning Campaign",
      description:
        "Created a viral marketing campaign that won the prestigious Golden Lion at Cannes Lions International Festival.",
      icon: "🏆",
      year: 2023,
    },
    {
      id: 2,
      title: "Record-Breaking Engagement",
      description:
        "Developed a social media strategy that achieved the highest engagement rate in the company's history.",
      icon: "📈",
      year: 2022,
    },
    {
      id: 3,
      title: "Revenue Growth",
      description:
        "Led a team that created marketing campaigns resulting in a 35% increase in annual revenue.",
      icon: "💰",
      year: 2021,
    },
    {
      id: 4,
      title: "Digital Innovation",
      description:
        "Pioneered the use of AI-powered analytics in marketing, improving campaign ROI by 28%.",
      icon: "🤖",
      year: 2020,
    },
  ];

  const skills = [
    {
      id: 1,
      name: "Digital Marketing",
      expertise: 95,
      description:
        "Strategy, execution, and analysis of digital marketing campaigns.",
    },
    {
      id: 2,
      name: "Brand Development",
      expertise: 90,
      description:
        "Creating and evolving brand identities across various industries.",
    },
    {
      id: 3,
      name: "Content Creation",
      expertise: 85,
      description:
        "Developing compelling content across multiple formats and channels.",
    },
    {
      id: 4,
      name: "Marketing Technology",
      expertise: 80,
      description: "Implementing and optimizing marketing tools and platforms.",
    },
    {
      id: 5,
      name: "Data Analysis",
      expertise: 75,
      description:
        "Interpreting data to inform marketing strategies and measure performance.",
    },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github size={20} />,
      url: "https://github.com/alexmorgan",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin size={20} />,
      url: "https://linkedin.com/in/alexmorgan",
    },
    {
      name: "Twitter",
      icon: <Twitter size={20} />,
      url: "https://twitter.com/alexmorgan",
    },
    {
      name: "Instagram",
      icon: <Instagram size={20} />,
      url: "https://instagram.com/alexmorgan",
    },
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" },
  ];
  

  const handleProjectClick = (projectId: string) => {
    setSelectedProject(projectId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    toast.success("Message sent successfully! We'll get back to you soon.", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    console.log("Form submitted", formData);
  };

  const selectedProjectData = selectedProject
    ? projects.find((project) => project.id === selectedProject)
    : null;

  // CSS variables for theme colors
  const themeStyles = {
    "--primary-color": theme === "light" ? "#8B5CF6" : "#A78BFA",
    "--primary-dark": theme === "light" ? "#7C3AED" : "#8B5CF6",
    "--primary-light": theme === "light" ? "#A78BFA" : "#C4B5FD",
    "--text-color": theme === "light" ? "#1F2937" : "#F9FAFB",
    "--text-muted": theme === "light" ? "#6B7280" : "#D1D5DB",
    "--bg-primary": theme === "light" ? "#FFFFFF" : "#111827",
    "--bg-secondary": theme === "light" ? "#F3F4F6" : "#1F2937",
    "--card-bg": theme === "light" ? "#FFFFFF" : "#1F2937",
    "--card-border": theme === "light" ? "#E5E7EB" : "#374151",
  };

  return (
    <div
      className={`min-h-screen font-poppins ${
        theme === "light" ? "text-gray-900" : "text-white"
      }`}
      style={{
        ...themeStyles,
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-color)",
      }}
    >
      <header
        className="sticky top-0 font-roboto z-50 border-b"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--card-border)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <motion.h1
              className="text-2xl md:text-3xl font-bold cursor-pointer"
              style={{ color: "var(--text-color)" }}
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection("home")}
            >
              Alex Morgan
            </motion.h1>

            <div className="flex items-center gap-4">
              <nav className="hidden md:flex space-x-6">
                {[
                  { id: "home", label: "Home" },
                  { id: "projects", label: "Projects" },
                  { id: "achievements", label: "Achievements" },
                  { id: "skills", label: "Skills" },
                  { id: "contact", label: "Contact" },
                ].map((section) => (
                  <motion.button
                    key={section.id}
                    className={`text-lg font-medium transition-colors cursor-pointer`}
                    style={{
                      color:
                        activeSection === section.id
                          ? "var(--primary-color)"
                          : "var(--text-muted)",
                    }}
                    whileHover={{ y: -2 }}
                    onClick={() => scrollToSection(section.id)}
                  >
                    {section.label}
                  </motion.button>
                ))}
              </nav>

              {/* Theme toggle button */}
              <motion.button
                className="p-2 rounded-full cursor-pointer"
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                aria-label={`Switch to ${
                  theme === "dark" ? "light" : "dark"
                } mode`}
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>

              {/* Mobile menu button */}
              <motion.button
                className="md:hidden p-2 rounded-lg cursor-pointer"
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{ backgroundColor: "var(--bg-secondary)" }}
            >
              <div className="px-4 py-3 space-y-2">
                {[
                  { id: "home", label: "Home" },
                  { id: "projects", label: "Projects" },
                  { id: "achievements", label: "Achievements" },
                  { id: "skills", label: "Skills" },
                  { id: "contact", label: "Contact" },
                ].map((section) => (
                  <motion.button
                    key={section.id}
                    className="block w-full text-left py-2 px-3 rounded-lg cursor-pointer"
                    style={{
                      backgroundColor:
                        activeSection === section.id
                          ? "var(--primary-dark)"
                          : "transparent",
                      color:
                        activeSection === section.id
                          ? "white"
                          : "var(--text-muted)",
                    }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => scrollToSection(section.id)}
                  >
                    {section.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        <section
          id="home"
          className="relative overflow-hidden"
          style={{ minHeight: "90vh" }}
        >
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.pexels.com/photos/3184613/pexels-photo-3184613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Marketing strategy meeting"
              className="w-full h-full object-cover"
              style={{ opacity: theme === "dark" ? 0.4 : 0.8 }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  theme === "dark"
                    ? "linear-gradient(to right, rgba(17, 24, 39, 0.9), rgba(17, 24, 39, 0.7))"
                    : "linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6))",
              }}
            />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 h-full flex items-center">
            <div className="w-full">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
                {/* Profile image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 shadow-xl flex-shrink-0 cursor-pointer"
                  style={{ borderColor: "var(--primary-color)" }}
                  whileHover={{ scale: 1.05 }}
                >
                  <img
                    src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Alex Morgan"
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <div className="max-w-2xl text-center md:text-left">
                  <motion.div
                    className="mb-4 md:mb-8 inline-block"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span
                      className="px-4 py-1.5 rounded-full text-sm font-medium border inline-block cursor-pointer"
                      style={{
                        backgroundColor: "var(--primary-color)",
                        color: "white",
                        borderColor: "var(--primary-light)",
                      }}
                    >
                      Senior Marketing Manager
                    </span>
                  </motion.div>

                  <motion.h1
                    className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 md:mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    style={{ color: "var(--text-color)" }}
                  >
                    Alex Morgan
                  </motion.h1>

                  <motion.h2
                    className="text-3xl md:text-4xl font-bold mb-4 md:mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    Transforming Brands Through Innovative Marketing
                  </motion.h2>

                  <motion.p
                    className="text-lg md:text-xl mb-6 md:mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    style={{ color: "var(--text-muted)" }}
                  >
                    With over a decade of experience in digital marketing, I
                    help brands stand out in a crowded marketplace through
                    data-driven strategies and creative execution.
                  </motion.p>

                  <motion.div
                    className="flex flex-wrap justify-center md:justify-start gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                  >
                    <motion.button
                      className="text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-lg cursor-pointer"
                      style={{
                        backgroundColor: "var(--primary-color)",
                        boxShadow: `0 10px 15px -3px ${
                          theme === "dark"
                            ? "rgba(139, 92, 246, 0.3)"
                            : "rgba(139, 92, 246, 0.2)"
                        }`,
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollToSection("projects")}
                    >
                      Explore My Work
                    </motion.button>
                    <motion.button
                      className="border backdrop-blur-md font-medium py-3 px-8 rounded-lg transition-all duration-300 cursor-pointer"
                      style={{
                        borderColor: "var(--primary-color)",
                        color: "var(--primary-color)",
                        backgroundColor:
                          theme === "dark"
                            ? "rgba(30, 41, 59, 0.5)"
                            : "rgba(255, 255, 255, 0.5)",
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => scrollToSection("contact")}
                    >
                      Let's Collaborate
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="projects"
          className="py-16 md:py-24 relative"
          style={{
            backgroundColor: theme === "dark" ? "#111827" : "#F9FAFB",
            minHeight: "80vh",
          }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background:
                theme === "dark"
                  ? "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.4), transparent 70%)"
                  : "radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.2), transparent 70%)",
            }}
          />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="mb-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block mb-3">
                <span
                  className="px-4 py-1.5 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor:
                      theme === "dark"
                        ? "rgba(139, 92, 246, 0.2)"
                        : "rgba(139, 92, 246, 0.1)",
                    color: "var(--primary-color)",
                  }}
                >
                  PROJECTS
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: "var(--text-color)" }}
              >
                Featured Campaigns
              </h2>
              <p
                className="text-gray-400 max-w-2xl mx-auto"
                style={{ color: "var(--text-muted)" }}
              >
                A showcase of strategic marketing initiatives that drove
                exceptional results for leading brands
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="group relative rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    backgroundColor: "var(--card-bg)",
                    borderColor: "var(--card-border)",
                  }}
                  onClick={() => handleProjectClick(project.id)}
                >
                  <div className="relative h-64 md:h-72 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-sm font-medium z-10"
                      style={{ backgroundColor: "var(--primary-color)" }}
                    >
                      {project.category}
                    </div>
                    <motion.button
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="bg-white/90 text-gray-900 cursor-pointer font-medium py-2 px-6 rounded-lg shadow-md">
                        View Details
                      </span>
                    </motion.button>
                  </div>

                  <div className="p-6">
                    <h3
                      className="text-xl font-bold mb-3"
                      style={{ color: "var(--text-color)" }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="mb-4 line-clamp-2"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex space-x-2">
                        <span
                          className="inline-flex items-center justify-center w-10 h-10 rounded-full text-xl"
                          style={{
                            backgroundColor:
                              theme === "dark"
                                ? "rgba(139, 92, 246, 0.2)"
                                : "rgba(139, 92, 246, 0.1)",
                            color: "var(--primary-color)",
                          }}
                        >
                          {project.category === "Branding" ? "🎨" : "📊"}
                        </span>
                      </div>
                      <span
                        className="text-sm"
                        style={{ color: "var(--text-muted)" }}
                      >
                        View Details
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="achievements"
          className="py-16 md:py-24 relative overflow-hidden"
          style={{
            background:
              theme === "dark"
                ? "linear-gradient(135deg, #111827 0%, #1E293B 100%)"
                : "linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)",
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-[10%] right-[5%] w-64 h-64 rounded-full blur-xl"
              style={{
                backgroundColor:
                  theme === "dark"
                    ? "rgba(139, 92, 246, 0.05)"
                    : "rgba(139, 92, 246, 0.03)",
              }}
              animate={{
                x: [0, 20, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-[20%] left-[10%] w-80 h-80 rounded-full blur-xl"
              style={{
                backgroundColor:
                  theme === "dark"
                    ? "rgba(139, 92, 246, 0.05)"
                    : "rgba(139, 92, 246, 0.03)",
              }}
              animate={{
                x: [0, -15, 0],
                y: [0, 15, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="mb-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block mb-3">
                <span
                  className="px-4 py-1.5 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor:
                      theme === "dark"
                        ? "rgba(139, 92, 246, 0.2)"
                        : "rgba(139, 92, 246, 0.1)",
                    color: "var(--primary-color)",
                  }}
                >
                  ACHIEVEMENTS
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: "var(--text-color)" }}
              >
                Career Highlights
              </h2>
              <p
                className="max-w-2xl mx-auto"
                style={{ color: "var(--text-muted)" }}
              >
                Recognitions and accomplishments that demonstrate my impact in
                the marketing industry
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  className="relative rounded-xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-2 "
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    backgroundColor:
                      theme === "dark"
                        ? "rgba(31, 41, 55, 0.8)"
                        : "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(8px)",
                    borderColor: "var(--card-border)",
                  }}
                >
                  <div
                    className="absolute top-0 right-0 w-16 h-16 rounded-full -mr-8 -mt-8 flex items-center justify-center text-xl"
                    style={{
                      backgroundColor:
                        theme === "dark"
                          ? "rgba(139, 92, 246, 0.1)"
                          : "rgba(139, 92, 246, 0.05)",
                    }}
                  >
                    {achievement.icon}
                  </div>
                  <div className="mb-4">
                    <h3
                      className="text-xl font-bold mb-1"
                      style={{ color: "var(--text-color)" }}
                    >
                      {achievement.title}
                    </h3>
                    <span
                      style={{ color: "var(--primary-color)" }}
                      className="font-medium"
                    >
                      {achievement.year}
                    </span>
                  </div>
                  <p style={{ color: "var(--text-muted)" }}>
                    {achievement.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="skills"
          className="py-16 md:py-24 relative"
          style={{
            backgroundColor: theme === "dark" ? "#111827" : "#F9FAFB",
          }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background:
                theme === "dark"
                  ? "radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.4), transparent 70%)"
                  : "radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.2), transparent 70%)",
            }}
          />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="mb-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block mb-3">
                <span
                  className="px-4 py-1.5 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor:
                      theme === "dark"
                        ? "rgba(139, 92, 246, 0.2)"
                        : "rgba(139, 92, 246, 0.1)",
                    color: "var(--primary-color)",
                  }}
                >
                  SKILLS
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: "var(--text-color)" }}
              >
                Marketing Expertise
              </h2>
              <p
                className="max-w-2xl mx-auto"
                style={{ color: "var(--text-muted)" }}
              >
                Comprehensive skill set in digital marketing, strategy
                development, and campaign execution
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  className="relative rounded-xl p-6 border transition-all duration-300 hover:shadow-xl hover:-translate-y-2 "
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    backgroundColor:
                      theme === "dark"
                        ? "rgba(31, 41, 55, 0.8)"
                        : "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(8px)",
                    borderColor: "var(--card-border)",
                  }}
                >
                  <div className="relative mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3
                        className="text-lg font-bold"
                        style={{ color: "var(--text-color)" }}
                      >
                        {skill.name}
                      </h3>
                      <span
                        style={{ color: "var(--primary-color)" }}
                        className="font-medium"
                      >
                        {skill.expertise}%
                      </span>
                    </div>
                    <div
                      className="w-full rounded-full h-2.5 overflow-hidden"
                      style={{
                        backgroundColor:
                          theme === "dark" ? "#374151" : "#E5E7EB",
                      }}
                    >
                      <motion.div
                        className="h-2.5 rounded-full"
                        style={{
                          background: `linear-gradient(to right, var(--primary-light), var(--primary-color))`,
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.expertise}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                  <p style={{ color: "var(--text-muted)" }}>
                    {skill.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="py-16 md:py-24 relative overflow-hidden"
          style={{
            background:
              theme === "dark"
                ? "linear-gradient(135deg, #111827 0%, #1E293B 100%)"
                : "linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)",
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-[10%] right-[5%] w-64 h-64 rounded-full blur-xl"
              style={{
                backgroundColor:
                  theme === "dark"
                    ? "rgba(139, 92, 246, 0.05)"
                    : "rgba(139, 92, 246, 0.03)",
              }}
              animate={{
                x: [0, 20, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-[20%] left-[10%] w-80 h-80 rounded-full blur-xl"
              style={{
                backgroundColor:
                  theme === "dark"
                    ? "rgba(139, 92, 246, 0.05)"
                    : "rgba(139, 92, 246, 0.03)",
              }}
              animate={{
                x: [0, -15, 0],
                y: [0, 15, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="mb-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block mb-3">
                <span
                  className="px-4 py-1.5 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor:
                      theme === "dark"
                        ? "rgba(139, 92, 246, 0.2)"
                        : "rgba(139, 92, 246, 0.1)",
                    color: "var(--primary-color)",
                  }}
                >
                  CONTACT
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: "var(--text-color)" }}
              >
                Let's Collaborate
              </h2>
              <p
                className="max-w-2xl mx-auto"
                style={{ color: "var(--text-muted)" }}
              >
                Ready to elevate your brand? Let's discuss how I can help you
                achieve your marketing goals
              </p>
            </motion.div>

            <div
              className="max-w-3xl mx-auto rounded-xl p-8 border shadow-xl"
              style={{
                backgroundColor:
                  theme === "dark"
                    ? "rgba(31, 41, 55, 0.8)"
                    : "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(8px)",
                borderColor: "var(--card-border)",
              }}
            >
              <form
                className="space-y-6"
                onSubmit={handleFormSubmit}
                ref={formRef}
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg placeholder-gray-400 focus:outline-none transition-all cursor-text"
                      style={{
                        backgroundColor:
                          theme === "dark"
                            ? "rgba(55, 65, 81, 0.5)"
                            : "rgba(243, 244, 246, 0.5)",
                        borderColor: "var(--card-border)",
                        color: "var(--text-color)",
                      }}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg placeholder-gray-400 focus:outline-none transition-all cursor-text"
                      style={{
                        backgroundColor:
                          theme === "dark"
                            ? "rgba(55, 65, 81, 0.5)"
                            : "rgba(243, 244, 246, 0.5)",
                        borderColor: "var(--card-border)",
                        color: "var(--text-color)",
                      }}
                      placeholder="Your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg placeholder-gray-400 focus:outline-none transition-all cursor-text"
                    style={{
                      backgroundColor:
                        theme === "dark"
                          ? "rgba(55, 65, 81, 0.5)"
                          : "rgba(243, 244, 246, 0.5)",
                      borderColor: "var(--card-border)",
                      color: "var(--text-color)",
                    }}
                    placeholder="Project subject"
                    required
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Message
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg placeholder-gray-400 focus:outline-none transition-all cursor-text"
                    style={{
                      backgroundColor:
                        theme === "dark"
                          ? "rgba(55, 65, 81, 0.5)"
                          : "rgba(243, 244, 246, 0.5)",
                      borderColor: "var(--card-border)",
                      color: "var(--text-color)",
                    }}
                    placeholder="Your message"
                    required
                  />
                </div>

                <motion.button
                  className="w-full text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-lg cursor-pointer"
                  style={{
                    backgroundColor: "var(--primary-color)",
                    boxShadow: `0 10px 15px -3px ${
                      theme === "dark"
                        ? "rgba(139, 92, 246, 0.3)"
                        : "rgba(139, 92, 246, 0.2)"
                    }`,
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer
        className="py-8 border-t"
        style={{
          backgroundColor: "var(--bg-primary)",
          borderColor: "var(--card-border)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h2
                className="text-xl font-bold"
                style={{ color: "var(--text-color)" }}
              >
                Alex Morgan
              </h2>
              <p
                className="text-sm mt-2"
                style={{ color: "var(--text-muted)" }}
              >
                Crafting compelling marketing strategies for ambitious brands
              </p>
            </div>

            <div>
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "var(--text-color)" }}
              >
                Quick Links
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm hover:underline cursor-pointer"
                      style={{ color: "var(--text-muted)" }}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href.replace("#", ""));
                      }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "var(--text-color)" }}
              >
                Connect
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full cursor-pointer"
                    style={{
                      backgroundColor:
                        theme === "dark"
                          ? "rgba(139, 92, 246, 0.1)"
                          : "rgba(139, 92, 246, 0.05)",
                      color: "var(--primary-color)",
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "var(--text-color)" }}
              >
                Contact Info
              </h3>
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                Email: contact@alexmorgan.com
                <br />
                Phone: +1 (555) 123-4567
                <br />
                Location: San Francisco, CA
              </p>
            </div>
          </div>

          <div
            className="mt-8 pt-8 border-t text-center"
            style={{ borderColor: "var(--card-border)" }}
          >
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              © {new Date().getFullYear()} Alex Morgan. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {isModalOpen && selectedProjectData && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              ref={modalRef}
              className="max-w-4xl w-full overflow-hidden shadow-2xl rounded-xl my-8"
              style={{ backgroundColor: "var(--card-bg)" }}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="relative">
                <div className="h-64 overflow-hidden">
                  <img
                    src={selectedProjectData.images[0]}
                    alt={selectedProjectData.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                <div className="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-20">
                  <h2 className="text-2xl font-bold text-white">
                    {selectedProjectData.title}
                  </h2>
                  <motion.button
                    className="bg-white/80 text-black border border-gray-300 cursor-pointer rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCloseModal}
                  >
                    <span className="text-xl font-bold">×</span>
                  </motion.button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <div className="mb-6">
                      <h3
                        className="text-lg font-medium mb-3"
                        style={{ color: "var(--primary-color)" }}
                      >
                        Challenge
                      </h3>
                      <p style={{ color: "var(--text-muted)" }}>
                        {selectedProjectData.challenge}
                      </p>
                    </div>

                    <div className="mb-6">
                      <h3
                        className="text-lg font-medium mb-3"
                        style={{ color: "var(--primary-color)" }}
                      >
                        Solution
                      </h3>
                      <p style={{ color: "var(--text-muted)" }}>
                        {selectedProjectData.solution}
                      </p>
                    </div>

                    <div>
                      <h3
                        className="text-lg font-medium mb-3"
                        style={{ color: "var(--primary-color)" }}
                      >
                        Results
                      </h3>
                      <p style={{ color: "var(--text-muted)" }}>
                        {selectedProjectData.results}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="mb-6">
                      <h3
                        className="text-lg font-medium mb-3"
                        style={{ color: "var(--primary-color)" }}
                      >
                        Project Details
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span style={{ color: "var(--text-muted)" }}>
                            Category:
                          </span>
                          <span
                            style={{ color: "var(--text-color)" }}
                            className="font-medium"
                          >
                            {selectedProjectData.category}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span style={{ color: "var(--text-muted)" }}>
                            Client:
                          </span>
                          <span
                            style={{ color: "var(--text-color)" }}
                            className="font-medium"
                          >
                            Confidential
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span style={{ color: "var(--text-muted)" }}>
                            Year:
                          </span>
                          <span
                            style={{ color: "var(--text-color)" }}
                            className="font-medium"
                          >
                            2023
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3
                        className="text-lg font-medium mb-3"
                        style={{ color: "var(--primary-color)" }}
                      >
                        Gallery
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedProjectData.images.map((image, index) => (
                          <motion.div
                            key={index}
                            className="relative rounded-lg overflow-hidden group cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <img
                              src={image}
                              alt={`${selectedProjectData.title} - ${
                                index + 1
                              }`}
                              className="w-full h-48 object-cover"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <span className="text-white text-xl">+</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center mt-6">
                  <div className="flex justify-center mt-6 md:hidden">
                    <motion.button
                      className="px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-md"
                      style={{
                        backgroundColor: "var(--primary-color)",
                        color: "white",
                        boxShadow: `0 10px 15px -3px ${
                          theme === "dark"
                            ? "rgba(139, 92, 246, 0.3)"
                            : "rgba(139, 92, 246, 0.2)"
                        }`,
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCloseModal}
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer position="bottom-right" theme={theme} />
    </div>
  );
};
