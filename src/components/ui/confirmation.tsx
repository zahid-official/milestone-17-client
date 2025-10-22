/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { ReactNode } from "react";
import { toast } from "sonner";

// IProps interface
interface IProps {
  children: ReactNode;
  mutationFn: () => Promise<any>;
  successMessage?: string;
}

// Confirmation Component
const Confirmation = ({ children, mutationFn, successMessage }: IProps) => {
  const handleConfirm = async () => {
    try {
      const result = await mutationFn();
      if (result.success) {
        toast.success(result.message || successMessage);
      }
    } catch (error: any) {
      toast.error(error.data.message || "Something went wrong!");
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently change the
              data in our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Confirmation;
