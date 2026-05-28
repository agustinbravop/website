import AmbientGlow from "./components/AmbientGlow";
import MorphingGeometry from "./components/MorphingGeometry";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import StackSection from "./components/StackSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";

function App() {
  return (
    <div className="relative bg-[#0a0a0a] text-white font-sans">
      <AmbientGlow />
      <MorphingGeometry />
      <div className="relative z-10">
        <NavBar />
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <StackSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </div>
  );
}

export default App;
