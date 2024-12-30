import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
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
  const [data, setData] = useState(() => [...defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">프로젝트 리스트</h1>
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
