export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  role: string;
  image: string;
  featured: boolean;
  sections: BlogSection[];
  highlights: string[];
  quote: {
    text: string;
    author: string;
    role: string;
  };
};

export const topics = [
  "City Guides",
  "Driver Tips",
  "Rider Stories",
  "Safety",
  "Product Updates",
];

export const blogPosts: BlogPost[] = [
  {
    slug: "designing-calmer-pickups",
    title: "Designing calmer pickups in the busiest districts",
    category: "City Guides",
    excerpt:
      "From smart pickup zones to curbside etiquette, here is how Velocia is helping riders and drivers move through downtown more smoothly.",
    date: "Sep 18, 2025",
    readTime: "6 min read",
    author: "Steven",
    role: "Mobility Research Lead",
    image: "/images/blog-1.jpg",
    featured: true,
    sections: [
      {
        heading: "Reduce the guesswork at the curb",
        paragraphs: [
          "Busy pickup zones are stressful when everyone is trying to read the same curb. We partnered with city teams to mark clear loading areas inside the app so riders can stand exactly where drivers expect them.",
          "Riders now see a short pickup guide for each block, including the safest side to wait, the direction of traffic, and the nearest crosswalk.",
        ],
        bullets: [
          "Directional arrows that match traffic flow",
          "Street-level pickup hints based on live traffic",
          "Quick switch for alternate pickup spots",
        ],
      },
      {
        heading: "Make handoffs feel human",
        paragraphs: [
          "Great rides start with calm handoffs. We added pre-written greetings, quick vehicle details, and a visible driver arrival timeline so riders do not feel rushed.",
          "On the driver side, the pickup timer now suggests a short wait window so drivers can avoid risky stops and keep riders safe.",
        ],
      },
      {
        heading: "Keep the city moving",
        paragraphs: [
          "Pickup flow impacts everyone, not just riders. Our routing models now favor less-congested blocks and minimize double parking during peak hours.",
          "The result is a smoother pickup experience and fewer slowdowns for surrounding traffic.",
        ],
      },
    ],
    highlights: [
      "Pickup guidance now covers 18 downtown corridors.",
      "Wait times dropped by 14 percent since the update.",
      "Drivers report fewer curbside conflicts.",
    ],
    quote: {
      text: "When pickup zones feel calm, the whole city benefits. It is a small change that compounds across thousands of rides.",
      author: "Steven",
      role: "Mobility Research Lead",
    },
  },
  {
    slug: "safety-playbook-late-night-rides",
    title: "How our safety playbook keeps late-night rides secure",
    category: "Safety",
    excerpt:
      "Learn how driver verification, in-app check-ins, and route intelligence work together to keep every trip protected.",
    date: "Oct 2, 2025",
    readTime: "7 min read",
    author: "Marcus",
    role: "Safety Operations",
    image: "/images/blog-2.jpg",
    featured: true,
    sections: [
      {
        heading: "Verification that never sleeps",
        paragraphs: [
          "Every driver goes through layered verification that stays active after onboarding. We continually monitor license status, vehicle inspections, and report history.",
          "Late-night rides automatically trigger additional checks, including route monitoring and post-ride confirmations.",
        ],
      },
      {
        heading: "Smart check-ins for riders",
        paragraphs: [
          "We introduced a quick check-in flow for riders after pickup and again midway through the trip. If a rider does not respond, support can reach out immediately.",
          "These checks are designed to be fast and calm, so riders can focus on the journey.",
        ],
        bullets: [
          "One-tap status updates",
          "Emergency contact sharing",
          "Live support chat in the ride screen",
        ],
      },
      {
        heading: "Route intelligence for safer arrivals",
        paragraphs: [
          "Route intelligence now flags unusual detours and prompts drivers to confirm changes. This protects both riders and drivers with clear context.",
          "Our operations team can step in quickly if anything looks off.",
        ],
      },
    ],
    highlights: [
      "Late-night rides get a dedicated support queue.",
      "Driver verification checks refresh every 24 hours.",
      "Emergency response time improved by 22 percent.",
    ],
    quote: {
      text: "Safety is not a single feature. It is a complete system that supports riders and drivers every step of the way.",
      author: "Marcus",
      role: "Safety Operations",
    },
  },
  {
    slug: "driver-community-loyalty",
    title: "Five ways drivers can build loyal rider communities",
    category: "Driver Tips",
    excerpt:
      "Small touches like ride playlists and thoughtful greetings can turn a single trip into a recurring route.",
    date: "Oct 7, 2025",
    readTime: "4 min read",
    author: "Priya Singh",
    role: "Driver Success",
    image: "/images/blog-3.jpg",
    featured: false,
    sections: [
      {
        heading: "Start with a warm welcome",
        paragraphs: [
          "Riders remember drivers who make them feel seen. A quick greeting and confirmation of the destination builds trust immediately.",
          "Drivers who personalize the first 30 seconds earn higher ratings and more repeat rides.",
        ],
      },
      {
        heading: "Create a comfortable ride ritual",
        paragraphs: [
          "Simple rituals like adjusting temperature, offering quiet mode, or sharing a favorite playlist make rides feel intentional.",
          "These habits also help riders know what to expect the next time they book with you.",
        ],
        bullets: [
          "Ask about music or silence preferences",
          "Confirm preferred route before moving",
          "Offer quick luggage help when possible",
        ],
      },
      {
        heading: "Follow up with gratitude",
        paragraphs: [
          "A short thank-you message in the app leaves a lasting impression. It also encourages riders to leave helpful feedback.",
        ],
      },
    ],
    highlights: [
      "Drivers who greet riders see 12 percent higher tips.",
      "Repeat rides increase when drivers set ride preferences.",
      "Consistent ratings help unlock premium trips.",
    ],
    quote: {
      text: "Community is built trip by trip. The riders who feel respected are the ones who come back.",
      author: "Priya Singh",
      role: "Driver Success",
    },
  },
  {
    slug: "rider-checklist-airport-runs",
    title: "The rider checklist for stress-free airport runs",
    category: "Rider Stories",
    excerpt:
      "Plan ahead with pickup windows, luggage notes, and route sharing so you never miss a flight.",
    date: "Oct 12, 2025",
    readTime: "5 min read",
    author: "Jonas Park",
    role: "Community Writer",
    image: "/images/blog-4.jpg",
    featured: false,
    sections: [
      {
        heading: "Plan your pickup window",
        paragraphs: [
          "Airport trips are smoother when you plan a pickup window instead of a single minute. This gives you buffer time if traffic changes.",
          "The app now suggests pickup time ranges based on live airport congestion data.",
        ],
      },
      {
        heading: "Share the details early",
        paragraphs: [
          "Let drivers know about luggage count and terminal location before they arrive. It helps them choose the right pickup lane.",
          "Quick notes reduce delays and keep airport traffic moving.",
        ],
      },
      {
        heading: "Keep your travel circle in sync",
        paragraphs: [
          "Share your ride details with a travel companion so they can track arrival without calling.",
          "This keeps the pickup calm and makes handoffs feel coordinated.",
        ],
        bullets: [
          "Use ride sharing for family pickups",
          "Save frequent terminals as favorites",
          "Enable arrival alerts for tight schedules",
        ],
      },
    ],
    highlights: [
      "Scheduled pickups reduce wait time by 18 percent.",
      "Drivers appreciate luggage notes before arrival.",
      "Ride sharing updates keep families aligned.",
    ],
    quote: {
      text: "A calm airport ride starts before you even close the door at home. A few quick details make all the difference.",
      author: "Jonas Park",
      role: "Community Writer",
    },
  },
  {
    slug: "greener-commutes-shared-routes",
    title: "Building greener commutes with shared routes",
    category: "Product Updates",
    excerpt:
      "Our latest matching upgrades help reduce emissions by pairing riders with similar destinations.",
    date: "Oct 19, 2025",
    readTime: "3 min read",
    author: "Velocia Team",
    role: "Product Team",
    image: "/images/blog-5.jpg",
    featured: false,
    sections: [
      {
        heading: "Smarter matching in every neighborhood",
        paragraphs: [
          "We upgraded our matching engine to prioritize shared corridors and reduce detours. That means faster trips and fewer miles traveled.",
          "The model now adjusts to commuting patterns by day of week and time of day.",
        ],
      },
      {
        heading: "Cleaner trips without extra effort",
        paragraphs: [
          "Riders do not need to change anything to go greener. The system quietly groups compatible routes behind the scenes.",
          "Drivers benefit from steadier ride queues and less idle time between pickups.",
        ],
        bullets: [
          "Lower emissions per ride",
          "Shorter average pickup distances",
          "Better driver utilization during peaks",
        ],
      },
      {
        heading: "A shared win for cities",
        paragraphs: [
          "These updates are part of our long-term goal to help cities hit climate targets while keeping rides convenient.",
        ],
      },
    ],
    highlights: [
      "Shared matching reduces empty miles by 11 percent.",
      "Riders see faster pickup times during rush hour.",
      "Drivers save fuel with fewer deadhead trips.",
    ],
    quote: {
      text: "Sustainability works best when it feels effortless. Our matching updates make greener travel the default.",
      author: "Velocia Team",
      role: "Product Team",
    },
  },
  {
    slug: "behind-the-scenes-support",
    title: "Behind the scenes of our rider support team",
    category: "Safety",
    excerpt:
      "Meet the people monitoring every trip and how they respond when riders need help fast.",
    date: "Oct 24, 2025",
    readTime: "4 min read",
    author: "Rhea Patel",
    role: "Customer Experience",
    image: "/images/blog-6.jpg",
    featured: false,
    sections: [
      {
        heading: "Always-on support coverage",
        paragraphs: [
          "Our support team works around the clock in shifts designed for quick response. Every rider can reach a human in minutes.",
          "We pair each region with dedicated specialists who understand local ride patterns.",
        ],
      },
      {
        heading: "Training that mirrors real scenarios",
        paragraphs: [
          "Support agents train with real ride simulations so they can respond calmly to urgent situations.",
          "They also learn how to guide riders through simple fixes like pickup changes or payment updates.",
        ],
      },
      {
        heading: "Closing the loop with feedback",
        paragraphs: [
          "Every resolved case feeds back into product updates, helping us improve the app for the next rider.",
        ],
        bullets: [
          "Case summaries within 24 hours",
          "Escalation paths for urgent issues",
          "Customer follow-ups after resolution",
        ],
      },
    ],
    highlights: [
      "Support handles 92 percent of issues in under 10 minutes.",
      "Rider satisfaction scores improved this quarter.",
      "Escalation coverage expanded to 15 new cities.",
    ],
    quote: {
      text: "Behind every smooth ride is a support team that takes every question seriously.",
      author: "Rhea Patel",
      role: "Customer Experience",
    },
  },
];
