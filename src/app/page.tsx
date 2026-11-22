import { Hero } from "@/components/hero/Hero";
import { FeaturedProjects } from "@/components/projects/FeaturedProjects";
import { CreativeExpertise } from "@/components/home/CreativeExpertise";
import { TechStack } from "@/components/home/TechStack";
import { ContactSection } from "@/components/contact/ContactSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <CreativeExpertise />
      <TechStack />
      <ContactSection />
    </>
  );
}
