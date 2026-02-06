export type Offer = {
  slug: string;
  label: string;
  title: string;
  description: string;
  highlight: string;
  perks: string[];
  image: string;
  summary: string;
  availability: string;
  howItWorks: string[];
  eligibility: string[];
  included: string[];
  finePrint: string[];
};

export const offers: Offer[] = [
  {
    slug: "shared-ride-saver",
    label: "Riders",
    title: "Shared Ride Saver",
    description:
      "Split fares automatically and keep your daily commute light on your wallet.",
    highlight: "Save up to 25%",
    perks: ["Automatic cost split", "Flexible pickup windows", "Lower emissions"],
    image: "/images/offers-1.jpg",
    summary:
      "Shared Ride Saver pairs you with riders heading the same way, so you save without extra planning. Pick a shared option and the app handles matching, split fares, and safety tools.",
    availability: "Select cities, weekdays 6am-10pm local time.",
    howItWorks: [
      "Choose Shared Ride Saver when you request a trip.",
      "Confirm a short pickup window instead of a single minute.",
      "Get matched with riders on a similar route.",
      "See your split fare update automatically during the trip.",
    ],
    eligibility: [
      "Verified rider account with a saved payment method.",
      "Pickup inside active shared-ride zones.",
      "Agree to the shared pickup window at booking.",
    ],
    included: [
      "Fare split across matched riders",
      "In-app safety tools and route tracking",
      "Live arrival updates for all riders",
    ],
    finePrint: [
      "Savings vary by route, time of day, and demand.",
      "Pickup windows can extend up to 8 minutes in peak times.",
      "Shared rides may include one additional pickup or drop-off.",
    ],
  },
  {
    slug: "driver-boost-weekends",
    label: "Drivers",
    title: "Driver Boost Weekends",
    description:
      "Earn more on high-demand routes with smart matching and faster pickups.",
    highlight: "Extra earnings",
    perks: ["Weekend rate boosts", "Live demand heatmaps", "Fast payout flow"],
    image: "/images/offers-2.jpg",
    summary:
      "Driver Boost Weekends is designed for peak demand hours so you can focus on high-value rides. Activate boosts, follow heatmaps, and watch bonuses stack in real time.",
    availability: "Every Friday 6pm through Sunday 11pm.",
    howItWorks: [
      "Opt into Boost Weekends from your driver dashboard.",
      "Follow demand heatmaps to high-volume zones.",
      "Complete boost rides to unlock bonus tiers.",
      "Cash out instantly once you hit each tier.",
    ],
    eligibility: [
      "Active driver account in good standing.",
      "Rating of 4.7 or higher during the offer window.",
      "At least 10 completed trips in the last 30 days.",
    ],
    included: [
      "Bonus multipliers on qualifying rides",
      "Priority matching in boosted zones",
      "Instant payout eligibility for boost bonuses",
    ],
    finePrint: [
      "Boost tiers reset each weekend.",
      "Bonuses apply only to rides that start in boosted zones.",
      "Fraud checks may delay payouts on unusual activity.",
    ],
  },
  {
    slug: "campus-commute-pass",
    label: "Students",
    title: "Campus Commute Pass",
    description:
      "Predictable pricing for campus trips with safe, verified ride shares.",
    highlight: "Flat monthly rate",
    perks: ["Student-only pricing", "Verified profiles", "In-app safety tools"],
    image: "/images/offers-3.jpg",
    summary:
      "Campus Commute Pass gives students a predictable monthly rate for rides to and from campus. Keep costs steady while enjoying verified driver profiles and safety features.",
    availability: "Available near partnered campuses year-round.",
    howItWorks: [
      "Verify your student email inside the app.",
      "Purchase a monthly pass with a fixed fare cap.",
      "Book campus trips with the pass applied automatically.",
      "Track usage and renew in your wallet.",
    ],
    eligibility: [
      "Active student status verified by email.",
      "Pickup or drop-off within campus zones.",
      "Monthly pass purchased through the app wallet.",
    ],
    included: [
      "Fixed monthly fare cap for campus rides",
      "Verified student and driver profiles",
      "24/7 safety support and ride sharing",
    ],
    finePrint: [
      "Pass renews monthly unless canceled.",
      "Only applicable to campus zone rides.",
      "Unused rides do not roll over to the next month.",
    ],
  },
];
