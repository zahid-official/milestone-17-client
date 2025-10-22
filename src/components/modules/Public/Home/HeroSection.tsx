import Icon from "@/components/layout/Icon";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const HeroSection = () => {
  return (
    <section className="relative sm:py-40 py-24 overflow-hidden">
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <img
          alt="background"
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/square-alt-grid.svg"
          className="[mask-image:radial-gradient(75%_75%_at_center,white,transparent)] opacity-90"
        />
      </div>
      <div className="relative z-10 container px-4 mx-auto">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="flex flex-col items-center text-center">
            <div className="rounded-xl bg-background/30 pt-4 -mb-2 shadow-sm backdrop-blur-sm">
              <Icon />
            </div>
            <div>
              <h1 className="mb-6 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight tight text-balance">
                Ride your own way,{" "}
                <span className="text-muted-foreground">Anytime Velocia.</span>
              </h1>
              <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
                Experience seamless ride-sharing with Velocia. Connect with
                trusted drivers in minutes, or start earning by driving on your
                schedule.
              </p>
            </div>
            <div className="mt-7 flex justify-center gap-4">
              <Link to={"/login"}>
                <Button
                  size={"lg"}
                  className="shadow-sm transition-shadow hover:shadow"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
