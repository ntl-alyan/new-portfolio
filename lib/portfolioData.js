// lib/portfolioData.js
// All portfolio content lives here. Edit this file and redeploy to update the site.

const portfolioData = {
  hero: {
    name: "Alyan Quddoos",
    title: "Assistant Manager, Software Engineering",
    company: "Nayatel",
    subtitle:
      "Leading the development of Nayatel's core business platforms, including CRM, Billing and the Customer Portal, delivering secure and scalable systems with Next.js, NestJS and PostgreSQL.",
    email: "alyanquddoos111@gmail.com",
    phone: "+92 3144441061",
    location: "Islamabad, Pakistan",
    linkedin: "https://linkedin.com/in/alyanquddoos111",
    github: "https://github.com/ntl-alyan",
  },
  about: {
    bio: "Software engineering professional with over three years of experience delivering production systems at Nayatel. I began my career as a Software Engineer working across the full stack and now serve as Assistant Manager, combining hands-on development with technical leadership. My focus is on building software that is secure, maintainable and dependable, supported by clear engineering standards and automated delivery.",
    university: "Air University Islamabad",
    degree: "Bachelors in Computer Science",
    stats: [
      { value: "3+", label: "Years of professional experience" },
      { value: "3", label: "Enterprise platforms delivered" },
      { value: "Fast-track", label: "Accelerated promotions" },
    ],
  },
  skills: {
    languages: [
      "JavaScript",
      "TypeScript",
      "SQL",
      "HTML",
      "CSS",
      "YAML",
      "NodeJS",
    ],
    frameworks: [
      "React.js",
      "Next.js",
      "NestJS",
      "Bootstrap",
      "PostgreSQL",
      "Oracle",
    ],
    tools: [
      "Jenkins",
      "Ansible",
      "Kong API Gateway",
      "CI/CD Pipelines",
      "HMAC Auth",
    ],
    leadership: [
      "Team Leadership",
      "Code Review",
      "System Design",
      "Sprint Planning",
      "Mentoring",
      "Project Management",
    ],
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
        "Lead end-to-end delivery of Nayatel's core business platforms (CRM, Billing and the Customer Portal), from planning and architecture through to release.",
        "Mentor engineers, conduct code reviews and define team standards for API security, reusable UI components and deployment practices.",
        "Develop end-to-end CRM solutions using Next.js and NestJS, ensuring a scalable, high-performance application architecture.",
        "Integrate and orchestrate backend services through Kong API Gateway, covering routing, rate limiting, authentication and centralized logging.",
        "Build CI/CD pipelines in Jenkins with Ansible for automated deployments, environment provisioning and configuration management.",
        "Secure APIs through HMAC request signing, payload sanitization and strict input validation to protect services against tampering and injection attacks.",
      ],
    },
  ],
  projects: [
    {
      id: 1,
      name: "Nayatel CRM",
      category: "Enterprise CRM",
      description:
        "A scalable CRM built with Next.js and NestJS, featuring server-side rendering, a reusable component library and real-time workflows. Internal services are integrated through Kong API Gateway for centralized routing and authentication, with HMAC request signing and strict validation securing every request.",
      tech: ["Next.js", "NestJS", "Kong API Gateway", "PostgreSQL", "HMAC"],
      color: "#5eead4",
    },
    {
      id: 2,
      name: "Nayatel Billing",
      category: "Billing Platform",
      description:
        "Modernized the billing ecosystem to improve speed, usability and operational reliability. Automated service management and payment workflows to reduce manual effort, and integrated the platform with the API gateway for unified authentication and authorization.",
      tech: ["Next.js", "NestJS", "Jenkins", "Ansible", "PostgreSQL"],
      color: "#a5b4fc",
    },
    {
      id: 3,
      name: "Customer Portal",
      category: "Self-Service Portal",
      description:
        "Automated end-to-end self sign-up journeys to streamline customer onboarding and reduce operational overhead. Integrated payment gateway APIs for secure digital payments and enabled self-service plan subscriptions, upgrades and downgrades.",
      tech: ["Next.js", "NestJS", "Payment Gateway", "REST APIs"],
      color: "#fcd34d",
    },
  ],
  achievements: [
    "Fast-track promotions: Promoted at each level upon achieving performance targets",
    "Google Project Management: Professional certificate in project management and costing",
    "Software Architecture and Clean Code Design in OOP: Certification in object-oriented design and maintainable architecture",
    "3rd place, Visio Spark: Code debugging competition among 20 teams",
  ],
};

export function getPortfolioData() {
  return portfolioData;
}
