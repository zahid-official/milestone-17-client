import { Leaf, MapPinned, ShieldCheck, Zap } from "lucide-react";
import { motion } from "motion/react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Verified riders and drivers",
    description:
      "Profiles, ratings, and ride sharing tools keep every trip accountable.",
  },
  {
    icon: MapPinned,
    title: "Smart route matching",
    description:
      "Real-time location pairing helps you find the best ride in minutes.",
  },
  {
    icon: Zap,
    title: "Transparent pricing",
    description:
      "Upfront fares with secure in-app payments and easy cost splitting.",
  },
  {
    icon: Leaf,
    title: "Lower emissions",
    description:
      "Shared rides reduce congestion and help cities breathe cleaner air.",
  },
];

const WhyVelocia = () => {
  const sectionVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.85 },
    },
  };

  const rightColumnVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.04,
      },
    },
  };

  const cardContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  };

  return (
    <motion.section
      className="pt-8 container mx-auto"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.06 }}
      variants={sectionVariants}
    >
      <div className="">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          {/* Left Columns */}
          <motion.div className="relative" variants={fadeUp}>
            <div className="absolute -left-6 -top-6 h-28 w-28 rounded-full bg-primary/10 blur-2xl" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/60 bg-muted shadow-sm">
              <img
                src="/images/why-velocia.jpg"
                alt="Velocia rides at a glance"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="max-sm:hidden absolute bottom-4 left-4 rounded-2xl border border-border/60 bg-background/95 px-4 py-3 shadow-md backdrop-blur">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Average rating
                </p>
                <p className="text-lg font-semibold text-foreground">
                  4.9 out of 5
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Columns */}
          <motion.div variants={rightColumnVariants}>
            <motion.h2
              className="mt-3 text-pretty text-4xl sm:text-5xl font-semibold tracking-tight"
              variants={fadeUp}
            >
              Why choose Velocia
            </motion.h2>
            <motion.p
              className="mt-4 text-muted-foreground text-lg"
              variants={fadeUp}
            >
              Velocia connects riders and drivers through a trusted network that
              prioritizes safety, efficiency, and comfort for every commute.
            </motion.p>
            <motion.div
              className="mt-8 grid gap-4 sm:grid-cols-2"
              variants={cardContainer}
            >
              {reasons.map((reason) => (
                <motion.div
                  key={reason.title}
                  className="rounded-xl border border-border/60 bg-background/80 p-4 shadow-sm"
                  variants={cardVariants}
                >
                  <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-muted">
                    <reason.icon className="size-5" />
                  </div>
                  <h3 className="text-base font-semibold">{reason.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {reason.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default WhyVelocia;
