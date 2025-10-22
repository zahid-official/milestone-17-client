/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonSubmit from "@/components/ui/button-submit";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Zod schema
const contactZodSchema = z.object({
  // Name
  name: z
    .string()
    .min(2, { error: "Name must be at least 2 characters long." })
    .max(50, { error: "Name cannot exceed 50 characters." })
    .trim(),

  // Email
  email: z
    .email()
    .min(5, { error: "Email must be at least 5 characters long." })
    .max(100, { error: "Email cannot exceed 100 characters." })
    .trim(),

  // Email
  message: z
    .string()
    .min(5, { error: "Email must be at least 5 characters long." })
    .max(500, { error: "Email cannot exceed 500 characters." })
    .trim(),
});

// ContactForm Component
const ContactForm = () => {
  // State for loading
  const [isLoading, setIsloading] = useState(false);

  // useForm hook
  const form = useForm<z.infer<typeof contactZodSchema>>({
    resolver: zodResolver(contactZodSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Handle onSubmit
  const onSubmit = async (data: z.infer<typeof contactZodSchema>) => {
    setIsloading(true);

    try {
      console.log(data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      form.reset();
      toast.success("Message sent successfully");
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="grid gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-32"
                    placeholder="Type your message here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit btn */}
          <ButtonSubmit
            isLoading={isLoading}
            value="Send Message"
            loadingValue="Sending Message"
          />
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
