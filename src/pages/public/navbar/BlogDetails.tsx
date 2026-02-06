import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { blogPosts } from "@/data/blogs";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { motion } from "motion/react";
import { Link, useParams } from "react-router";

const BlogDetails = () => {
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

  const { slug } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
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
              Blog not found
            </Badge>
          </motion.div>
          <motion.h1
            className="text-pretty text-4xl font-bold tracking-tight sm:text-5xl"
            variants={fadeUp}
          >
            We could not find that story.
          </motion.h1>
          <motion.p className="text-lg text-muted-foreground" variants={fadeUp}>
            Try another article from the Velocia blog.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Button asChild className="rounded-full">
              <Link to="/blogs">Back to Blogs</Link>
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
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="mx-auto max-w-4xl">
        <motion.div variants={fadeUp}>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to Blogs
          </Link>
        </motion.div>

        <motion.div className="mt-6 flex flex-col gap-4" variants={fadeUp}>
          <Badge variant="outline" className="w-max rounded-full px-3 py-1">
            {post.category}
          </Badge>
          <h1 className="text-pretty text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          <p className="text-lg text-muted-foreground">{post.excerpt}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Calendar className="size-4" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-4" />
              {post.readTime}
            </span>
            <span className="inline-flex items-center gap-1">
              <User className="size-4" />
              {post.author}
            </span>
          </div>
        </motion.div>

        <motion.div
          className="mt-10 overflow-hidden rounded-3xl border"
          variants={fadeUp}
        >
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </motion.div>

        <motion.div
          className="mt-10 space-y-10 text-lg leading-relaxed"
          variants={fadeUp}
        >
          {post.sections.map((section) => (
            <div key={section.heading} className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph, index) => (
                <p
                  key={`${section.heading}-${index}`}
                  className="text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
              {section.bullets && (
                <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 rounded-3xl border bg-muted/40 p-6 sm:p-8"
          variants={fadeUp}
        >
          <p className="text-lg italic text-muted-foreground">
            &quot;{post.quote.text}&quot;
          </p>
          <div className="mt-4 text-sm font-semibold">
            {post.quote.author} -{" "}
            <span className="text-muted-foreground">{post.quote.role}</span>
          </div>
        </motion.div>

        <motion.div className="mt-10" variants={fadeUp}>
          <h3 className="text-2xl font-semibold tracking-tight">
            Key takeaways
          </h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
            {post.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Separator className="my-12" />
        </motion.div>

        <motion.div
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          variants={fadeUp}
        >
          <div className="space-y-2">
            <h4 className="text-2xl font-semibold tracking-tight">
              Keep exploring the Velocia journal.
            </h4>
            <p className="text-muted-foreground">
              Discover more stories about ride culture, safety, and product
              updates.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/blogs">Back to Blogs</Link>
            </Button>
            <Button asChild className="rounded-full">
              <Link to="/features">Explore Features</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BlogDetails;

