import CompletedRidesHistoryTable from "@/components/modules/driver/driverRidesHistory/DriverRidesHistoryTable";
import { useDriverRidesHistoryQuery } from "@/redux/features/driver/driver.api";
import { useState } from "react";

// DriverRidesHistory Component
const DriverRidesHistory = () => {
  // State from react
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<
    "today" | "week" | "month" | "year" | undefined
  >(undefined);

  const limit = 10;

  // RTK Query mutation hooks
  const { data, isLoading } = useDriverRidesHistoryQuery({
    page,
    limit,
    status,
    sort: sortOrder === "desc" ? "-createdAt" : "createdAt",
    searchTerm,
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
      <CompletedRidesHistoryTable
        data={data}
        onPageChange={handlePageChange}
        currentPage={page}
        onStatusChange={handleStatusChange}
        currentStatus={status}
        onSortOrderChange={handleSortOrderChange}
        currentSortOrder={sortOrder}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
      />
    </div>
  );
};

export default DriverRidesHistory;
