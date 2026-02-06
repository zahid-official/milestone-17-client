export type CoreListing = {
  slug: string;
  title: string;
  description: string;
  overview: string;
  image: string;
  type: string;
  status: string;
  price: string;
  date: string;
  location: string;
  keyInfo: { label: string; value: string }[];
  rules: string[];
  primaryAction: string;
  secondaryAction: string;
};

export const coreListings: CoreListing[] = [
  {
    slug: "city-center-commute",
    title: "City Center Commute Circle",
    description:
      "Weekday shared rides that sync with downtown start times and flexible pickup windows.",
    overview:
      "City Center Commute Circle pairs riders and drivers on the same core routes to keep pickups predictable and ride times short. It is best for teams working downtown who want consistent ETAs, verified matches, and flexible join times.",
    image: "/images/core-1.jpg",
    type: "Ride circle",
    status: "Open",
    price: "From $6 per ride",
    date: "Weekdays, 7-10am",
    location: "Downtown hub",
    keyInfo: [
      { label: "Pickup window", value: "7:00-7:20am" },
      { label: "Average ETA", value: "12-18 min" },
      { label: "Verification", value: "Driver + rider ID" },
      { label: "Best for", value: "Office commuters" },
    ],
    rules: [
      "Arrive within the pickup window to keep the route on time.",
      "Keep bags compact to preserve shared space.",
      "Respect quiet zones during early hours.",
    ],
    primaryAction: "Book a seat",
    secondaryAction: "Join the circle",
  },
  {
    slug: "airport-express-pool",
    title: "Airport Express Pool",
    description:
      "Shared airport rides with luggage-friendly vehicles and real-time flight tracking.",
    overview:
      "Airport Express Pool keeps your travel day smooth with verified drivers, room for luggage, and live ETA tracking tied to flight status. Ideal for early or late departures when you want a predictable pickup.",
    image: "/images/core-2.jpg",
    type: "Express pool",
    status: "Limited spots",
    price: "From $12 per ride",
    date: "Daily, 4am-11pm",
    location: "Airport corridor",
    keyInfo: [
      { label: "Luggage", value: "1 carry-on + 1 checked bag" },
      { label: "Tracking", value: "Live flight sync" },
      { label: "Wait time", value: "Up to 10 min" },
      { label: "Best for", value: "Airport trips" },
    ],
    rules: [
      "Confirm terminal number before pickup.",
      "Notify the driver if bags exceed the limit.",
      "Arrive five minutes early for curbside pickup.",
    ],
    primaryAction: "Reserve now",
    secondaryAction: "Share itinerary",
  },
  {
    slug: "campus-evening-loop",
    title: "Campus Evening Loop",
    description:
      "Safe ride share loop between campus, nearby housing, and late-night study spots.",
    overview:
      "Campus Evening Loop keeps students moving safely after dark. Verified profiles, in-app safety tools, and fixed pickup points keep the loop consistent for dorms, libraries, and off-campus housing.",
    image: "/images/core-3.jpg",
    type: "Safety loop",
    status: "Open",
    price: "Student rate $4",
    date: "Mon-Sat, 6pm-1am",
    location: "University district",
    keyInfo: [
      { label: "Safety tools", value: "Live tracking + SOS" },
      { label: "Pickup points", value: "7 campus stops" },
      { label: "Verification", value: "Student + driver IDs" },
      { label: "Best for", value: "Late study sessions" },
    ],
    rules: [
      "Stay at the marked pickup point.",
      "Use headphones for audio calls.",
      "Report issues through in-app safety tools.",
    ],
    primaryAction: "Book evening ride",
    secondaryAction: "Join with student ID",
  },
  {
    slug: "weekend-coastal-ride",
    title: "Weekend Coastal Ride",
    description:
      "Relaxed weekend routes for beach days and scenic breaks with shared fare splits.",
    overview:
      "Weekend Coastal Ride is a curated weekend route that connects city riders to the coast with fewer stops, scenic views, and easy fare splitting. Perfect for groups looking for a chill, reliable ride.",
    image: "/images/core-4.jpg",
    type: "Weekend route",
    status: "Waitlist",
    price: "From $9 per ride",
    date: "Sat-Sun, 8am-6pm",
    location: "Coastal corridor",
    keyInfo: [
      { label: "Stops", value: "2 quick pickups" },
      { label: "Ride time", value: "45-60 min" },
      { label: "Vehicle", value: "SUV or sedan" },
      { label: "Best for", value: "Weekend plans" },
    ],
    rules: [
      "No oversized beach gear without notice.",
      "Arrive 10 minutes early for scenic pickup points.",
      "Respect shared space for coolers and bags.",
    ],
    primaryAction: "Join waitlist",
    secondaryAction: "Get updates",
  },
  {
    slug: "night-shift-connector",
    title: "Night Shift Connector",
    description:
      "Late-night rides designed for healthcare and service workers on rotating shifts.",
    overview:
      "Night Shift Connector keeps essential teams moving with verified drivers, quiet cabins, and routes aligned to hospital and service shifts. A reliable way to get home safely after midnight.",
    image: "/images/core-5.jpg",
    type: "Shift route",
    status: "Open",
    price: "From $7 per ride",
    date: "Daily, 10pm-5am",
    location: "Medical district",
    keyInfo: [
      { label: "Quiet rides", value: "Low-light mode" },
      { label: "Priority routes", value: "Hospitals + clinics" },
      { label: "Safety", value: "24/7 support" },
      { label: "Best for", value: "Shift workers" },
    ],
    rules: [
      "Use in-app messaging for updates.",
      "Keep cabin lighting low when possible.",
      "Confirm drop-off notes ahead of time.",
    ],
    primaryAction: "Book night ride",
    secondaryAction: "Share with a teammate",
  },
  {
    slug: "event-shuttle-pass",
    title: "Event Shuttle Pass",
    description:
      "Group-friendly rides for concerts, games, and city events with shared pickups.",
    overview:
      "Event Shuttle Pass keeps groups together with scheduled pickup windows and shared ride pools. Perfect for arenas and venues where parking is limited and ride demand spikes.",
    image: "/images/core-6.jpg",
    type: "Event ride",
    status: "Limited spots",
    price: "From $8 per ride",
    date: "Event days only",
    location: "Arena district",
    keyInfo: [
      { label: "Group size", value: "Up to 4 riders" },
      { label: "Pickup window", value: "15 minutes" },
      { label: "Return rides", value: "Scheduled drop-off" },
      { label: "Best for", value: "Live events" },
    ],
    rules: [
      "Confirm event start time during booking.",
      "Keep phone ringer on for pickup updates.",
      "Return rides must be scheduled in advance.",
    ],
    primaryAction: "Reserve seats",
    secondaryAction: "Plan return ride",
  },
];
