import { Button } from "@/components/ui/button";
import ButtonSubmit from "@/components/ui/button-submit";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

// Zod schema
const profileZodSchema = z.object({
  // Name
  name: z
    .string({ error: "Name must be string" })
    .min(2, { error: "Name must be at least 2 characters long." })
    .max(50, { error: "Name cannot exceed 50 characters." })
    .trim(),

  // Phone
  phone: z
    .string({ error: "Phone Number must be string" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      error:
        "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .trim(),

  // Address
  address: z
    .string({ error: "Address must be string" })
    .max(200, { error: "Address cannot exceed 200 characters." })
    .trim(),
});

// IProps
interface IProps {
  userInfo: {
    name: string;
    phone: string;
    address: string;
  };
  handleCancel: () => void;
}

// ProfileForm Component
const ProfileForm = ({ userInfo, handleCancel }: IProps) => {
  // State for loading
  const [isLoading, setIsloading] = useState(false);

  // useForm hook
  const form = useForm<z.infer<typeof profileZodSchema>>({
    resolver: zodResolver(profileZodSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    },
  });

  // Handle onSubmit
  const onSubmit = (data: z.infer<typeof profileZodSchema>) => {
    console.log(data);
  };

  // Update form when userInfo is loaded or changed
  useEffect(() => {
    if (userInfo) {
      form.reset({
        name: userInfo.name,
        phone: userInfo.phone,
        address: userInfo.address,
      });
    }
  }, [userInfo, form]);

  return (
    <Card className="border pb-10 shadow-sm bg-card/70 backdrop-blur-sm">
      {/* Card header */}
      <CardHeader className="space-y-1">
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-3xl font-bold">Edit Profile</CardTitle>
            <CardDescription className="text-sm mt-0.5">
              Update your personal information
            </CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={handleCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      {/* Card content */}
      <CardContent className="space-y-5">
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

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Buttons */}
            <div className="flex flex-col-reverse justify-end sm:flex-row gap-2.5">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>

              {/* Submit button */}
              <div>
                <ButtonSubmit
                  isLoading={isLoading}
                  value="Save changes"
                  loadingValue="Saving"
                />
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfileForm;
