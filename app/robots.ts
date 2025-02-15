import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/api/', '/admin/'],
    },
    sitemap: 'https://myproposal.love/sitemap.xml',
    host: 'https://myproposal.love',
  }
}
