import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { blogPosts } from "@/data/blogs";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Link, useParams } from "react-router";

const BlogDetails = () => {
  const { slug } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <section className="container mx-auto bg-background py-16 md:py-24">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <Badge variant="outline" className="rounded-full px-3 py-1">
            Blog not found
          </Badge>
          <h1 className="text-pretty text-4xl font-bold tracking-tight sm:text-5xl">
            We could not find that story.
          </h1>
          <p className="text-lg text-muted-foreground">
            Try another article from the Velocia blog.
          </p>
          <Button asChild className="rounded-full">
            <Link to="/blogs">Back to Blogs</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto bg-background py-16 md:py-24">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Blogs
        </Link>

        <div className="mt-6 flex flex-col gap-4">
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
        </div>

        <div className="mt-10 overflow-hidden rounded-3xl border">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mt-10 space-y-10 text-lg leading-relaxed">
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
        </div>

        <div className="mt-10 rounded-3xl border bg-muted/40 p-6 sm:p-8">
          <p className="text-lg italic text-muted-foreground">
            &quot;{post.quote.text}&quot;
          </p>
          <div className="mt-4 text-sm font-semibold">
            {post.quote.author} -{" "}
            <span className="text-muted-foreground">{post.quote.role}</span>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-2xl font-semibold tracking-tight">
            Key takeaways
          </h3>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
            {post.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <Separator className="my-12" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;

