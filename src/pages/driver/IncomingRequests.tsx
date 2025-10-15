import IncomingRequestsTable from "@/components/modules/driver/incomingRequests/IncomingRequestsTable";
import { useAllIncomingRequestsQuery } from "@/redux/features/driver/driver.api";
import { useState } from "react";

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
    return (
      <div className="flex justify-center items-center py-6">
        <div className="w-8 h-8 border-5 border-black/30 border-t-black dark:border-white/30 dark:border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <IncomingRequestsTable
        data={data}
        onPageChange={handlePageChange}
        currentPage={page}
        onSortOrderChange={handleSortOrderChange}
        currentSortOrder={sortOrder}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
    </div>
  );
};

export default IncomingRequests;
