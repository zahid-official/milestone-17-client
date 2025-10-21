import { Badge } from "@/components/ui/badge";

const Vission = () => {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Vision */}
      <div className="group flex flex-col justify-between gap-6 rounded-lg bg-muted p-6 shadow-sm transition-all duration-300 hover:shadow-md md:p-8">
        <div className="overflow-hidden rounded-md">
          <img
            src="/public/images/about-1.jpg"
            width={500}
            height={300}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="space-y-3">
          <Badge variant="outline" className="font-medium">
            OUR VISION
          </Badge>
          <p className="text-xl font-medium">
            To create a world where urban mobility is seamless, sustainable and
            accessible to all, transforming the way people move and connect
            within cities.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="relative overflow-hidden rounded-lg shadow-sm">
        <img
          src="/public/images/about-2.jpg"
          width={500}
          height={300}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent">
          <div className="p-6 text-white md:p-8">
            <Badge
              variant="outline"
              className="mb-3 border-white/20 bg-white/10 text-white"
            >
              OUR MISSION
            </Badge>
            <p className="text-xl font-medium">
              Our mission is to transform the way communities move by providing
              safe, reliable and inclusive ride-sharing options that connect
              people and places with purpose.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vission;
