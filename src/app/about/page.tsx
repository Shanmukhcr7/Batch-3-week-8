import { Metadata } from "next";
import { AboutContent } from "@/components/about/AboutContent";
import { ContactSection } from "@/components/contact/ContactSection";

export const metadata: Metadata = {
  title: "About Shanmukh Veerepalli",
  description:
    "Learn about Shanmukh Veerepalli, AI Creator, Creative Developer, and Digital Filmmaker exploring AI filmmaking, software engineering, and digital productions.",
};

export default function AboutPage() {
  return (
    <div className="pt-24">
      <AboutContent />
      <ContactSection />
    </div>
  );
}
