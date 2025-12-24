import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Clock,
  Headset,
  MailIcon,
  MapPinIcon,
  MessageCircle,
  PhoneIcon,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router";
import ContactForm from "./ContactForm";

const contactDetails = [
  {
    icon: MailIcon,
    title: "Email",
    description: "Our friendly team is here to help.",
    linkText: "zahid.official8@gmail.com",
    linkTo: "mailto:zahid.official8@gmail.com",
  },
  {
    icon: MessageCircle,
    title: "Live chat",
    description: "Our friendly team is here to help.",
    linkText: "Start new chat",
    linkTo: "mailto:zahid.official8@gmail.com",
  },
  {
    icon: MapPinIcon,
    title: "Office",
    description: "Come say hello at our office HQ.",
    linkText: <>Secor-7, Uttara, Dhaka</>,
    linkTo: "https://map.google.com",
    target: "_blank",
  },
  {
    icon: PhoneIcon,
    title: "Phone",
    description: "Mon-Fri from 8am to 5pm.",
    linkText: "(+880) 18696-18216",
    linkTo: "tel:+8801869618216",
  },
];

const supportHighlights = [
  {
    icon: Headset,
    title: "Avg response time",
    description: "Under 2 hours for most requests.",
  },
  {
    icon: ShieldCheck,
    title: "Safety support",
    description: "24/7 ride monitoring assistance.",
  },
  {
    icon: Clock,
    title: "Support hours",
    description: "Mon-Fri, 8am to 5pm.",
  },
];

const ContactSection = () => (
  <div className="">
    {/* Title */}
    <div className="pb-10 text-center sm:text-left">
      <Badge variant="outline" className="w-max py-1 rounded-full px-3">
        Contact Us
      </Badge>
      <h1 className="text-pretty text-5xl font-bold tracking-tight lg:text-6xl py-3 ">
        Chat with our friendly team!
      </h1>
      <p className="text-base sm:text-lg text-muted-foreground">
        We&apos;d love to hear from you. Please fill out this form or shoot us
        an email.
      </p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pb-10">
      {supportHighlights.map((item) => (
        <Card
          key={item.title}
          className="border-primary/10 bg-background/70 shadow-sm"
        >
          <CardContent className="flex items-center gap-3 p-4">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/5 text-primary">
              <item.icon className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="text-xs text-muted-foreground">
                {item.description}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>

    {/* Content */}
    <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
      {/* Form */}
      <Card className="rounded-3xl border bg-background/80 shadow-sm">
        <CardContent className="p-6 md:p-9">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold">Send a message</h3>
            <p className="text-muted-foreground">
              Tell us a bit about your ride needs. We reply within 1-2 business
              days.
            </p>
          </div>
          <ContactForm />
        </CardContent>
      </Card>

      {/* Contact Details */}
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {contactDetails.map((item, idx) => (
            <Card
              key={idx}
              className="group border-primary/10 bg-background/70 shadow-sm transition hover:-translate-y-1 hover:border-primary/40"
            >
              <CardContent className="space-y-3 p-5">
                <div className="h-11 w-11 flex items-center justify-center bg-primary/5 dark:bg-primary/10 text-primary rounded-full">
                  <item.icon className="size-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <Link
                  to={item.linkTo}
                  className="text-sm font-semibold text-primary"
                  target={item.target}
                >
                  {item.linkText}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ContactSection;
