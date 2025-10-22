import {
  LockKeyholeIcon,
  SearchIcon,
  ShieldBanIcon,
  SmartphoneIcon,
  StarIcon,
  SwatchBookIcon,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

import { cn } from "@/lib/utils";

const featuresList = [
  {
    icon: SearchIcon,
    title: "Real-time Tracking",
    description:
      "Riders and drivers can monitor live locations, get accurate ETAs, and ensure smoother pickups.",
  },
  {
    icon: SwatchBookIcon,
    title: "Flexible Scheduling",
    description:
      "Book or accept rides at your convenience. Designed for both full-time and on-demand usage.",
  },
  {
    icon: LockKeyholeIcon,
    title: "Secure Payments",
    description:
      "Integrated payment systems with full encryption to keep your transactions and data safe.",
  },
  {
    icon: StarIcon,
    title: "Driver Performance",
    description:
      "Track earnings, receive feedback, and monitor trip history through intuitive dashboards.",
  },
  {
    icon: ShieldBanIcon,
    title: "Rider Safety",
    description:
      "Your safety matters — emergency assistance, trip sharing, and trusted contacts built-in.",
  },
  {
    icon: SmartphoneIcon,
    title: "Mobile-first Design",
    description:
      "Enjoy the full Velocia experience directly from your phone, whether you ride, drive, or manage.",
  },
];

// DiscoverFeatures Component
const DiscoverFeatures = () => {
  return (
    <section className="">
      <div className="mx-auto max-w-7xl px-4 pt-8">
        {/* Header */}
        <div className="space-y-2.5 mb-10">
          <h2 className="font-semibold text-3xl lg:text-4xl">
            Discover What Makes Velocia Different
          </h2>
          <p className="text-muted-foreground text-xl">
            From smart ride tracking to powerful admin tools, explore features
            that move people, safely and efficiently.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuresList.map((features, index) => (
            <Card
              key={index}
              className={cn(
                "shadow-none transition-colors duration-300",
                "border-primary/20 hover:border-primary/70"
              )}
            >
              <CardContent>
                <Avatar
                  className={cn("mb-4 size-10 rounded-md", "text-primary")}
                >
                  <AvatarFallback
                    className={cn("rounded-md [&>svg]:size-6", "bg-primary/10")}
                  >
                    <features.icon />
                  </AvatarFallback>
                </Avatar>
                <h6 className="mb-2 text-lg font-semibold">{features.title}</h6>
                <p className="text-muted-foreground">{features.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoverFeatures;
