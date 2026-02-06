import {
  Blocks,
  Bot,
  ChartPie,
  Film,
  MessageCircle,
  Settings2,
} from "lucide-react";
import { motion } from "motion/react";

const features = [
  {
    icon: Settings2,
    title: "Flexible Ride Options",
    description:
      "Choose from solo rides, shared trips, or scheduled pickups—customized to your travel needs.",
  },
  {
    icon: Blocks,
    title: "Smart Matching System",
    description:
      "Get paired with drivers or riders based on real-time location and preferred routes.",
  },
  {
    icon: Bot,
    title: "AI Route Optimization",
    description:
      "Our AI ensures the most efficient routes, reducing detours and saving travel time.",
  },
  {
    icon: Film,
    title: "Live Trip Monitoring",
    description:
      "Track your ride in real-time and share your route with friends or family for peace of mind.",
  },
  {
    icon: ChartPie,
    title: "Ride History & Insights",
    description:
      "Access your past trips, payments, and carbon-saving stats in one organized dashboard.",
  },
  {
    icon: MessageCircle,
    title: "In-App Communication",
    description:
      "Chat securely with drivers or riders before pickup—no need to share personal contact info.",
  },
];

const Services = () => {
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
      className="flex items-center justify-center container mx-auto"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      <div>
        <motion.h2
          className="text-4xl sm:text-5xl font-semibold tracking-tight text-center"
          variants={fadeUp}
        >
          Service Highlights
        </motion.h2>
        <motion.div
          className="mt-8 sm:mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto"
          variants={cardContainer}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              className="flex flex-col border rounded-xl py-8 px-5"
              variants={cardVariants}
            >
              <div className="mb-4 h-10 w-10 flex items-center justify-center bg-muted rounded-full">
                <feature.icon className="size-5" />
              </div>
              <span className="text-lg font-semibold">{feature.title}</span>
              <p className="mt-1 text-foreground/80 text-[15px]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Services;
