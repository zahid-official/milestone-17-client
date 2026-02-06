import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { offers } from "@/data/offers";
import { motion } from "motion/react";
import { Link } from "react-router";

const Offers = () => {
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
      className="container mx-auto"
      id="offers"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto">
        <motion.div
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          variants={fadeUp}
        >
          <div className="space-y-3">
            <Badge
              variant="outline"
              className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
            >
              Offers
            </Badge>
            <h2 className="text-pretty text-4xl sm:text-5xl font-semibold tracking-tight">
              Deals that keep every ride lighter.
            </h2>
            <p className="text-muted-foreground text-lg">
              Choose the offer that matches your commute style and unlock
              savings built for riders, drivers, and students.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={cardContainer}
        >
          {offers.map((offer) => (
            <motion.div
              key={offer.slug}
              className="group pb-2 overflow-hidden rounded-2xl border border-border/60 bg-background/90 shadow-sm transition-shadow hover:shadow-md"
              variants={cardVariants}
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t dark:from-background/95 dark:via-background/40 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-border/60 bg-background/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {offer.label}
                </span>
              </div>
              <div className="space-y-3 p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold">{offer.title}</h3>
                  <Badge variant="secondary" className="rounded-full text-xs">
                    {offer.highlight}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {offer.description}
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {offer.perks.map((perk) => (
                    <li key={perk}>{perk}</li>
                  ))}
                </ul>
                <div className="pt-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                  >
                    <Link to={`/offers/${offer.slug}`}>View offer</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Offers;
