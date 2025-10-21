import CTA from "@/components/modules/Public/Home/CTA";
import HeroSection from "@/components/modules/Public/Home/HeroSection";
import Overview from "@/components/modules/Public/Home/Overview";
import Services from "@/components/modules/Public/Home/Services";
import Testimonial from "@/components/modules/Public/Home/Testimonial";

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
