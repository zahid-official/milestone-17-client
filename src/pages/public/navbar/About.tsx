import Approch from "@/components/modules/public/about/Approch";
import Heading from "@/components/modules/public/about/Heading";
import JoinTeam from "@/components/modules/public/about/JoinTeam";
import Team from "@/components/modules/public/about/Team";
import Vission from "@/components/modules/public/about/Vision";

const About = () => {
  return (
    <section className="container mx-auto bg-background py-16 md:py-24">
      <div className="flex flex-col gap-16 md:gap-24">
        <Heading />
        <Vission />
        <Approch />
        <Team />
        <JoinTeam />
      </div>
    </section>
  );
};

export default About;
