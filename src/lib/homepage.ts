import type { CollectionEntry } from 'astro:content';
import vehicles from '../data/vehicles.json';
import routes from '../data/routes.json';
import services from '../data/services.json';
import siteImages from '../data/site-images.json';

export interface ExploreCardData {
  title: string;
  href: string;
  description: string;
  eyebrow: string;
  image?: { src: string; alt: string; label: string };
  meta?: string[];
  price?: { value: string; context: string };
}
export interface HomeSection {
  id: string;
  navLabel: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  items: ExploreCardData[];
}

// Curated selections keep the homepage short. Full inventories live in each hub.
export const homeFeatured = {
  vehicles: ['16-seater-van', '7-seater-car', '45-seater-coach'],
  routes: ['hanoi-to-halong-bay', 'hanoi-to-sapa', 'hanoi-to-ninh-binh'],
  services: ['hanoi-airport-transfer', 'car-rental-with-driver', 'private-bus-charter'],
  articles: ['choosing-your-vehicle', 'transfer-or-day-hire'],
};

function select<T extends { slug: string }>(items: T[], slugs: string[]): T[] {
  return slugs.map(slug => {
    const item = items.find(item => item.slug === slug);
    if (!item) throw new Error(`Unknown homepage selection: ${slug}`);
    return item;
  });
}

export function homepageSections(articles: CollectionEntry<'articles'>[]): HomeSection[] {
  return [
    {
      id: 'vehicles', navLabel: 'Vehicles', title: 'Find a vehicle for your group',
      description: 'A few fleet favourites, from family trips to larger groups.',
      href: '/vehicles/', linkLabel: 'View all vehicles',
      items: select(vehicles, homeFeatured.vehicles).map(vehicle => ({
        title: vehicle.shortTitle, href: `/vehicles/${vehicle.slug}/`, eyebrow: vehicle.badge,
        description: vehicle.suitability,
        image: { src: vehicle.image, alt: vehicle.imageAlt, label: vehicle.shortTitle },
        meta: [vehicle.capacity, vehicle.luggage],
        price: { value: vehicle.sampleRates[0].price, context: vehicle.sampleRates[0].route },
      })),
    },
    {
      id: 'destinations', navLabel: 'Destinations', title: 'Where would you like to go?',
      description: 'Explore popular journeys from Hanoi and plan your next stop.',
      href: '/routes/', linkLabel: 'View all routes',
      items: select(routes, homeFeatured.routes).map(route => {
        const rate = route.pricing.find(rate => rate.oneWay !== 'N/A');
        return {
          title: route.name, href: `/routes/${route.slug}/`, eyebrow: 'From Hanoi',
          description: route.description,
          image: { src: route.image, alt: route.imageAlt, label: route.name },
          meta: [route.distance, route.duration],
          price: rate ? { value: rate.oneWay, context: `${rate.vehicle} · one-way` } : undefined,
        };
      }),
    },
    {
      id: 'services', navLabel: 'Services', title: 'A service to suit your plans',
      description: 'Airport pickups, a driver for the day or transport for your whole group.',
      href: '/services/', linkLabel: 'View all services',
      items: select(services, homeFeatured.services).map(service => ({
        title: service.title, href: `/services/${service.slug}/`, eyebrow: 'Private transport',
        description: service.subtitle,
        image: { src: service.image, alt: service.imageAlt, label: service.title },
      })),
    },
    {
      id: 'travel-guide', navLabel: 'Travel guide', title: 'A little planning goes a long way',
      description: 'Useful reading to help you choose and book with confidence.',
      href: '/resources/', linkLabel: 'Explore Guide & Help',
      items: homeFeatured.articles.map(id => {
        const article = articles.find(article => article.id === id);
        if (!article) throw new Error(`Unknown homepage article: ${id}`);
        return {
          title: article.data.title, href: `/resources/${article.id}/`,
          eyebrow: article.data.category, description: article.data.description,
          image: { src: article.data.image, alt: article.data.imageAlt, label: article.data.title },
        };
      }),
    },
    {
      id: 'help', navLabel: 'Help & policies', title: 'Good to know before you book',
      description: 'Answers, booking information and a closer look at the team behind your trip.',
      href: '/contact/', linkLabel: 'Contact our team',
      items: [
        { title: 'Your questions, answered', href: '/resources/faq/', eyebrow: 'FAQ', description: 'Quick answers about vehicles, luggage, pickups and booking changes.', meta: ['Quotes & booking', 'Pickup & your journey'] },
        { title: 'Policies & booking information', href: '/resources/policies/', eyebrow: 'Before confirming', description: 'Find information about payments, cancellations, changes and privacy.', meta: ['Booking & payment', 'Cancellations & changes'] },
        { title: 'Meet your Hanoi transport team', href: '/about-us/', eyebrow: 'About us', description: 'Learn about our drivers, fleet and dispatch team.', image: { src: siteImages.homeFleet, alt: 'Our private car and bus fleet in Hanoi', label: 'Fleet & dispatch team' } },
        { title: 'Let’s plan your journey', href: '/contact/', eyebrow: 'Contact & support', description: 'Have a custom itinerary or a question about your trip? Send the details to our team.', meta: ['Custom itineraries', 'Group travel'] },
      ],
    },
  ];
}
