import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { defaultData, Project } from "./mocks";
import { Button } from "./components/ui/button";
import { useState } from "react";

const columnHelper = createColumnHelper<Project>();

const columns = [
  columnHelper.accessor("title", {
    header: () => <div>프로젝트 리스트</div>,
    cell: (info) => (
      <div className="flex items-center space-x-2">
        <span className="text-gray-700">{info.getValue()}</span>
      </div>
    ),
  }),
  columnHelper.accessor("status", {
    header: () => <div>상태</div>,
    cell: (info) => {
      const status = info.getValue();
      const color = status === "배포중" ? "text-green-500" : "text-orange-500";
      return (
        <div className={`flex items-center space-x-2 ${color}`}>
          ● <span>{status}</span>
        </div>
      );
    },
  }),
  columnHelper.accessor("chamberName", {
    header: () => <div>장비명</div>,
    cell: (info) => <span className="text-gray-700">{info.getValue()}</span>,
  }),
  columnHelper.accessor("lotCode", {
    header: () => <div>Lot code</div>,
    cell: (info) => <span className="text-gray-700">{info.getValue()}</span>,
  }),
  columnHelper.accessor("algorithm", {
    header: () => <div>알고리즘</div>,
    cell: (info) => <span className="text-gray-700">{info.getValue()}</span>,
  }),
  columnHelper.accessor("updates", {
    header: undefined,
    cell: (info) => (
      <div className="space-y-1">
        {info.getValue().map((date, index) => (
          <div key={index} className="text-sm text-gray-600">
            {date.name}: {new Date(date.date).toLocaleString()}
          </div>
        ))}
      </div>
    ),
  }),
  columnHelper.accessor("id", {
    header: undefined,
    cell: () => (
      <div className="flex items-center space-x-2">
        <Button className="bg-blue-500 text-white px-4 py-2 rounded">
          시뮬레이션
        </Button>
        <Button className="bg-gray-200 text-black px-4 py-2 rounded">
          배포 중지
        </Button>
      </div>
    ),
  }),
  columnHelper.accessor("id", {
    header: undefined,
    cell: () => (
      <div className="flex items-center space-x-4 text-gray-500">
        <div className="cursor-pointer">설정</div>
        <div className="cursor-pointer">공유</div>
        <div className="cursor-pointer">휴지통</div>
      </div>
    ),
  }),
];

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState(() => [...defaultData]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<
    { id: string; value: unknown }[]
  >([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
  });

  const handleFilterChange = (id: string, value: string) => {
    setColumnFilters((prev) => {
      const existingFilter = prev.find((filter) => filter.id === id);
      if (existingFilter) {
        return prev.map((filter) =>
          filter.id === id ? { ...filter, value } : filter
        );
      }
      return [...prev, { id, value }];
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">프로젝트 리스트</h1>
      <div className="mb-4">
        <label>Global Search</label>
        <input
          placeholder="Search..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div className="grid grid-cols-5 gap-4 mb-4">
        <div>
          <label>프로젝트 리스트</label>
          <input
            placeholder="Search Title..."
            value={
              (columnFilters.find((filter) => filter.id === "title")?.value ||
                "") as string
            }
            onChange={(e) => handleFilterChange("title", e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label>상태</label>
          <input
            placeholder="Search Status..."
            value={
              (columnFilters.find((filter) => filter.id === "status")?.value ||
                "") as string
            }
            onChange={(e) => handleFilterChange("status", e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label>장비명</label>
          <input
            placeholder="Search Chamber Name..."
            value={
              (columnFilters.find((filter) => filter.id === "chamberName")
                ?.value || "") as string
            }
            onChange={(e) => handleFilterChange("chamberName", e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label>Lot code</label>
          <input
            placeholder="Search Lot Code..."
            value={
              (columnFilters.find((filter) => filter.id === "lotCode")?.value ||
                "") as string
            }
            onChange={(e) => handleFilterChange("lotCode", e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label>알고리즘</label>
          <input
            placeholder="Search Algorithm..."
            value={
              (columnFilters.find((filter) => filter.id === "algorithm")
                ?.value || "") as string
            }
            onChange={(e) => handleFilterChange("algorithm", e.target.value)}
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
      </div>
      <table className="w-full border-gray-200">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="text-left text-gray-700">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="py-2 px-4 border-b border-gray-200"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50 transition-colors">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="py-2 px-4 border-b border-gray-200"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
