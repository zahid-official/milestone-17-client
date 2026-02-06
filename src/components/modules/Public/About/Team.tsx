import { motion } from "motion/react";

const teamMembers = [
  {
    name: "John smith",
    title: "Founder & CEO",
    imageUrl:
      "https://images.pexels.com/photos/27758893/pexels-photo-27758893.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Michael Davis",
    title: "Engineering Manager",
    imageUrl:
      "https://images.pexels.com/photos/9427966/pexels-photo-9427966.jpeg?auto=compress&cs=tinysrgb&w600",
  },
  {
    name: "Bob Smith",
    title: "Product Manager",
    imageUrl:
      "https://images.pexels.com/photos/20709121/pexels-photo-20709121.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Peter Johnson",
    title: "Frontend Developer",
    imageUrl:
      "https://images.pexels.com/photos/4155313/pexels-photo-4155313.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "David Lee",
    title: "Backend Developer",
    imageUrl:
      "https://images.pexels.com/photos/31623365/pexels-photo-31623365.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Richard Wilson",
    title: "Product Designer",
    imageUrl:
      "https://images.pexels.com/photos/6836412/pexels-photo-6836412.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "Michael Brown",
    title: "UX Researcher",
    imageUrl:
      "https://images.pexels.com/photos/7549126/pexels-photo-7549126.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    name: "James Garcia",
    title: "Customer Success",
    imageUrl:
      "https://images.pexels.com/photos/31623363/pexels-photo-31623363.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

// Team Component
const Team = () => {
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
        staggerChildren: 0.04,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55 },
    },
  };

  return (
    <motion.section
      className="flex flex-col items-center justify-center sm:py-14 py-4 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <motion.div className="text-center max-w-xl mx-auto" variants={fadeUp}>
        <b className="text-center text-muted-foreground font-semibold text-sm uppercase">
          Team Velocia!
        </b>
        <h2 className="tracking-tighter mb-3 mt-2 text-3xl font-bold sm:text-4xl">
          Meet Our Team
        </h2>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground">
          Behind every smart ride and seamless experience is a team of
          passionate individuals who bring creativity, dedication and heart to
          everything we do. At Velocia, it's people who power progress.
        </p>
      </motion.div>

      <motion.div
        className="sm:mt-20 mt-14 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-12 max-w-(--breakpoint-lg) mx-auto"
        variants={cardContainer}
      >
        {teamMembers.map((member) => (
          <motion.div
            key={member.name}
            className="text-center"
            variants={cardVariants}
          >
            <img
              src={member.imageUrl}
              alt={member.name}
              className="h-20 w-20 rounded-full object-cover mx-auto bg-secondary"
              width={120}
              height={120}
            />
            <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
            <p className="text-muted-foreground">{member.title}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Team;
