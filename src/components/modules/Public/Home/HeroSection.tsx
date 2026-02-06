import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, MapPinned, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";

const highlights = [
  {
    icon: ShieldCheck,
    text: "Verified profiles on every ride",
  },
  {
    icon: MapPinned,
    text: "Live ETAs and smart matching",
  },
  {
    icon: Leaf,
    text: "Lower emissions with shared trips",
  },
];

const HeroSection = () => {
  const sectionVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <motion.section
      className="relative container mx-auto overflow-hidden py-12 lg:h-[74vh] lg:max-h-[74vh]"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.32 }}
      variants={sectionVariants}
    >
      <div className="relative lg:h-full">
        <div className="grid items-center gap-6 lg:gap-10 lg:h-full lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            className="order-2 space-y-5 lg:order-1"
            variants={columnVariants}
          >
            <Badge
              variant="outline"
              className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
            >
              Smart city rides
            </Badge>
            <h1 className="text-pretty text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
              Ride together, move faster with Velocia.
            </h1>
            <p className="max-w-xl text-base sm:text-lg text-muted-foreground">
              Plan trips, match with trusted drivers, and get reliable ETAs with
              transparent pricing built for everyday commuters.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/book-ride">
                <Button size="lg" className="group">
                  Start your ride
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link
                to="/features"
                className="text-sm font-semibold text-muted-foreground transition hover:text-foreground"
              >
                See how it works
              </Link>
            </div>
            <div className="hidden sm:flex flex-wrap gap-4 text-sm text-muted-foreground">
              {highlights.map((highlight) => (
                <div key={highlight.text} className="flex items-center gap-2">
                  <highlight.icon className="size-4" />
                  <span>{highlight.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative order-1 lg:order-2"
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.9,
                },
              },
            }}
          >
            <div className="relative w-full overflow-hidden rounded-3xl border border-border/60 bg-muted shadow-sm aspect-[16/9] sm:aspect-[4/3] lg:aspect-auto lg:h-[48vh]">
              <img
                alt="Velocia ride experience"
                src="/images/banner.jpg"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr dark:from-background/70 dark:via-transparent to-transparent" />
              <div className="max-sm:hidden absolute bottom-4 left-4 rounded-2xl border border-border/60 bg-background/95 px-4 py-3 shadow-md backdrop-blur">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Active commuters
                </p>
                <p className="text-lg font-semibold text-foreground">
                  120k+ riders
                </p>
              </div>
            </div>
            <div className="max-sm:hidden absolute right-4 top-4 rounded-2xl border border-border/60 bg-background/95 px-4 py-3 text-sm font-semibold text-foreground shadow-md backdrop-blur">
              120k+ monthly rides
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
