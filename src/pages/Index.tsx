import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import GitHubSection from '@/components/GitHubSection';
import FreelancerSection from '@/components/FreelancerSection';
import BlogSection from '@/components/BlogSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <GitHubSection />
        <FreelancerSection />
        <BlogSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
