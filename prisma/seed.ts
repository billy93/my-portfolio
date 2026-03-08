import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaNeon } from "@prisma/adapter-neon";
import { hash } from "bcryptjs";
import * as dotenv from "dotenv";

dotenv.config();

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const passwordHash = await hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "billyfebram@gmail.com" },
    update: {},
    create: {
      email: "billyfebram@gmail.com",
      password: passwordHash,
      name: "Andreas Billy Sutandi",
      role: "ADMIN",
    },
  });
  console.log("Admin user created:", admin.email);

  // Create profile
  const profile = await prisma.profile.upsert({
    where: { id: "default-profile" },
    update: {},
    create: {
      id: "default-profile",
      name: "Andreas Billy Sutandi",
      title: "Fullstack Developer",
      bio: "Passionate fullstack developer with expertise in building modern web and mobile applications. Specializing in Next.js, React, React Native, and Java with a focus on clean code, scalable architecture, and exceptional user experiences.",
      email: "billyfebram@gmail.com",
      github: "https://github.com/billy93",
      linkedin: "",
      twitter: "",
    },
  });
  console.log("Profile created:", profile.name);

  // Create skills
  const skillsData = [
    { name: "React", category: "FRONTEND" as const, proficiency: 95, order: 1 },
    { name: "Next.js", category: "FRONTEND" as const, proficiency: 90, order: 2 },
    { name: "TypeScript", category: "FRONTEND" as const, proficiency: 90, order: 3 },
    { name: "Tailwind CSS", category: "FRONTEND" as const, proficiency: 85, order: 4 },
    { name: "HTML/CSS", category: "FRONTEND" as const, proficiency: 95, order: 5 },
    { name: "Java", category: "BACKEND" as const, proficiency: 90, order: 1 },
    { name: "Spring Boot", category: "BACKEND" as const, proficiency: 85, order: 2 },
    { name: "Node.js", category: "BACKEND" as const, proficiency: 85, order: 3 },
    { name: "PostgreSQL", category: "BACKEND" as const, proficiency: 80, order: 4 },
    { name: "REST API", category: "BACKEND" as const, proficiency: 90, order: 5 },
    { name: "React Native", category: "MOBILE" as const, proficiency: 85, order: 1 },
    { name: "Docker", category: "DEVOPS" as const, proficiency: 75, order: 1 },
    { name: "Git", category: "TOOLS" as const, proficiency: 90, order: 1 },
    { name: "VS Code", category: "TOOLS" as const, proficiency: 90, order: 2 },
  ];

  for (const skill of skillsData) {
    await prisma.skill.upsert({
      where: {
        id: `skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
      },
      update: { proficiency: skill.proficiency, order: skill.order },
      create: {
        id: `skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
        ...skill,
      },
    });
  }
  console.log(`${skillsData.length} skills created`);

  console.log("\nSeed completed!");
  console.log("Login credentials:");
  console.log("  Email: billyfebram@gmail.com");
  console.log("  Password: admin123");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
