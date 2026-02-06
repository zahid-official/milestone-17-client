import { Badge } from "@/components/ui/badge";
import { ArrowDownRight, Lightbulb, Rocket, Users } from "lucide-react";
import { motion } from "motion/react";

const approach = [
  {
    icon: Rocket,
    title: "Pushing Mobility Forward",
    description:
      "We go beyond the ordinary to reimagine how cities move. From AI-powered routing to adaptive ride-matching, we’re shaping the next generation of urban mobility.",
  },
  {
    icon: Lightbulb,
    title: "Driving Urban Innovation",
    description:
      "Innovation is at the core of Velocia. We experiment, iterate, and implement new ideas to make transportation smarter, greener, and more inclusive.",
  },
  {
    icon: Users,
    title: "Empowering Human Connections",
    description:
      "We believe mobility is about people, not just vehicles. Velocia enhances how communities connect—through technology that supports collaboration, accessibility, and equity.",
  },
];

const Approch = () => {
  const sectionVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75 },
    },
  };

  const cardContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.section
      className="flex flex-col sm:pt-14 pt-4 gap-10 md:gap-12"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.22 }}
      variants={sectionVariants}
    >
      <motion.div className="max-w-2xl" variants={fadeUp}>
        <Badge variant="outline" className="w-max py-1 rounded-full px-3">
          Our Approach
          <ArrowDownRight className="size-4" />
        </Badge>
        <h2 className="mb-3 mt-4 text-3xl font-bold sm:text-4xl">
          Making Shared Mobility Effortless
        </h2>
        <p className="text-muted-foreground">
          Our approach combines cutting-edge technology with user-centric design
          to create a seamless shared mobility experience. We focus on
          integrating various transportation modes into a single platform,
          allowing users to plan, book, and pay for their journeys with ease.
        </p>
      </motion.div>
      <motion.div
        className="grid gap-8 md:grid-cols-3 md:gap-10"
        variants={cardContainer}
      >
        {approach.map((item, index) => (
          <motion.div
            key={index}
            className="group flex flex-col rounded-lg border border-border p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-sm"
            variants={cardVariants}
          >
            <div className="mb-4 flex size-12 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10 transition-all group-hover:bg-primary/20">
              <item.icon className="size-5 text-primary md:size-6" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
            <p className="mb-4 text-muted-foreground">{item.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Approch;
