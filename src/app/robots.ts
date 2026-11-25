import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/checkout/fail'],
      },
      {
        userAgent: 'Yeti',
        allow: '/',
      },
    ],
    sitemap: 'https://www.wooselect.com/sitemap.xml',
  };
}
