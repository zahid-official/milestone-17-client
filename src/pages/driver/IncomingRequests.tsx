import IncomingRequestsTable from "@/components/modules/driver/incomingRequests/IncomingRequestsTable";
import { useAllIncomingRequestsQuery } from "@/redux/features/driver/driver.api";
import { useState } from "react";
import { useProfileInfoQuery } from "@/redux/features/user/user.api";
import availability from "@/constants/availability";
import { Card } from "@/components/ui/card";
import ToggleAvailability from "./ToggleAvailability";
import { WifiOff } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const TableSkeleton = () => (
  <div className="space-y-4 px-4 py-4">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Skeleton className="h-8 w-40" />
      <Skeleton className="h-8 w-28" />
    </div>
    <div className="space-y-2">
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className="h-12 w-full rounded-lg" />
      ))}
    </div>
    <div className="flex items-center justify-between">
      <Skeleton className="h-8 w-28" />
      <Skeleton className="h-8 w-20" />
    </div>
  </div>
);

// IncomingRequests Component
const IncomingRequests = () => {
  // State from react
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");

  const limit = 10;

  // RTK Query mutation hooks
  const { data, isLoading } = useAllIncomingRequestsQuery({
    page,
    limit,
    sort: sortOrder === "desc" ? "-createdAt" : "createdAt",
    searchTerm,
  });

  // profile info to check availability
  const { data: profileData } = useProfileInfoQuery(undefined);
  const isAvailable = profileData ? profileData.data?.availability === availability.ONLINE : true;

  // Handle pageChange
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Handle sortOrderChange
  const handleSortOrderChange = () => {
    setPage(1);
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  // Handle Search Change
  const handleSearchChange = (value: string) => {
    setPage(1);
    setSearchTerm(value);
  };

  // Loader
  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div>
      {/* If driver is offline, show themed notice with toggle to go online */}
      {!isAvailable ? (
        <div className="max-w-3xl mx-auto mt-8">
          <Card className="border-2 border-muted-foreground/10 bg-surface px-6 py-8">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-lg bg-red-50 dark:bg-red-900/40 flex items-center justify-center">
                  <WifiOff className="w-7 h-7 text-red-600 dark:text-red-300" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">You're Offline</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  You won't receive ride requests while you're offline. Toggle
                  your availability to start receiving incoming requests again.
                </p>
              </div>
              <div className="flex items-center">
                <ToggleAvailability />
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <IncomingRequestsTable
          data={data}
          onPageChange={handlePageChange}
          currentPage={page}
          onSortOrderChange={handleSortOrderChange}
          currentSortOrder={sortOrder}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          isAvailable={isAvailable}
        />
      )}
    </div>
  );
};

export default IncomingRequests;
