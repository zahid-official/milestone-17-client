import CTA from "@/components/modules/Home/CTA";
import HeroSection from "@/components/modules/Home/HeroSection";
import Overview from "@/components/modules/Home/Overview";
import Services from "@/components/modules/Home/Services";
import Testimonial from "@/components/modules/Home/Testimonial";

const Home = () => {
  return (
    <>
      <HeroSection />
      <Overview />
      <Services />
      <Testimonial />
      <CTA/>
    </>
  );
};

export default Home;
