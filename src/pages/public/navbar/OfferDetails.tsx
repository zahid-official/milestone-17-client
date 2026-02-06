import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { offers } from "@/data/offers";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { Link, useParams } from "react-router";

const OfferDetails = () => {
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
  const offer = offers.find((item) => item.slug === slug);

  if (!offer) {
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
              Offer not found
            </Badge>
          </motion.div>
          <motion.h1
            className="text-pretty text-4xl font-bold tracking-tight sm:text-5xl"
            variants={fadeUp}
          >
            We could not find that offer.
          </motion.h1>
          <motion.p className="text-lg text-muted-foreground" variants={fadeUp}>
            Head back to the homepage to explore the latest offers.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Button asChild className="rounded-full">
              <Link to="/#offers">Back to offers</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    );
  }

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
              to="/#offers"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Back to offers
            </Link>
          </motion.div>

          <motion.div className="space-y-4" variants={fadeUp}>
            <Badge variant="outline" className="rounded-full px-3 py-1">
              Offer Details
            </Badge>
            <h1 className="text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
              {offer.title}
            </h1>
            <p className="text-lg text-muted-foreground">{offer.description}</p>
          </motion.div>

          <motion.div className="flex flex-wrap items-center gap-3" variants={fadeUp}>
            <Badge variant="secondary" className="rounded-full text-xs">
              {offer.highlight}
            </Badge>
            <Badge variant="outline" className="rounded-full text-xs">
              {offer.label}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {offer.availability}
            </span>
          </motion.div>

          <motion.p className="text-muted-foreground" variants={fadeUp}>
            {offer.summary}
          </motion.p>

          <motion.div
            className="flex flex-col gap-3 sm:flex-row"
            variants={fadeUp}
          >
            <Button asChild className="rounded-full">
              <Link to="/book-ride">Book a ride</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/contact-us">Claim offer</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div className="overflow-hidden rounded-3xl border" variants={fadeUp}>
          <img
            src={offer.image}
            alt={offer.title}
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
              <CardTitle>Perks</CardTitle>
              <CardDescription>Highlights you can count on.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {offer.perks.map((perk) => (
                  <li key={perk}>{perk}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>How it works</CardTitle>
              <CardDescription>Four steps to activate this offer.</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
                {offer.howItWorks.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Eligibility</CardTitle>
              <CardDescription>Make sure you are ready to join.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {offer.eligibility.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-6 grid gap-6 lg:grid-cols-2"
        variants={cardContainer}
      >
        <motion.div variants={cardVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Included</CardTitle>
              <CardDescription>What you get with this offer.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {offer.included.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Fine print</CardTitle>
              <CardDescription>Important details to keep in mind.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                {offer.finePrint.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default OfferDetails;
