import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import { getPortfolioData } from '../lib/portfolioData';

const ThreeBackground = dynamic(() => import('../components/ThreeBackground'), { ssr: false });

export default function Home({ initialData }) {
  const [data, setData] = useState(initialData);

  // Re-fetch on client for any admin edits
  useEffect(() => {
    fetch('/api/portfolio')
      .then(r => r.json())
      .then(setData);
  }, []);

  return (
    <>
      <Head>
        <title>{data.hero.name} — Full Stack Developer</title>
        <meta name="description" content={data.hero.subtitle} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index,follow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <ThreeBackground />
      <Navbar />

      <main>
        <HeroSection data={data.hero} />
        <AboutSection data={data.about} />
        <SkillsSection data={data.skills} />
        <ExperienceSection data={data.experience} />
        <ProjectsSection data={data.projects} />
        <ContactSection achievementsData={data.achievements} heroData={data.hero} />
      </main>

      <footer className="portfolio-footer">
        <div className="container">
          <span className="mono">
            © {new Date().getFullYear()} {data.hero.name} · Built with Next.js & Three.js
          </span>
        </div>
      </footer>
    </>
  );
}

export async function getServerSideProps() {
  const data = getPortfolioData();
  return { props: { initialData: data } };
}
