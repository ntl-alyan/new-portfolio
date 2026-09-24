// lib/portfolioData.js
// Default portfolio data - in a real app this would be in a DB
// For this demo, we use localStorage on the client and a module-level store for API

let portfolioData = {
  hero: {
    name: "Alyan Quddoos",
    title: "Assistant Manager, Software Engineering",
    company: "Nayatel",
    subtitle:
      "I build and look after the software Nayatel runs on every day: our CRM, the billing system and the customer portal. Most of it is Next.js, NestJS and PostgreSQL.",
    email: "alyanquddoos111@gmail.com",
    phone: "+92 3144441061",
    location: "Islamabad, Pakistan",
    linkedin: "https://linkedin.com/in/alyanquddoos111",
    github: "https://github.com/ntl-alyan",
  },
  about: {
    bio: "I've been writing software professionally for a little over three years, all of it at Nayatel. I started as a software engineer working on both the frontend and the backend. These days I also help lead the team, but I still write plenty of code myself. I care most about the unglamorous things that make software easy to live with: readable code, APIs you can trust, and deployments nobody has to worry about.",
    university: "Air University Islamabad",
    degree: "Bachelors in Computer Science",
    stats: [
      { value: "3+", label: "Years writing production code" },
      { value: "3", label: "Core platforms I work on" },
      { value: "Fast-track", label: "Promoted ahead of schedule" },
    ],
  },
  skills: {
    languages: ["JavaScript", "TypeScript", "SQL", "HTML", "CSS", "YAML", "NodeJS"],
    frameworks: ["React.js", "Next.js", "NestJS", "Bootstrap", "PostgreSQL", "Oracle"],
    tools: ["Jenkins", "Ansible", "Kong API Gateway", "CI/CD Pipelines", "HMAC Auth"],
    leadership: ["Team Leadership", "Code Review", "System Design", "Sprint Planning", "Mentoring", "Project Management"],
  },
  experience: [
    {
      id: 1,
      company: "Nayatel Pvt. Ltd.",
      role: "Assistant Manager, Software Engineering",
      period: "June 2023 – Present",
      location: "Islamabad",
      progression: ["Software Engineer", "Assistant Manager"],
      points: [
        "I lead work on the CRM, Billing and Customer Portal, from the first planning conversations through to release.",
        "I review code, help newer engineers find their feet, and set the standards we follow for APIs, UI components and deployments.",
        "I build the CRM end to end, with Next.js on the frontend and NestJS on the backend, and I keep it fast as it grows.",
        "I run our services behind Kong API Gateway, which handles routing, rate limits, authentication and logging in one place.",
        "I wrote the Jenkins and Ansible pipelines we use to deploy code, set up environments and manage configuration.",
        "I lock down our APIs with HMAC request signing, input sanitization and strict validation, so requests can't be tampered with or used for injection attacks.",
      ],
    },
  ],
  projects: [
    {
      id: 1,
      name: "Nayatel CRM",
      category: "Internal CRM",
      description: "The CRM our teams use to manage customers every day. I built it with Next.js and NestJS, using server-side rendering where it helps and a shared set of components, so new screens come together quickly. Internal services talk to it through Kong, and every request is signed and validated.",
      tech: ["Next.js", "NestJS", "Kong API Gateway", "PostgreSQL", "HMAC"],
      color: "#5eead4",
    },
    {
      id: 2,
      name: "Nayatel Billing",
      category: "Billing",
      description: "Billing had become slow and awkward to use, so we reworked large parts of it. Service changes and payment steps that used to be done by hand now run on their own, and login and permissions go through the API gateway so they work the same way everywhere.",
      tech: ["Next.js", "NestJS", "Jenkins", "Ansible", "PostgreSQL"],
      color: "#a5b4fc",
    },
    {
      id: 3,
      name: "Customer Portal",
      category: "Self-service",
      description: "Where customers sign up, pay and change their plans without calling anyone. I automated the whole sign-up flow, connected the payment gateway, and made upgrades and downgrades self-service, which took a lot of routine work off our staff.",
      tech: ["Next.js", "NestJS", "Payment Gateway", "REST APIs"],
      color: "#fcd34d",
    },
  ],
  achievements: [
    "Fast-track promotions: Promoted at each level after hitting my targets",
    "Google Project Management: Certificate covering project management and costing",
    "Software Architecture and Clean Code Design in OOP: Course on designing object-oriented code that stays easy to change",
    "3rd place at Visio Spark: A code debugging competition with 20 teams",
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
