import DetailedBreakdown from "@/components/modules/Public/features/DetailedBreakdown";
import DiscoverFeatures from "@/components/modules/Public/features/DiscoverFeatures";

const Features = () => {
  return (
    <section className="container mx-auto bg-background py-16 md:py-24">
      <div className="flex flex-col gap-16 md:gap-24">
        <DetailedBreakdown />
        <DiscoverFeatures />
      </div>
    </section>
  );
};

export default Features;
