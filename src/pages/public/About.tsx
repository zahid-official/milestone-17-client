import Approch from "@/components/modules/Public/About/Approch";
import Heading from "@/components/modules/Public/About/Heading";
import Team from "@/components/modules/Public/About/Team";
import Vission from "@/components/modules/Public/About/Vission";

const About = () => {
  return (
    <section className="container mx-auto bg-background py-16 md:py-24">
      <div className="flex flex-col gap-16 md:gap-24">
        <Heading />
        <Vission />
        <Approch />
        <Team />
      </div>
    </section>
  );
};

export default About;
