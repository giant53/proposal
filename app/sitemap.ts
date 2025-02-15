import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://myproposal.love'
  
  const routes = [
    '',
    '/about',
    '/pricing',
    '/login',
    '/register',
    '/proposals',
    '/templates',
    '/blog',
    '/how-it-works',
    '/success-stories',
    '/valentine-proposals',
    '/romantic-proposals',
    '/ai-proposal-generator',
    '/proposal-ideas',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}
