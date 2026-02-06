import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Bike,
  MapPinned,
  Repeat2,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: MapPinned,
    title: "Set Your Route",
    description:
      "Enter your pickup and destination to find available rides or passengers nearby.",
    image: "/images/overview-1.jpg",
    alt: "set your route image",
  },
  {
    icon: Bike,
    title: "Match Instantly",
    description:
      "Our smart algorithm instantly pairs drivers and riders heading the same way.",
    image: "/images/overview-2.jpg",
    alt: "driver matching image",
  },
  {
    icon: Users,
    title: "Connect & Ride",
    description:
      "Communicate securely within the app, plan your ride, and travel together safely.",
    image: "/images/overview-3.jpg",
    alt: "connect and ride image",
  },
  {
    icon: ShieldCheck,
    title: "Ride With Confidence",
    description:
      "All profiles are verified and rated by the community for a safe and trusted experience.",
    image: "/images/overview-4.jpg",
    alt: "ride with confidence image",
  },
  {
    icon: Repeat2,
    title: "Split Costs",
    description:
      "Easily share ride costs through secure payments, making travel affordable.",
    image: "/images/overview-5.jpg",
    alt: "cost splitting image",
  },
  {
    icon: Zap,
    title: "Save Time & Emissions",
    description:
      "Get where you're going faster while reducing carbon emissions. Smart mobility for all.",
    image: "/images/overview-6.jpg",
    alt: "save time and emissions image",
  },
];

// Overview Component
const Overview = () => {
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
      className="flex items-center justify-center container mx-auto sm:py-36 py-24"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div className="w-full">
        <motion.h2
          className="sm:text-5xl text-4xl md:leading-[1.2] font-semibold tracking-[-0.03em] sm:max-w-xl text-pretty"
          variants={fadeUp}
        >
          How Velocia Works
        </motion.h2>
        <motion.p
          className="mt-2 text-muted-foreground text-lg sm:text-xl text-justify"
          variants={fadeUp}
        >
          Discover a smarter, more connected way to commute. Velocia helps{" "}
          <br className="md:block hidden" />
          riders and drivers team up for efficient, eco-friendly travel.
        </motion.p>
        <motion.div
          className="mt-10 w-full mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8"
          variants={cardContainer}
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={cardVariants} className="h-full">
              <Card className="flex h-full flex-col border rounded-xl overflow-hidden shadow-none pb-0">
                <CardHeader>
                  <feature.icon />
                  <h4 className=" text-xl font-semibold tracking-tight">
                    {feature.title}
                  </h4>
                  <p className="mt-1 text-muted-foreground text-[17px]">
                    {feature.description}
                  </p>
                </CardHeader>
                <CardContent className="mt-auto px-0 pb-0">
                  <div className="h-52 ml-6 rounded-tl-xl">
                    <img
                      src={feature.image}
                      alt={feature.alt || feature.title}
                      className="w-full h-full  rounded-tl-xl object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Overview;
