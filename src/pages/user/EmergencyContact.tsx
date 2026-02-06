/* eslint-disable @typescript-eslint/no-explicit-any */
import ButtonSubmit from "@/components/ui/button-submit";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useProfileInfoQuery,
  useUpdateProfileMutation,
} from "@/redux/features/user/user.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Siren } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

// Zod schema
const emergencyContactZodSchema = z.object({
  // Emergency Contact
  emergencyContact: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .refine((val) => !val || /^(?:\+8801\d{9}|01\d{9})$/.test(val), {
      message:
        "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .optional(),

  // Emergency Contact2
  emergencyContact2: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .refine((val) => !val || /^(?:\+8801\d{9}|01\d{9})$/.test(val), {
      message:
        "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .optional(),
});

// EmergencyContact Component
const EmergencyContact = () => {
  // State for loading
  const [isSaving, setIsSaving] = useState(false);

  // RTK Query mutation hook
  const { data, isLoading: isProfileLoading } = useProfileInfoQuery(undefined);
  const [updateProfile] = useUpdateProfileMutation();
  const userInfo = data?.data;

  // useForm hook
  const form = useForm<z.infer<typeof emergencyContactZodSchema>>({
    resolver: zodResolver(emergencyContactZodSchema),
    defaultValues: {
      emergencyContact: "",
      emergencyContact2: "",
    },
  });

  // Handle onSubmit
  const onSubmit = async (data: z.infer<typeof emergencyContactZodSchema>) => {
    const isMyContact =
      data.emergencyContact === userInfo.phone ||
      data.emergencyContact2 === userInfo.phone;
    if (isMyContact) {
      toast.error("You cannot set your own number as emergency contact");
      return;
    }

    // Check if data has changed
    const isUnchanged =
      data.emergencyContact === userInfo.emergencyContact &&
      data.emergencyContact2 === userInfo.emergencyContact2;

    if (isUnchanged) {
      toast.error("You haven't made any changes.");
      return;
    }

    // Check if data are same
    const isSame = data.emergencyContact === data.emergencyContact2;
    if (isSame) {
      toast.error("Emergency contacts must be different");
      return;
    }
    const contactInfo = { ...data, _id: userInfo._id };

    setIsSaving(true);
    try {
      const result = await updateProfile(contactInfo).unwrap();
      toast.success(
        result.message || "Emergency contacts updated successfully"
      );
      form.reset();
    } catch (error: any) {
      toast.error(
        error?.data?.error[0]?.message ||
          error?.data?.message ||
          "Something went wrong!"
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Update form when userInfo is loaded or changed
  useEffect(() => {
    if (userInfo) {
      form.reset({
        emergencyContact: userInfo?.emergencyContact,
        emergencyContact2: userInfo?.emergencyContact2,
      });
    }
  }, [userInfo, form]);

  if (isProfileLoading) {
    return (
      <div className="flex justify-center items-center min-h-[85vh]">
        <Card className="max-w-lg w-full mx-auto border pb-10 shadow-sm bg-card/70 backdrop-blur-sm">
          <CardHeader className="space-y-2">
            <Skeleton className="h-8 w-56" />
            <Skeleton className="h-4 w-72" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="space-y-3">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <Skeleton className="h-10 w-32 rounded-md" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-[85vh]">
      <Card className="max-w-lg w-full mx-auto border pb-10 shadow-sm bg-card/70 backdrop-blur-sm">
        {/* Card header */}
        <CardHeader className="space-y-1">
          <div className="flex justify-between">
            <div>
              <CardTitle className="text-3xl font-bold flex items-center gap-1">
                <Siren size={30} /> Emergency Contact
              </CardTitle>
              <CardDescription className="text-sm mt-0.5">
                Notify your emergency contacts in case of urgent situations
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        {/* Card content */}
        <CardContent className="space-y-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Emergency Contact */}
              <FormField
                control={form.control}
                name="emergencyContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency Contact - 1</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your contact number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Emergency Contact 2 */}
              <FormField
                control={form.control}
                name="emergencyContact2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emergency Contact - 2</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your contact number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Buttons */}
              <div className="flex flex-col-reverse justify-end sm:flex-row gap-2.5">
                {/* Submit button */}
                <div>
                  <ButtonSubmit
                    isLoading={isSaving}
                    value="Save changes"
                    loadingValue="Saving"
                  />
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyContact;
