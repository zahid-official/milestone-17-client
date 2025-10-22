// src/components/FAQ.jsx

import {
  Car,
  CreditCard,
  ShieldCheck,
  MapPin,
  UserCheck,
  Clock,
} from "lucide-react";

const faqs = [
  {
    icon: <Car />,
    question: "What is Velocia and how does it work?",
    subtitle: "A smart and safe way to get around your city",
    answer:
      "Velocia is a ride-sharing platform that connects riders with drivers via our mobile app. Simply open the app, enter your destination, choose your ride type, and get picked up in minutes. We offer safe, reliable, and affordable transportation for everyday travel.",
  },
  {
    icon: <CreditCard />,
    question: "What are the available payment methods?",
    subtitle: "Seamless and secure payment options for every ride",
    answer:
      "We accept all major credit and debit cards, digital wallets, and in-app payments. You can also set up automatic billing for faster checkouts. Your payment details are encrypted and securely stored for your protection.",
  },
  {
    icon: <ShieldCheck />,
    question: "Is riding with Velocia safe?",
    subtitle: "Safety is our top priority for riders and drivers",
    answer:
      "Yes, safety is built into every part of the Velocia experience. All drivers undergo background checks, vehicle inspections, and ongoing safety training. Real-time GPS tracking, emergency assistance features, and 24/7 support help ensure a safe ride every time.",
  },
  {
    icon: <MapPin />,
    question: "Can I choose my pickup and drop-off locations?",
    subtitle: "Door-to-door service at your fingertips",
    answer:
      "Absolutely. You can set your exact pickup and drop-off points in the Velocia app. Whether you're at home, work, or a specific street corner, just pin the location and your driver will meet you there.",
  },
  {
    icon: <UserCheck />,
    question: "How are drivers selected and vetted?",
    subtitle: "Only verified and trained drivers join Velocia",
    answer:
      "Our drivers go through a multi-step vetting process that includes identity verification, driving history checks, background screening, and in-person interviews. We also provide regular training and performance reviews to maintain high service standards.",
  },
  {
    icon: <Clock />,
    question: "Can I schedule rides in advance?",
    subtitle: "Plan ahead for stress-free travel",
    answer:
      "Yes, Velocia allows you to schedule rides in advance. Whether it's a ride to the airport or a pickup after a meeting, simply select the 'Schedule Ride' option in the app and choose your date and time.",
  },
];

// FAQ Component
const FAQ = () => {
  return (
    <section className="py-8 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center sm:mb-12">
          <h2 className="relative inline-block text-pretty text-4xl font-bold tracking-tight lg:text-6xl md:text-3xl">
            <span className="relative z-10">
              Frequently Asked
              <span className="bg-primary absolute bottom-1 left-0 -z-10 h-px w-full"></span>
            </span>{" "}
            <span>Questions</span>
          </h2>
          <p className="text-muted-foreground text-xl">
            Everything you need to know about using Velocia for your daily rides
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-16 gap-y-6 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <div key={index} className="space-y-4 p-6">
              <div className="flex gap-4">
                <div className="relative flex shrink-0 overflow-hidden size-[42px] rounded-sm">
                  <div className="flex size-full items-center justify-center bg-primary/10 text-primary rounded-sm">
                    {faq.icon}
                  </div>
                </div>
                <div>
                  <h3 className="mb-0.5 text-xl font-medium">{faq.question}</h3>
                  <p className="text-muted-foreground text-sm">
                    {faq.subtitle}
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
