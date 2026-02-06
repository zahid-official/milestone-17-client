import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { coreListings } from "@/data/core-listings";
import {
  ArrowLeft,
  CalendarDays,
  CircleDollarSign,
  MapPin,
  Share2,
} from "lucide-react";
import { motion } from "motion/react";
import { Link, useParams } from "react-router";
import { toast } from "sonner";

const CoreListingDetails = () => {
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

  const cardContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const { slug } = useParams();
  const listing = coreListings.find((item) => item.slug === slug);

  const handleShare = async () => {
    if (!listing) {
      return;
    }

    const shareData = {
      title: listing.title,
      text: listing.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareData.url);
        toast.success("Link copied to clipboard.");
        return;
      }

      toast.error("Sharing is not supported in this browser.");
    } catch {
      toast.error("Unable to share this listing right now.");
    }
  };

  if (!listing) {
    return (
      <motion.section
        className="container mx-auto bg-background py-16 md:py-24"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <motion.div variants={fadeUp}>
            <Badge variant="outline" className="rounded-full px-3 py-1">
              Listing not found
            </Badge>
          </motion.div>
          <motion.h1
            className="text-pretty text-4xl font-bold tracking-tight sm:text-5xl"
            variants={fadeUp}
          >
            We could not find that listing.
          </motion.h1>
          <motion.p className="text-lg text-muted-foreground" variants={fadeUp}>
            Head back to the homepage to explore available ride circles.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Button asChild className="rounded-full">
              <Link to="/#core-listings">Back to listings</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    );
  }

  const relatedListings = coreListings
    .filter((item) => item.slug !== listing.slug)
    .slice(0, 3);

  return (
    <motion.section
      className="container mx-auto bg-background py-16 md:py-24"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={sectionVariants}
    >
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-6">
          <motion.div variants={fadeUp}>
            <Link
              to="/#core-listings"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Back to listings
            </Link>
          </motion.div>

          <motion.div className="space-y-4" variants={fadeUp}>
            <Badge variant="outline" className="rounded-full px-3 py-1">
              Core listing
            </Badge>
            <h1 className="text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
              {listing.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {listing.description}
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center gap-3"
            variants={fadeUp}
          >
            <Badge variant="secondary" className="rounded-full text-xs">
              {listing.type}
            </Badge>
            <Badge variant="outline" className="rounded-full text-xs">
              {listing.status}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {listing.location}
            </span>
          </motion.div>

          <motion.p className="text-muted-foreground" variants={fadeUp}>
            {listing.overview}
          </motion.p>

          <motion.div
            className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2"
            variants={fadeUp}
          >
            <div className="flex items-center gap-2">
              <CircleDollarSign className="size-4 text-foreground" />
              {listing.price}
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="size-4 text-foreground" />
              {listing.date}
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col gap-3 sm:flex-row"
            variants={fadeUp}
          >
            <Button asChild className="rounded-full">
              <Link to="/book-ride">{listing.primaryAction}</Link>
            </Button>
            <Button
              variant="secondary"
              className="rounded-full"
              onClick={handleShare}
            >
              <Share2 className="size-4" />
              Share
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="overflow-hidden rounded-3xl border"
          variants={fadeUp}
        >
          <img
            src={listing.image}
            alt={listing.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </motion.div>
      </div>

      <motion.div
        className="mt-12 grid gap-6 lg:grid-cols-3"
        variants={cardContainer}
      >
        <motion.div variants={cardVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>Quick snapshot before you book.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {listing.overview}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Key information</CardTitle>
              <CardDescription>Specs and highlights.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {listing.keyInfo.map((info) => (
                  <li
                    key={info.label}
                    className="flex items-center justify-between gap-2"
                  >
                    <span>{info.label}</span>
                    <span className="font-semibold text-foreground">
                      {info.value}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Rules and etiquette</CardTitle>
              <CardDescription>
                Keep the ride smooth for everyone.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {listing.rules.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div className="mt-12" variants={fadeUp}>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-pretty text-3xl font-semibold tracking-tight">
              Related listings
            </h2>
            <p className="text-muted-foreground">
              Explore other ride circles that match your schedule.
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {relatedListings.map((item) => (
            <Card
              key={item.slug}
              className="group h-full overflow-hidden rounded-2xl border border-border/60 bg-background/90 shadow-sm transition-shadow hover:shadow-md gap-0 p-0"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t dark:from-background/95 dark:via-background/35 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-border/60 bg-background/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {item.type}
                </span>
                <span className="absolute right-4 top-4 rounded-full border border-border/60 bg-background/90 px-3 py-1 text-xs font-semibold text-muted-foreground">
                  {item.status}
                </span>
              </div>
              <CardContent className="space-y-3 p-5">
                <div className="flex w-full items-center justify-between gap-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="size-3" />
                    <span>{item.location}</span>
                  </div>
                  <span className="whitespace-nowrap rounded-full border border-border/60 bg-muted/40 px-3 py-1">
                    {item.price}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 min-h-[52px] text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>

                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="rounded-full"
                >
                  <Link to={`/listings/${item.slug}`}>View details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default CoreListingDetails;
