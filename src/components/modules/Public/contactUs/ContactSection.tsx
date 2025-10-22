import { MailIcon, MapPinIcon, MessageCircle, PhoneIcon } from "lucide-react";
import { Link } from "react-router";
import ContactForm from "./ContactForm";

const contactDetails = [
  {
    icon: MailIcon,
    title: "Email",
    description: "Our friendly team is here to help.",
    linkText: "support@velocia.com",
    linkTo: "mailto:support@velocia.com",
  },
  {
    icon: MessageCircle,
    title: "Live chat",
    description: "Our friendly team is here to help.",
    linkText: "Start new chat",
    linkTo: "mailto:support@velocia.com",
  },
  {
    icon: MapPinIcon,
    title: "Office",
    description: "Come say hello at our office HQ.",
    linkText: (
      <>
        100 Smith Street Collingwood <br /> VIC 3066 AU
      </>
    ),
    linkTo: "https://map.google.com",
    target: "_blank",
  },
  {
    icon: PhoneIcon,
    title: "Phone",
    description: "Mon-Fri from 8am to 5pm.",
    linkText: "(+880) 19960-66021",
    linkTo: "tel:+8801996066021",
  },
];

const ContactSection = () => (
  <div className="flex items-center justify-center">
    <div className="w-full mx-auto px-6 xl:px-0">
      {/* Title */}
      <div className="pb-10">
        <b className="text-muted-foreground uppercase font-semibold text-sm">
          Contact Us
        </b>
        <h2 className="my-2 text-3xl md:text-4xl font-semibold tracking-tight">
          Chat with our friendly team!
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground">
          We&apos;d love to hear from you. Please fill out this form or shoot us
          an email.
        </p>
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-2 gap-16 md:gap-16 items-center">
        {/* Form */}
        <ContactForm />

        {/* Contact Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center items-center mx-auto">
          {contactDetails.map((item, idx) => (
            <div key={idx}>
              <div className="h-12 w-12 flex items-center justify-center bg-primary/5 dark:bg-primary/10 text-primary rounded-full">
                <item.icon />
              </div>
              <h3 className="mt-2 font-semibold text-xl">{item.title}</h3>
              <p className="my-0.5 text-muted-foreground">{item.description}</p>
              <Link
                to={item.linkTo}
                className="font-medium text-primary"
                target={item.target}
              >
                {item.linkText}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ContactSection;
