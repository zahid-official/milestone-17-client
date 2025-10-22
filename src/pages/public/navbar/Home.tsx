import CTA from "@/components/modules/Public/home/CTA";
import HeroSection from "@/components/modules/Public/home/HeroSection";
import Overview from "@/components/modules/Public/home/Overview";
import Services from "@/components/modules/Public/home/Services";
import Testimonial from "@/components/modules/Public/home/Testimonial";

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
