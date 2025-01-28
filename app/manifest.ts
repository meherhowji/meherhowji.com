import type { MetadataRoute } from 'next'
// TODO: certain sizes are missing but for now they are good until rest of the app is live. Low Priority
// Ref: https://nextjs.org/docs/app/api-reference/file-conventions/metadata

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Meher Howji',
    short_name: 'Meher Howji',
    description:
      "I am Meher. I'm a YouTuber, Udemy Trainer & a technologist. On this site I share courses and articles that will help you build web apps with a deeper insight into web technologies.",
    orientation: 'portrait',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        sizes: '192x192',
        src: '/favicons/android-icon-192x192.png',
        type: 'image/png',
      },
      {
        sizes: '57x57',
        src: '/favicons/apple-icon-57x57.png',
        type: 'image/png',
      },
      {
        sizes: '60x60',
        src: '/favicons/apple-icon-60x60.png',
        type: 'image/png',
      },
      {
        sizes: '72x72',
        src: '/favicons/apple-icon-72x72.png',
        type: 'image/png',
      },
      {
        sizes: '76x76',
        src: '/favicons/apple-icon-76x76.png',
        type: 'image/png',
      },
      {
        sizes: '114x114',
        src: '/favicons/apple-icon-114x114.png',
        type: 'image/png',
      },
      {
        sizes: '120x120',
        src: '/favicons/apple-icon-120x120.png',
        type: 'image/png',
      },
      {
        sizes: '144x144',
        src: '/favicons/apple-icon-144x144.png',
        type: 'image/png',
      },
      {
        sizes: '152x152',
        src: '/favicons/apple-icon-152x152.png',
        type: 'image/png',
      },
      {
        sizes: '180x180',
        src: '/favicons/apple-icon-180x180.png',
        type: 'image/png',
      },
      {
        sizes: '512x512',
        src: '/favicons/apple-icon-512x512.png',
        type: 'image/png',
      },
      {
        sizes: '16x16',
        src: '/favicons/favicon-16x16.png',
        type: 'image/png',
      },
      {
        sizes: '32x32',
        src: '/favicons/favicon-32x32.png',
        type: 'image/png',
      },
      {
        sizes: '96x96',
        src: '/favicons/favicon-96x96.png',
        type: 'image/png',
      },
      {
        sizes: 'any',
        src: '/favicons/safari-icon.svg',
      },
    ],
  }
}
