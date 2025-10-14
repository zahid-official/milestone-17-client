import RiderHistoryTable from "@/components/modules/user/rideHistory/RiderHistoryTable";
import { useRideHistoryQuery } from "@/redux/features/user/user.api";
import { useState } from "react";

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
    return (
      <div className="flex justify-center items-center py-6">
        <div className="w-8 h-8 border-5 border-black/30 border-t-black dark:border-white/30 dark:border-t-white rounded-full animate-spin" />
      </div>
    );
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
