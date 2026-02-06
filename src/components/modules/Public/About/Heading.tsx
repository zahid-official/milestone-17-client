import { Badge } from "@/components/ui/badge";
import { ArrowDownRight } from "lucide-react";
import { motion } from "motion/react";

const Heading = () => {
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
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={sectionVariants}
    >
      {/* Title */}
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
        <motion.div variants={fadeUp}>
          <Badge variant="outline" className="w-max py-1 rounded-full px-3">
            About Velocia
            <ArrowDownRight className="size-4" />
          </Badge>
        </motion.div>
        <motion.h1
          className="text-pretty text-5xl font-bold tracking-tight lg:text-6xl"
          variants={fadeUp}
        >
          Revolutionizing the{" "}
          <span className="relative text-primary">Future of Mobility</span>
        </motion.h1>
        <motion.p className="text-lg text-muted-foreground" variants={fadeUp}>
          Velocia is revolutionizing urban mobility by connecting riders and
          drivers for faster, greener and smarter travel. Join us on the road to
          a more sustainable future.
        </motion.p>
      </div>
    </motion.section>
  );
};

export default Heading;
