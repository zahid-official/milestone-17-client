import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Bike,
  MapPinned,
  Repeat2,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: MapPinned,
    title: "Set Your Route",
    description:
      "Enter your pickup and destination to find available rides or passengers nearby.",
    image: "/public/images/route.jpg",
    alt: "set your route image",
  },
  {
    icon: Bike,
    title: "Match Instantly",
    description:
      "Our smart algorithm instantly pairs drivers and riders heading the same way.",
    image: "/public/images/driver.jpg",
    alt: "driver matching image",
  },
  {
    icon: Users,
    title: "Connect & Ride",
    description:
      "Communicate securely within the app, plan your ride, and travel together safely.",
    image: "/public/images/connect-rider.jpg",
    alt: "connect and ride image",
  },
  {
    icon: ShieldCheck,
    title: "Ride With Confidence",
    description:
      "All profiles are verified and rated by the community for a safe and trusted experience.",
    image: "/public/images/ride.jpg",
    alt: "ride with confidence image",
  },
  {
    icon: Repeat2,
    title: "Split Costs",
    description:
      "Easily share ride costs through secure payments — making travel affordable for everyone.",
    image: "/public/images/cost.jpg",
    alt: "cost splitting image",
  },
  {
    icon: Zap,
    title: "Save Time & Emissions",
    description:
      "Get where you're going faster while reducing carbon emissions. Smart mobility for all.",
    image: "/public/images/save.jpg",
    alt: "save time and emissions image",
  },
];

// Overview Component
const Overview = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full lg:py-36 sm:py-24 pt-10 pb-24 px-6">
        <h2 className="sm:text-5xl text-4xl md:leading-[1.2] font-semibold tracking-[-0.03em] sm:max-w-xl text-pretty">
          How Velocia Works
        </h2>
        <p className="mt-2 text-muted-foreground text-lg sm:text-xl text-justify">
          Discover a smarter, more connected way to commute. Velocia helps{" "}
          <br className="md:block hidden" />
          riders and drivers team up for efficient, eco-friendly travel.
        </p>
        <div className="mt-10 w-full mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="flex flex-col border rounded-xl overflow-hidden shadow-none pb-0"
            >
              <CardHeader>
                <feature.icon />
                <h4 className=" text-xl font-semibold tracking-tight">
                  {feature.title}
                </h4>
                <p className="mt-1 text-muted-foreground text-[17px]">
                  {feature.description}
                </p>
              </CardHeader>
              <CardContent className="mt-auto px-0 pb-0">
                <div className="h-52 ml-6 rounded-tl-xl">
                  <img
                    src={feature.image}
                    alt={feature.alt || feature.title}
                    className="w-full h-full  rounded-tl-xl object-cover"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
