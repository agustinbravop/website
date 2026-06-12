import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import WorkSection from "./components/WorkSection";
import EducationSection from "./components/EducationSection";
import ProjectsSection from "./components/ProjectsSection";
import StackSection from "./components/StackSection";
import ContactSection from "./components/ContactSection";

function App() {
  return (
    <main className="max-w-160 mx-auto lg:ml-[25%] lg:mr-auto px-6 pt-12 sm:pt-20">
      <HeroSection />
      <AboutSection />
      <WorkSection />
      <StackSection />
      <EducationSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}

export default App;
