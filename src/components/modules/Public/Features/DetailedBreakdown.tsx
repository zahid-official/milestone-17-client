const features = [
  {
    category: "Rider",
    title: "Everything You Need for a Smooth Ride",
    details: `
      • Real-time ride tracking with accurate ETAs
      • Upfront pricing and multiple payment options
      • Save favorite locations and schedule future rides
      • In-app support and ride history access
      • Ratings and feedback to improve every trip
    `,
    url: "/public/images/feature-1.jpg",
  },
  {
    category: "Driver",
    title: "Powerful Tools for Flexible Earning",
    details: `
      • Accept or decline rides with full flexibility
      • Route optimization and live traffic insights
      • Daily earning summaries and payout tracking
      • Driver ratings, reviews, and performance stats
      • 24/7 support and training resources
    `,
    url: "/public/images/feature-2.jpg",
  },
  {
    category: "Admin",
    title: "Full Platform Control and Insights",
    details: `
      • Centralized dashboard for real-time system monitoring
      • Rider & driver account management and moderation
      • Dynamic pricing, incentives, and region settings
      • Trip analytics, revenue reports, and KPIs
      • Dispute handling and compliance tools
    `,
    url: "/public/images/feature-3.jpg",
  },
];

// DetailedBreakdown Component
const DetailedBreakdown = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full">
        <h2 className="text-4xl md:text-[2.75rem] md:leading-[1.2] font-semibold tracking-[-0.03em] sm:max-w-xl text-pretty sm:mx-auto sm:text-center">
          Explore the Full Velocia Experience
        </h2>
        <p className="mt-2 text-muted-foreground text-lg sm:text-xl sm:text-center">
          A detailed breakdown of what Riders, Drivers, and Admins can do.
        </p>

        <div className="mt-8 md:mt-16 w-full mx-auto space-y-20">
          {features.map((feature) => (
            <div
              key={feature.category}
              className="flex flex-col md:flex-row items-center gap-x-12 gap-y-6 md:even:flex-row-reverse"
            >
              {/* Image or placeholder */}
              <div className="w-full aspect-[4/3] bg-muted rounded-xl border max-h-96 border-border/50 basis-1/2">
                <img
                  src={feature?.url}
                  alt={feature?.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* Text content */}
              <div className="basis-1/2 shrink-0">
                <span className="uppercase font-medium text-sm text-muted-foreground">
                  {feature.category}
                </span>
                <h4 className="my-3 text-2xl font-semibold tracking-tight">
                  {feature.title}
                </h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {feature.details
                    .trim()
                    .split("\n")
                    .map((point, idx) => (
                      <li key={idx}>{point.replace("•", "").trim()}</li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailedBreakdown;
