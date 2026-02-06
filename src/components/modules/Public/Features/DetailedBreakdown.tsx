import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";

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
    url: "/images/feature-1.jpg",
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
    url: "/images/feature-2.jpg",
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
    url: "/images/feature-3.jpg",
  },
];

// DetailedBreakdown Component
const DetailedBreakdown = () => {
  const sectionVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  };

  return (
    <motion.section
      className="min-h-screen flex items-center justify-center"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={sectionVariants}
    >
      <div className="w-full">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <motion.div variants={fadeUp}>
            <Badge variant="outline" className="w-max py-1 rounded-full px-3">
              Exclusive Features
            </Badge>
          </motion.div>
          <motion.h1
            className="text-pretty text-5xl font-bold tracking-tight lg:text-6xl sm:max-w-xl sm:mx-auto sm:text-center"
            variants={fadeUp}
          >
            Explore Velocia's{" "}
            <span className="relative text-primary">Features</span>
          </motion.h1>
          <motion.p className="text-lg text-muted-foreground" variants={fadeUp}>
            Velocia is revolutionizing urban mobility by connecting riders and
            drivers for faster, greener and smarter travel. Join us on the road
            to a more sustainable future.
          </motion.p>
        </div>

        <div className="mt-8 md:mt-16 w-full mx-auto space-y-20">
          {features.map((feature) => (
            <motion.div
              key={feature.category}
              className="flex flex-col md:flex-row items-center gap-x-12 gap-y-6 md:even:flex-row-reverse"
              variants={itemVariants}
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
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default DetailedBreakdown;
