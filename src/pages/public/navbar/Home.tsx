import CTA from "@/components/modules/public/home/CTA";
import HeroSection from "@/components/modules/public/home/HeroSection";
import Overview from "@/components/modules/public/home/Overview";
import Services from "@/components/modules/public/home/Services";
import Testimonial from "@/components/modules/public/home/Testimonial";

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
