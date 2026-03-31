// lib/portfolioData.js
// Default portfolio data - in a real app this would be in a DB
// For this demo, we use localStorage on the client and a module-level store for API

let portfolioData = {
  hero: {
    name: "Alyan Quddoos",
    title: "Full Stack Developer",
    subtitle: "Crafting scalable systems with Next.js · NestJS · PostgreSQL",
    email: "alyanquddoos111@gmail.com",
    phone: "+92 3144441061",
  },
  about: {
    bio: "I'm a passionate Full Stack Developer with hands-on experience developing end-to-end solutions covering everything from responsive, high-performance frontends in Next.js to reliable, secure backends integrating NestJS. I enjoy collaborating at the crossover of excellent engineering and user experience, developing products that can be considered both technically efficient yet easy to use.",
    university: "Air University Islamabad",
    degree: "Bachelors in Computer Science",
  },
  skills: {
    languages: ["JavaScript", "TypeScript", "SQL", "HTML", "CSS", "YAML", "NodeJS"],
    frameworks: ["React.js", "Next.js", "NestJS", "Bootstrap", "PostgreSQL", "Oracle"],
    tools: ["Jenkins", "Ansible", "Kong API Gateway", "CI/CD Pipelines", "HMAC Auth"],
  },
  experience: [
    {
      id: 1,
      company: "Nayatel Pvt. Ltd.",
      role: "Software Engineer",
      period: "June 2023 – Present",
      points: [
        "Developing end-to-end CRM solutions using Next.js (frontend) and NestJS (backend), ensuring scalable, high-performance application architecture.",
        "Designing and implementing responsive, user-friendly interfaces in Next.js with reusable and maintainable React component structures.",
        "Integrating and orchestrating backend services through Kong API Gateway, including routing, rate limiting, authentication plugins, and central logging.",
        "Implementing CI/CD pipelines in Jenkins using Ansible scripts for automated deployments, environment provisioning, and configuration management.",
        "Developing secure APIs by applying HMAC-based request signing, payload sanitization, and strict validation to protect services from tampering and injection attacks.",
      ],
    },
  ],
  projects: [
    {
      id: 1,
      name: "Nayatel CRM",
      description: "Built a scalable CRM using Next.js and NestJS, implementing SSR/SSG, reusable UI components, and real-time workflows. Integrated internal services through the Kong API Gateway for centralized routing and authentication. Enhanced security with HMAC request signing, sanitization, and strict validation.",
      tech: ["Next.js", "NestJS", "Kong API Gateway", "PostgreSQL", "HMAC"],
      color: "#00d4ff",
    },
    {
      id: 2,
      name: "Nayatel Billing",
      description: "Optimized and modernized the Billing ecosystem to enhance speed, usability, and operational reliability. Automated service management and payment workflows to reduce manual effort. Integrated the platform with API gateways for unified authorization and authentication.",
      tech: ["Next.js", "NestJS", "Jenkins", "Ansible", "PostgreSQL"],
      color: "#7c3aed",
    },
    {
      id: 3,
      name: "Customer Portal",
      description: "Automated end-to-end self sign-up journeys to improve user onboarding and reduce operational overhead. Integrated payment gateway APIs to ensure secure and seamless digital payments. Streamlined workflows for self-service plan subscription, upgrades, and downgrades.",
      tech: ["Next.js", "NestJS", "Payment Gateway", "REST APIs"],
      color: "#10b981",
    },
  ],
  achievements: [
    "Fast Track Promotions: Promotions on successfully completing targets for each designation",
    "Google Project Management: Project Management and Costing",
    "Software Architecture and Clean Code Design in OOP",
    "3rd Place in Visio Spark: Secured a top position in Code Debugging Competition among 20 teams",
  ],
};

export function getPortfolioData() {
  return portfolioData;
}

export function updatePortfolioData(section, data) {
  // Arrays (e.g. achievements) must be assigned directly, not spread-merged
  if (Array.isArray(data)) {
    portfolioData[section] = data;
  } else {
    portfolioData[section] = { ...portfolioData[section], ...data };
  }
  return portfolioData;
}

export function updateProjectData(id, data) {
  portfolioData.projects = portfolioData.projects.map(p =>
    p.id === id ? { ...p, ...data } : p
  );
  return portfolioData;
}

export function updateExperienceData(id, data) {
  portfolioData.experience = portfolioData.experience.map(e =>
    e.id === id ? { ...e, ...data } : e
  );
  return portfolioData;
}
