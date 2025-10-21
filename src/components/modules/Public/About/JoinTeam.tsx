import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const JoinTeam = () => {
  return (
    <div className="overflow-hidden rounded-3xl bg-gradient-to-tr from-background/80 to-muted/40 p-6 md:p-10">
      <div className="grid items-center gap-8 md:grid-cols-2 md:gap-10">
        <div>
          <Badge className="mb-6">JOIN THE MOVEMENT</Badge>
          <h2 className="mb-3 text-3xl font-bold md:text-4xl">
            Be a Part of Velocia’s Journey
          </h2>
          <p className="mb-6 text-muted-foreground">
            Whether you're a builder, thinker or visionary — there's a place for
            you at Velocia. Join us as we reimagine the way cities move and help
            shape a smarter, more connected future of mobility.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to={"/contact-us"}>
              <Button size="lg" className="w-full sm:w-max" variant="outline">
                Connect Us
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="relative">
            <img
              src="/public/images/about-3.jpg"
              width={500}
              height={300}
              className="h-full rounded-2xl w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 rounded-lg bg-background p-4 shadow-md backdrop-blur-sm">
              <p className="font-semibold">Join our growing team</p>
              <p className="text-sm text-muted-foreground">Remote & On-site</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinTeam;
