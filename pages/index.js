import Head from 'next/head';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection, { TechMarquee } from '../components/SkillsSection';
import ExperienceSection from '../components/ExperienceSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import { getPortfolioData } from '../lib/portfolioData';

export default function Home({ initialData }) {
  const [data, setData] = useState(initialData);

  // Re-fetch on client for any admin edits
  useEffect(() => {
    fetch('/api/portfolio')
      .then(r => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  const pageTitle = `${data.hero.name} | ${data.hero.title}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={data.hero.subtitle} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index,follow" />
        <meta name="theme-color" content="#07080c" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={data.hero.subtitle} />
        <meta property="og:image" content="/avatar.png" />
        <link rel="icon" href="/avatar.png" />
      </Head>

      <div className="page-bg" aria-hidden="true">
        <div className="page-bg-grid" />
        <div className="page-bg-orb page-bg-orb--a" />
        <div className="page-bg-orb page-bg-orb--b" />
      </div>

      <Navbar name={data.hero.name} />

      <main>
        <HeroSection data={data.hero} stats={data.about.stats} />
        <TechMarquee skills={data.skills} />
        <AboutSection data={data.about} hero={data.hero} experience={data.experience} />
        <ExperienceSection data={data.experience} />
        <ProjectsSection data={data.projects} />
        <SkillsSection data={data.skills} />
        <ContactSection achievementsData={data.achievements} heroData={data.hero} />
      </main>

      <footer className="footer">
        <div className="wrap footer-inner">
          <span>© {new Date().getFullYear()} {data.hero.name}</span>
          <span className="footer-note mono">Made in {data.hero.location?.split(',')[0] || 'Islamabad'} with Next.js and Three.js</span>
          <a href="#top" className="footer-top">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}

export async function getServerSideProps() {
  const data = getPortfolioData();
  return { props: { initialData: data } };
}
