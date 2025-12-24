import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { blogPosts, topics } from "@/data/blogs";
import { ArrowUpRight, Calendar, Clock, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

const featuredPosts = blogPosts.filter((post) => post.featured);
const latestPosts = blogPosts.filter((post) => !post.featured);

const BlogCard = ({ post }: { post: (typeof blogPosts)[number] }) => {
  return (
    <article className="group overflow-hidden rounded-3xl border border-foreground/10 bg-foreground text-background shadow-sm transition hover:shadow-md dark:border-border dark:bg-card dark:text-card-foreground">
      <div className="flex h-full flex-col sm:flex-row">
        <div className="relative md:w-1/2">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105 md:min-h-[260px]"
            loading="lazy"
          />
          <Badge className="absolute left-4 top-4 rounded-full border-transparent bg-foreground/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-background backdrop-blur-sm dark:bg-background/80 dark:text-foreground">
            {post.category}
          </Badge>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-4 text-xs text-background/70 dark:text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Calendar className="size-3.5" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" />
              {post.readTime}
            </span>
          </div>
          <h3 className="text-2xl font-semibold leading-tight">{post.title}</h3>
          <p className="text-background/80 dark:text-muted-foreground">
            {post.excerpt}
          </p>
          <div className="mt-auto flex items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 text-sm text-background/70 dark:text-muted-foreground">
              <User className="size-4" />
              {post.author}
            </span>
            <Link
              to={`/blogs/${post.slug}`}
              className="group/link inline-flex items-center gap-2 text-sm font-semibold text-background/90 transition hover:text-background dark:text-card-foreground dark:hover:text-card-foreground"
            >
              <Button variant={"ghost"} size={"sm"}>
                Read story
                <ArrowUpRight className="size-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

const Blog = () => {
  const topicFilters = ["All", ...topics];
  const [activeTopic, setActiveTopic] = useState("All");

  const isTopicMatch = (category: string) =>
    activeTopic === "All" || category === activeTopic;

  const filteredFeatured = featuredPosts.filter((post) =>
    isTopicMatch(post.category)
  );
  const filteredLatest = latestPosts.filter((post) =>
    isTopicMatch(post.category)
  );

  return (
    <div className="bg-background py-16 md:py-24 px-2">
      {/* Title */}
      <section className="container mx-auto bg-background">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4">
            <Badge variant="outline" className="w-max py-1 rounded-full px-3">
              Velocia Blog
            </Badge>
            <h1 className="text-pretty text-5xl font-bold tracking-tight lg:text-6xl sm:max-w-xl sm:mx-auto">
              Explore Velocia&apos;s{" "}
              <span className="relative text-primary">Stories</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              The Velocia journal covers ride culture, driver success, and the
              innovations shaping smarter mobility for everyone.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {topicFilters.map((topic) => {
              const isActive = topic === activeTopic;
              return (
                <Badge
                  key={topic}
                  asChild
                  variant={isActive ? "default" : "secondary"}
                  className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                >
                  <button type="button" onClick={() => setActiveTopic(topic)}>
                    {topic}
                  </button>
                </Badge>
              );
            })}
          </div>
        </div>
      </section>

      {/* Editor picks */}
      <section className="container mx-auto py-16 md:py-24">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-3">
              <Badge variant="outline" className="rounded-full px-3 py-1">
                Featured
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Editor picks from the Velocia team.
              </h2>
              <p className="text-lg text-muted-foreground">
                Deep dives into safety, routing, and the people creating better
                daily travel.
              </p>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {filteredFeatured.length ? (
              filteredFeatured.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))
            ) : (
              <p className="text-muted-foreground">
                No featured stories match this topic yet.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Fresh blogs */}
      <section className="container mx-auto">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <Badge variant="outline" className="rounded-full px-3 py-1">
              Latest
            </Badge>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Fresh from the road
            </h2>
            <p className="text-lg text-muted-foreground">
              Quick reads from drivers, riders, and our mobility team.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-8 grid xl:gap-6 gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {filteredLatest.length ? (
            filteredLatest.map((post) => (
              <Card
                key={post.slug}
                className="group h-full overflow-hidden rounded-2xl border bg-background/80 py-0 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative min-h-44 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <Badge
                    variant="secondary"
                    className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide"
                  >
                    {post.category}
                  </Badge>
                </div>

                <CardContent className="flex flex-col gap-3 p-5">
                  {/* Stamps */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3.5" />
                      {post.readTime}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="size-3.5" />
                      {post.date}
                    </span>
                  </div>

                  {/* Heading & description */}
                  <div>
                    <h3 className="text-lg font-semibold leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className=" flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-2 text-sm text-background/70 dark:text-muted-foreground">
                      <User className="size-4" />
                      {post.author}
                    </span>
                    <Link
                      to={`/blogs/${post.slug}`}
                      className="group/link inline-flex items-center gap-2 text-sm font-semibold text-background/90 transition hover:text-background dark:text-card-foreground dark:hover:text-card-foreground"
                    >
                      <Button variant={"ghost"} size={"sm"}>
                        Read story
                        <ArrowUpRight className="size-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground">
              No fresh stories match this topic yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
