import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";

function FeatureCard({ rotate = "", translate = "" }) {
  return (
    <div
      className={`absolute right-0 top-0 z-40 flex aspect-[4/5] w-3/5 justify-center overflow-hidden rounded-[2rem] border border-primary/30 bg-background/80 shadow-lg shadow-foreground/10 backdrop-blur-sm transition-shadow duration-500 ease-out hover:shadow-xl ${rotate} ${translate} md:max-xl:-translate-x-[8%] md:max-xl:translate-y-[8%]`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br`} />
      <img
        alt="Feature"
        src="/images/ride.jpg"
        className="h-full w-full object-cover opacity-90"
        loading="lazy"
      />
    </div>
  );
}

// CTA Section Component
const CTA = () => {
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

  return (
    <motion.section
      className="sm:pt-36 sm:pb-24 py-20 container mx-auto"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="max-w-full sm:pl-10 sm:px-3 px-8 rounded-4xl overflow-hidden bg-gradient-to-b from-accent/30 to-background pt-10 md:pt-16 lg:pt-20">
        <div className="container relative flex flex-col md:flex-row md:space-x-16">
          {/* Left Content */}
          <motion.div
            className="lg:mb-28 lg:w-3/5 lg:shrink-0 xl:mb-20 xl:w-1/2"
            variants={fadeUp}
          >
            <div className="relative">
              {/* Decorative Circles */}
              <div className="absolute -left-4 -top-6 h-28 w-28 rounded-full bg-primary/5" />
              <div className="absolute -left-2 -top-4 h-24 w-24 rounded-full bg-primary/10" />
              <div className="absolute -left-0 -top-2 h-20 w-20 rounded-full bg-primary/15" />

              <h3 className="relative mb-3 text-4xl font-semibold md:mb-4 md:text-5xl lg:mb-6 lg:text-6xl">
                <span className="relative">
                  <span className="absolute -left-2 -top-2 h-full w-full bg-primary/20 blur-2xl"></span>
                  Discover
                </span>{" "}
                our powerful features
              </h3>

              <p className="mb-8 max-w-xl text-muted-foreground/90 lg:text-lg">
                Unlock the full potential of your ride-sharing experience with
                our cutting-edge features designed to enhance convenience,
                safety and enjoyment on every journey.
              </p>

              {/* Buttons */}
              <div className="flex sm:flex-row flex-col gap-3">
                <Link to={"/features"}>
                  <Button className="rounded-full group relative overflow-hidden py-2 h-10">
                    <span className="relative z-10">Explore Features</span>
                    <ArrowRight className="-ml-1 relative z-10 size-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>

                <Link to={"/about"}>
                  <Button
                    variant="outline"
                    className="rounded-full px-6 py-2 h-10"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Visual Cards */}
          <motion.div
            className="lg:block hidden absolute bottom-10 right-1/2 h-min w-full max-w-md translate-x-1/2 md:-right-34 md:-mr-4 md:w-3/4 md:max-w-xl md:translate-x-0 lg:mt-auto xl:relative xl:right-0 xl:size-full xl:max-w-full"
            variants={fadeUp}
          >
            <div className="relative aspect-[8/5] size-full min-h-64">
              {/* Card 1 */}
              <FeatureCard
                rotate="-rotate-[35deg]"
                translate="-translate-x-[28%] translate-y-[28%]"
              />

              {/* Card 2 */}
              <FeatureCard
                rotate="-rotate-[18deg]"
                translate="-translate-x-[18%] translate-y-[10%]"
              />

              {/* Card 3 */}
              <FeatureCard />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default CTA;
