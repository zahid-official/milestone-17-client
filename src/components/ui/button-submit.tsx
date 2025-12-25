import { LoaderCircleIcon } from "lucide-react";
import type { MouseEventHandler } from "react";
import { Button } from "@/components/ui/button";

interface IProps {
  isLoading: boolean;
  value: string;
  loadingValue: string;
  form?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ButtonSubmit = ({
  isLoading,
  value,
  loadingValue,
  form,
  className,
  type = "submit",
  onClick,
}: IProps) => {
  return (
    <Button
      form={form}
      type={type}
      disabled={isLoading}
      data-loading={isLoading || undefined}
      onClick={onClick}
      className={`w-full disabled:opacity-100 ${className}`}
    >
      {isLoading ? (
        <div className="flex gap-1 items-center justify-center">
          <LoaderCircleIcon
            className="animate-spin"
            size={16}
            aria-hidden="true"
          />
          {loadingValue}
        </div>
      ) : (
        value
      )}
    </Button>
  );
};

export default ButtonSubmit;
