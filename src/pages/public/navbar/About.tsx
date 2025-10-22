import Approch from "@/components/modules/Public/about/Approch";
import Heading from "@/components/modules/Public/about/Heading";
import JoinTeam from "@/components/modules/Public/about/JoinTeam";
import Team from "@/components/modules/Public/about/Team";
import Vission from "@/components/modules/Public/about/Vission";

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
