import { Badge } from "@/components/ui/badge";
import { Clock, Leaf, ShieldCheck, Users } from "lucide-react";
import { motion } from "motion/react";

const insights = [
  {
    icon: Clock,
    value: "4.5 min",
    title: "Average pickup time",
    description: "Smarter matching keeps wait times short during peak hours.",
  },
  {
    icon: Users,
    value: "120k+",
    title: "Active commuters",
    description:
      "A growing community of riders and drivers across major routes.",
  },
  {
    icon: ShieldCheck,
    value: "99%",
    title: "Verified profiles",
    description: "Ratings, ID checks, and trusted contacts on every trip.",
  },
  {
    icon: Leaf,
    value: "18%",
    title: "Lower emissions",
    description:
      "Shared rides reduce single-occupancy travel and city congestion.",
  },
];

const Insights = () => {
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
    hidden: { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const cardContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.06,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65 },
    },
  };

  return (
    <motion.section
      className="relative overflow-x-hidden py-7 container mx-auto"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-accent/10" />
      <div className="absolute -right-16 top-10 h-40 w-40 rounded-full bg-primary/8 blur-3xl" />
      <div className="relative container mx-auto">
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <motion.div className="space-y-5" variants={fadeUp}>
            <Badge
              variant="outline"
              className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
            >
              Insights
            </Badge>
            <h2 className="text-pretty text-4xl sm:text-5xl font-semibold tracking-tight">
              Real-time insights for smarter rides.
            </h2>
            <p className="text-muted-foreground text-lg">
              Velocia monitors live demand, route efficiency, and safety signals
              to keep every commute reliable and predictable.
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <span className="rounded-full border border-border/60 bg-background/80 px-3 py-1">
                Live demand
              </span>
              <span className="rounded-full border border-border/60 bg-background/80 px-3 py-1">
                ETA accuracy
              </span>
              <span className="rounded-full border border-border/60 bg-background/80 px-3 py-1">
                Safety coverage
              </span>
              <span className="rounded-full border border-border/60 bg-background/80 px-3 py-1">
                Green impact
              </span>
            </div>
          </motion.div>

          <motion.div
            className="grid gap-4 sm:grid-cols-2"
            variants={cardContainer}
          >
            {insights.map((insight) => (
              <motion.div
                key={insight.title}
                className="rounded-2xl border border-border/60 bg-background/90 p-5 shadow-sm backdrop-blur"
                variants={cardVariants}
              >
                <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-muted">
                  <insight.icon className="size-5" />
                </div>
                <p className="text-3xl font-semibold tracking-tight">
                  {insight.value}
                </p>
                <h3 className="mt-2 text-base font-semibold">
                  {insight.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {insight.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Insights;
