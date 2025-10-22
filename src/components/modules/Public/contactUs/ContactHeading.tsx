import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Adjust the path as needed
import { ArrowDownRight, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const ContactHeading = () => {
  return (
    <div className="text-center px-4 py-12">
      <div>
        <Badge variant="outline" className="w-max py-1 rounded-full px-3">
          Let's Do Something Amazing
          <ArrowDownRight className="size-4" />
        </Badge>
      </div>

      <h1 className="my-6 text-pretty text-4xl font-bold tracking-tight lg:text-6xl">
        Drop us a Line, <span className="relative text-primary">Any Time</span>
      </h1>

      <p className="mx-auto mb-8 max-w-[700px] text-lg text-muted-foreground">
        Whether you have a question, feedback or just want to say hello, just
        drop us a line anytime. Our team is here to help and we&apos;d love to
        hear from you!
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link to={"mailto:support@velocia.com"}>
          <Button className="h-11 px-8 gap-2 group">
            Send us a email
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>

        <Link to="https://discordapp.com/users/1251522037080391791">
          <Button variant="outline" className="h-11 px-8 gap-2">
            Join our Discord
          </Button>
        </Link>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Response time: Usually within 2 hours
      </p>
    </div>
  );
};

export default ContactHeading;
