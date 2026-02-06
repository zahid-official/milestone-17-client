import CTA from "@/components/modules/public/home/CTA";
import CoreListings from "@/components/modules/public/home/CoreListings";
import HeroSection from "@/components/modules/public/home/HeroSection";
import Insights from "@/components/modules/public/home/Insights";
import Offers from "@/components/modules/public/home/Offers";
import Overview from "@/components/modules/public/home/Overview";
import Services from "@/components/modules/public/home/Services";
import Testimonial from "@/components/modules/public/home/Testimonial";
import WhyVelocia from "@/components/modules/public/home/WhyVelocia";

const Home = () => {
  return (
    <>
      <HeroSection />
      <WhyVelocia />
      <CoreListings />
      <Insights />
      <Overview />
      <Services />
      <Testimonial />
      <Offers />
      <CTA />
    </>
  );
};

export default Home;
