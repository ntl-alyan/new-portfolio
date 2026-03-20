import { getPortfolioData, updatePortfolioData, updateProjectData, updateExperienceData } from '../../lib/portfolioData';

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(getPortfolioData());
  }

  if (req.method === 'POST') {
    const { section, data, type, id } = req.body;

    if (!section) {
      return res.status(400).json({ error: 'section is required' });
    }

    let updated;

    if (type === 'project') {
      updated = updateProjectData(id, data);
    } else if (type === 'experience') {
      updated = updateExperienceData(id, data);
    } else {
      updated = updatePortfolioData(section, data);
    }

    return res.status(200).json({ success: true, data: updated });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
