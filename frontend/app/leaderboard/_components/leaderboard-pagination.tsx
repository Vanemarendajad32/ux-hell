import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type LeaderboardPaginationProps = {
  currentPage: number;
  onPageChange: (nextPage: number) => void;
  totalPages: number;
};

type PageToken = number | "left-ellipsis" | "right-ellipsis";

function getVisiblePages(currentPage: number, totalPages: number): PageToken[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index);
  }

  const pages: PageToken[] = [0];
  const start = Math.max(1, currentPage - 1);
  const end = Math.min(totalPages - 2, currentPage + 1);

  if (start > 1) {
    pages.push("left-ellipsis");
  }

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  if (end < totalPages - 2) {
    pages.push("right-ellipsis");
  }

  pages.push(totalPages - 1);

  return pages;
}

export default function LeaderboardPagination({
  currentPage,
  onPageChange,
  totalPages,
}: LeaderboardPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <Pagination className="mt-6">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-hidden={currentPage === 0}
            className={currentPage === 0 ? "invisible pointer-events-none" : ""}
            onClick={(event) => {
              event.preventDefault();
              if (currentPage > 0) {
                onPageChange(currentPage - 1);
              }
            }}
          />
        </PaginationItem>

        {visiblePages.map((pageToken) => {
          if (pageToken === "left-ellipsis" || pageToken === "right-ellipsis") {
            return (
              <PaginationItem key={pageToken}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={pageToken}>
              <PaginationLink
                href="#"
                isActive={pageToken === currentPage}
                onClick={(event) => {
                  event.preventDefault();
                  onPageChange(pageToken);
                }}
              >
                {pageToken + 1}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href="#"
            aria-hidden={currentPage >= totalPages - 1}
            className={
              currentPage >= totalPages - 1
                ? "invisible pointer-events-none"
                : ""
            }
            onClick={(event) => {
              event.preventDefault();
              if (currentPage < totalPages - 1) {
                onPageChange(currentPage + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
