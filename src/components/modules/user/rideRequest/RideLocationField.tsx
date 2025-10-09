/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import type { Control } from "react-hook-form";

interface RideLocationFieldProps {
  control: Control<any>;
  name: string;
  label: string;
  icon: React.ReactNode;
  suggestions: any[];
  loading: boolean;
  onChange: (value: string) => void;
  onSelectSuggestion: (value: string) => void;
}

const RideLocationField = ({
  control,
  name,
  label,
  icon,
  suggestions,
  loading,
  onChange,
  onSelectSuggestion,
}: RideLocationFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative">
          <FormLabel className="text-base font-medium flex items-center gap-1">
            {icon} {label}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                type="text"
                placeholder={`Enter ${label.toLowerCase()}`}
                className="pl-9 h-14 text-base bg-background border-2 focus-visible:ring-2"
                onChange={(e) => {
                  field.onChange(e);
                  onChange(e.target.value);
                }}
              />
              {loading && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />
              )}
              {suggestions.length > 0 && (
                <ul className="absolute z-20 bg-popover border rounded-lg mt-1 shadow-md max-h-56 overflow-y-auto w-full">
                  {suggestions.map((s, i) => (
                    <li
                      key={i}
                      className="px-3 py-2 hover:bg-accent cursor-pointer text-sm"
                      onClick={() => onSelectSuggestion(s.label)}
                    >
                      {s.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RideLocationField;
