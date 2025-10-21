import { Badge } from "@/components/ui/badge";
import { ArrowDownRight } from "lucide-react";

const Heading = () => {
  return (
    <div>
      {/* Title */}
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <Badge variant="outline" className="w-max py-1 rounded-full px-3">
          About Velocia
          <ArrowDownRight className="size-4" />
        </Badge>
        <h1 className="text-pretty text-4xl font-bold tracking-tight lg:text-6xl">
          Revolutionizing the{" "}
          <span className="relative text-primary">Future of Mobility</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Velocia is revolutionizing urban mobility by connecting riders and
          drivers for faster, greener and smarter travel. Join us on the road to
          a more sustainable future.
        </p>
      </div>
    </div>
  );
};

export default Heading;
