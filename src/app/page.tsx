import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";
import { prisma } from "@/lib/prisma";

async function getData() {
  try {
    const [profile, projects, skills, experiences] = await Promise.all([
      prisma.profile.findFirst(),
      prisma.project.findMany({
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      }),
      prisma.skill.findMany({
        orderBy: [{ category: "asc" }, { order: "asc" }],
      }),
      prisma.experience.findMany({
        orderBy: [{ order: "asc" }, { startDate: "desc" }],
      }),
    ]);
    return { profile, projects, skills, experiences };
  } catch {
    return { profile: null, projects: [], skills: [], experiences: [] };
  }
}

export const dynamic = "force-dynamic";

export default async function Home() {
  const { profile, projects, skills, experiences } = await getData();

  return (
    <>
      <Navbar />
      <main>
        <HeroSection profile={profile} />
        <AboutSection profile={profile} />
        <SkillsSection skills={skills} />
        <ProjectsSection projects={projects} />
        <ExperienceSection
          experiences={experiences.map((exp: { id: string; company: string; role: string; description: string; startDate: Date; endDate: Date | null; current: boolean; order: number; createdAt: Date; updatedAt: Date }) => ({
            ...exp,
            startDate: exp.startDate.toISOString(),
            endDate: exp.endDate?.toISOString() || null,
          }))}
        />
        <ContactSection email={profile?.email || "billyfebram@gmail.com"} />
      </main>
      <Footer />
    </>
  );
}
