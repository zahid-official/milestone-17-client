import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { coreListings } from "@/data/core-listings";
import {
  CalendarDays,
  CircleDollarSign,
  MapPin,
} from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";

const CoreListings = () => {
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
      className="sm:py-36 py-24 container mx-auto"
      id="core-listings"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="">
        <motion.div
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          variants={fadeUp}
        >
          <div className="space-y-3">
            <Badge
              variant="outline"
              className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
            >
              Core listings
            </Badge>
            <h2 className="text-pretty text-4xl sm:text-5xl font-semibold tracking-tight">
              Curated ride circles.
            </h2>
            <p className="text-muted-foreground text-lg">
              Pick a route, see the key details, and book a shared ride that
              matches your schedule and location.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mt-10 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={cardContainer}
        >
          {coreListings.map((listing) => (
            <motion.div key={listing.slug} variants={cardVariants}>
              <Card className="group h-full min-h-[360px] sm:min-h-[420px] overflow-hidden rounded-2xl border border-border/60 bg-background/90 shadow-sm transition-shadow hover:shadow-md gap-0 p-0">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t dark:from-background/95 dark:via-background/40 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-border/60 bg-background/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {listing.type}
                  </span>
                  <span className="absolute right-4 top-4 rounded-full border border-border/60 bg-background/90 px-3 py-1 text-xs font-semibold text-muted-foreground">
                    {listing.status}
                  </span>
                </div>
                <CardContent className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-semibold">{listing.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {listing.description}
                  </p>
                  <ul className="mt-1 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                    <li className="flex items-center gap-2">
                      <CircleDollarSign className="size-4" />
                      <span>{listing.price}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CalendarDays className="size-4" />
                      <span>{listing.date}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <MapPin className="size-4" />
                      <span>{listing.location}</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto p-5 pt-0">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                  >
                    <Link to={`/listings/${listing.slug}`}>View details</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CoreListings;
