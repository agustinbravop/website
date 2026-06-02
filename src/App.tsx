import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import StackSection from "./components/StackSection";
import ContactSection from "./components/ContactSection";

function App() {
  return (
    <main className="max-w-160 mx-auto lg:ml-[25%] lg:mr-auto px-6 pt-20">
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <StackSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}

export default App;
