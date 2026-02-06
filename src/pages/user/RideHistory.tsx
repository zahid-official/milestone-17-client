import RiderHistoryTable from "@/components/modules/user/rideHistory/RiderHistoryTable";
import { Skeleton } from "@/components/ui/skeleton";
import { useRideHistoryQuery } from "@/redux/features/user/user.api";
import { useState } from "react";

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

// RideHistory Component
const RideHistory = () => {
  // State from react
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [minFare, setMinFare] = useState<number | undefined>(undefined);
  const [maxFare, setMaxFare] = useState<number | undefined>(undefined);
  const [dateRange, setDateRange] = useState<
    "today" | "week" | "month" | "year" | undefined
  >(undefined);

  const limit = 10;

  // RTK Query mutation hooks
  const { data, isLoading } = useRideHistoryQuery({
    page,
    limit,
    status,
    sort: sortOrder === "desc" ? "-createdAt" : "createdAt",
    searchTerm,
    minFare,
    maxFare,
    dateRange,
  });

  // Handle pageChange
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Handle statusChange
  const handleStatusChange = (newStatus: string | undefined) => {
    setPage(1);
    setStatus(newStatus);
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

  // Handle minFare change
  const handleMinFareChange = (value: string) => {
    setPage(1);
    if (value === "" || value === null) {
      setMinFare(undefined);
    } else {
      const parsed = Number(value);
      if (!isNaN(parsed) && parsed >= 0) {
        setMinFare(parsed);
      }
    }
  };

  // Handle maxFare change
  const handleMaxFareChange = (value: string) => {
    setPage(1);
    if (value === "" || value === null) {
      setMaxFare(undefined);
    } else {
      const parsed = Number(value);
      if (!isNaN(parsed) && parsed >= 0) {
        setMaxFare(parsed);
      }
    }
  };

  // Handle date range change
  const handleDateRangeChange = (
    newDateRange: "today" | "week" | "month" | "year" | undefined
  ) => {
    setPage(1);
    setDateRange(newDateRange);
  };

  // Loader
  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div>
      <RiderHistoryTable
        data={data}
        onPageChange={handlePageChange}
        currentPage={page}
        onStatusChange={handleStatusChange}
        currentStatus={status}
        onSortOrderChange={handleSortOrderChange}
        currentSortOrder={sortOrder}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        minFare={minFare}
        maxFare={maxFare}
        onMinFareChange={handleMinFareChange}
        onMaxFareChange={handleMaxFareChange}
        dateRange={dateRange} 
        onDateRangeChange={handleDateRangeChange} 
      />
    </div>
  );
};

export default RideHistory;
