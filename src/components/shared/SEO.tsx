import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
  noIndex?: boolean
  structuredData?: object
}

export function generateSEOMetadata({
  title = 'DevMaker3D - Impressão 3D com rigor de engenharia e alma de artista',
  description = 'Transformamos ideias em realidade com impressão 3D de alta qualidade. Especialistas em prototipagem, peças funcionais e decorativas em Itaperuna/RJ.',
  keywords = [
    'impressão 3D',
    'prototipagem',
    'Itaperuna',
    'RJ',
    '3D printing',
    'peças funcionais',
    'prototipagem rápida',
    'modelagem 3D',
    'pós-processamento',
    'PLA',
    'PETG',
    'resina',
    'engenharia',
    'design',
    'fabricação digital',
    'maker',
    'impressora 3D',
    'serviços 3D',
    'Itaperuna RJ',
    'Norte Fluminense',
  ],
  ogImage = '/og-image.jpg',
  noIndex = false,
  structuredData,
}: SEOProps = {}): Metadata {
  const siteName = 'DevMaker3D'
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devmaker3d.com.br'
  
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`
  
  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: 'Adriano Lengruber', url: 'https://linkedin.com/in/adrianolengruber' }],
    creator: 'DevMaker3D',
    publisher: 'DevMaker3D',
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      siteName,
      title: fullTitle,
      description,
      url: siteUrl,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: 'DevMaker3D - Impressão 3D',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@devmaker3d',
    },
    alternates: {
      canonical: siteUrl,
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code',
    },
    other: {
      'structured-data': JSON.stringify(structuredData),
    },
  }
}

// Structured data for local business
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'DevMaker3D',
  description: 'Impressão 3D com rigor de engenharia e alma de artista em Itaperuna/RJ',
  url: 'https://devmaker3d.com.br',
  telephone: '+5522999999999',
  email: 'contato@devmaker3d.com.br',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua Principal, 123',
    addressLocality: 'Itaperuna',
    addressRegion: 'RJ',
    postalCode: '28300-000',
    addressCountry: 'BR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -21.2058,
    longitude: -41.8875,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Saturday',
      opens: '08:00',
      closes: '12:00',
    },
  ],
  priceRange: '$$',
  servesCuisine: 'Serviços de impressão 3D',
  acceptsReservations: true,
}

// Structured data for services
export const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'Service',
      name: 'Prototipagem Rápida',
      description: 'Prototipagem funcional para validação de projetos',
    },
    {
      '@type': 'Service',
      name: 'Peças Funcionais',
      description: 'Peças técnicas com alta resistência e precisão',
    },
    {
      '@type': 'Service',
      name: 'Peças Decorativas',
      description: 'Peças artísticas com acabamento premium',
    },
    {
      '@type': 'Service',
      name: 'Modelagem 3D',
      description: 'Criação de modelos 3D personalizados',
    },
    {
      '@type': 'Service',
      name: 'Pós-processamento',
      description: 'Acabamento profissional com lixamento, pintura e polimento',
    },
  ],
}

// Structured data for materials
export const materialsSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: [
    {
      '@type': 'Product',
      name: 'PLA',
      description: 'Biodegradável, fácil de usar, perfeito para validações visuais',
    },
    {
      '@type': 'Product',
      name: 'PETG',
      description: 'Resiste ao calor e impactos, equilíbrio perfeito',
    },
    {
      '@type': 'Product',
      name: 'TPU',
      description: 'Flexível e resistente, ideal para peças que precisam de elasticidade',
    },
    {
      '@type': 'Product',
      name: 'Resina',
      description: 'Altíssimo nível de detalhe, superfície perfeita',
    },
  ],
}