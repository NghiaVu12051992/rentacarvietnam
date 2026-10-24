import vehicles from '../data/vehicles.json';
import routes from '../data/routes.json';
import services from '../data/services.json';

export interface DetailImage { src: string; alt: string; label: string; isAi?: boolean; aspect?: 'photo' | 'portrait' | 'square' | 'video' }
export interface PriceRow { label: string; values: { label?: string; value: string; accent?: boolean }[] }
interface SectionBase { title: string; note?: string }
export type DetailSection = SectionBase & (
  | { type: 'specs'; items: { label: string; value: string; full?: boolean }[] }
  | { type: 'features'; items: string[] }
  | { type: 'prices'; rows: PriceRow[] }
  | { type: 'journey'; steps: { label: string; text: string }[] }
  | { type: 'inclusions'; groups: { title: string; items: string[] }[] }
  | { type: 'faqs'; items: { question: string; answer: string }[] }
);
export interface DetailPageData {
  title: string;
  metaDescription: string;
  description: string;
  breadcrumbs: { label: string; href?: string }[];
  badges: string[];
  subtitle?: string;
  models?: string;
  image: DetailImage;
  gallery?: DetailImage[];
  sections: DetailSection[];
  booking: { defaultVehicle?: string; defaultDestination?: string };
  jsonLd?: Record<string, any>[];
}

export function vehicleDetail(vehicle: (typeof vehicles)[number]): DetailPageData {
  return {
    title: vehicle.title,
    metaDescription: `${vehicle.description} Capacity: ${vehicle.capacity}. Luggage: ${vehicle.luggage}. Transparent rates, all-inclusive pricing.`,
    description: vehicle.description,
    breadcrumbs: [{ label: 'Vehicles', href: '/vehicles/' }, { label: vehicle.shortTitle }],
    badges: [vehicle.badge],
    models: vehicle.models,
    image: { src: vehicle.image, alt: vehicle.imageAlt, label: `${vehicle.shortTitle} - exterior` },
    gallery: [
      ...(vehicle.interiorImage ? [{ src: vehicle.interiorImage, alt: `${vehicle.shortTitle} seating and interior`, label: 'Seating & interior', aspect: 'portrait' as const }] : []),
      ...(vehicle.luggageImage ? [{ src: vehicle.luggageImage, alt: `${vehicle.shortTitle} luggage compartment`, label: 'Luggage space', aspect: 'portrait' as const }] : []),
      ...(((vehicle as any).gallery || []) as DetailImage[]),
    ].filter(item => Boolean(item.src)),
    sections: [
      { type: 'specs', title: 'Vehicle Capacity & Specifications', items: [
        { label: 'Passenger Capacity', value: vehicle.capacity },
        { label: 'Luggage Space', value: vehicle.luggage },
        { label: 'Recommended Trip Style', value: vehicle.suitability, full: true },
      ] },
      { type: 'features', title: 'Key Features & Amenities', items: vehicle.features },
      { type: 'prices', title: 'Popular Routes & Fixed Rates', note: 'All rates include driver salary, fuel, and expressway highway toll fees.',
        rows: vehicle.sampleRates.map(rate => ({ label: rate.route, values: [{ value: rate.price }] })) },
    ],
    booking: { defaultVehicle: vehicle.title },
  };
}

export function routeDetail(route: (typeof routes)[number]): DetailPageData {
  const customSections = (route as any).sections as DetailSection[] | undefined;
  const sections = customSections || [
    { type: 'journey', title: 'Journey Details & Key Highlights', steps: [
      { label: 'Departure', text: 'Door-to-door pickup from your hotel in Hanoi Old Quarter, West Lake, or Noi Bai Airport.' },
      { label: 'En Route', text: `Smooth travel via modern expressway (${route.highway}). Rest stop available on request.` },
      { label: 'Arrival', text: 'Direct drop-off at your destination hotel lobby, cruise port, or attraction gate.' },
    ] },
    { type: 'prices', title: 'Transparent Vehicle Rates for this Route', note: 'All rates include toll fees, fuel, driver wage, and passenger insurance.',
      rows: route.pricing.map(rate => ({ label: rate.vehicle, values: [
        { label: 'One-Way', value: rate.oneWay },
        ...(rate.roundTrip !== 'N/A' ? [{ label: 'Round-Trip', value: rate.roundTrip, accent: true }] : []),
      ] })) },
    { type: 'inclusions', title: 'What is Included?', groups: [
      { title: 'Included in Price', items: [
        'Highway expressway toll fees', 'Fuel, parking, and airport entrance', 'Licensed professional driver',
        'Bottled drinking water & cold towels', '24/7 bilingual dispatch assistance',
      ] },
      { title: 'Not Included', items: [
        'Personal entrance attraction tickets', 'Meals, beverages, and hotel accommodation', 'Driver gratuity / tipping (discretionary)',
      ] },
    ] },
  ];

  // Extract FAQs for Schema.org JSON-LD
  const faqSection = sections.find(s => s.type === 'faqs') as { type: 'faqs'; items: { question: string; answer: string }[] } | undefined;
  const jsonLd: Record<string, any>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://rentacarvietnam.com/' },
        { '@type': 'ListItem', 'position': 2, 'name': 'Routes', 'item': 'https://rentacarvietnam.com/routes/' },
        { '@type': 'ListItem', 'position': 3, 'name': route.name, 'item': `https://rentacarvietnam.com/routes/${route.slug}/` }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'TouristTrip',
      'name': route.name,
      'description': route.description,
      'touristType': ['International Travelers', 'Families', 'Couples', 'Business Travelers'],
      'provider': {
        '@type': 'LocalBusiness',
        'name': 'Hanoi Car & Bus Rental',
        'url': 'https://rentacarvietnam.com'
      },
      'offers': route.pricing.map(p => {
        const numPrice = p.oneWay.replace(/[^0-9]/g, '') || p.roundTrip.replace(/[^0-9]/g, '') || undefined;
        return {
          '@type': 'Offer',
          'name': `${p.vehicle} - ${route.name}`,
          ...(numPrice ? { 'price': numPrice, 'priceCurrency': 'USD' } : {}),
          'availability': 'https://schema.org/InStock',
          'validFrom': '2025-01-01'
        };
      })

    }
  ];

  if (faqSection && faqSection.items.length > 0) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqSection.items.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    });
  }

  return {
    title: route.name,
    metaDescription: `${route.description} Distance: ${route.distance}, approx ${route.duration}. Transparent private transfer with toll fees and driver included.`,
    description: route.description,
    breadcrumbs: [{ label: 'Routes', href: '/routes/' }, { label: route.name }],
    badges: [route.distance, route.duration, route.highway],
    image: { src: route.image, alt: route.imageAlt, label: route.name, isAi: Boolean((route as any).isAi) },
    gallery: (((route as any).gallery || []) as DetailImage[]),
    sections,
    booking: { defaultDestination: route.name },
    jsonLd,
  };
}

export function serviceDetail(service: (typeof services)[number]): DetailPageData {
  // One mapping for the rate fields already displayed by the service pages.
  const rateLabels = {
    airportToCity: 'Airport to City:', cityToAirport: 'City to Airport:',
    cityTour8h: 'City Tour (8h / 100km):', suburb200km: 'Suburbs (200km):',
    golfDayTour: 'Course Round-Trip:', dailyRate: 'Outer Provinces / Full Day:',
  } as const;
  return {
    title: service.title,
    metaDescription: `${service.subtitle}. ${service.description} Dedicated professional drivers, all-inclusive transparent rates.`,
    description: service.description,
    breadcrumbs: [{ label: 'Services', href: '/services/' }, { label: service.title }],
    badges: ['CHAUFFEUR SERVICE'],
    subtitle: service.subtitle,
    image: { src: service.image, alt: service.imageAlt, label: service.title },
    sections: [
      { type: 'features', title: 'Service Commitments & Standards', items: service.features },
      { type: 'prices', title: 'Transparent Pricing Table (No Hidden Surcharges)',
        rows: service.pricing.map(rate => ({ label: rate.vehicle, values: Object.entries(rateLabels).flatMap(([key, label]) => {
          const value = (rate as Record<string, string>)[key];
          return value ? [{ label, value }] : [];
        }) })) },
    ],
    booking: { defaultDestination: service.title },
  };
}
