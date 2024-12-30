export type Project = {
  id: number;
  title: string;
  status: "배포중" | "배포완료" | "배포전";
  chamberName: string;
  lotCode: string;
  algorithm: string;
  updates: {
    name: string;
    date: Date;
  }[];
};

export const defaultData: Project[] = [
  {
    id: 1,
    title: "project 01",
    status: "배포중",
    chamberName: "jangbi_name_001",
    lotCode: "lot_code_001",
    algorithm: "Algorithm Name",
    updates: [
      { name: "업데이트 A", date: new Date("2024-12-16T17:24:32") },
      { name: "업데이트 B", date: new Date("2024-12-12T22:34:02") },
      { name: "업데이트 C", date: new Date("2024-11-26T00:14:42") },
    ],
  },
  {
    id: 2,
    title: "project 02",
    status: "배포전",
    chamberName: "jangbi_name_001",
    lotCode: "lot_code_001",
    algorithm: "Algorithm Name",
    updates: [
      { name: "업데이트 A", date: new Date("2024-12-16T17:24:32") },
      { name: "업데이트 B", date: new Date("2024-12-12T22:34:02") },
      { name: "업데이트 C", date: new Date("2024-11-26T00:14:42") },
    ],
  },
  {
    id: 3,
    title: "project 03",
    status: "배포중",
    chamberName: "jangbi_name_003",
    lotCode: "lot_code_003",
    algorithm: "Algorithm Name",
    updates: [
      { name: "업데이트 A", date: new Date("2024-12-16T17:24:32") },
      { name: "업데이트 B", date: new Date("2024-12-12T22:34:02") },
      { name: "업데이트 C", date: new Date("2024-11-26T00:14:42") },
    ],
  },
  {
    id: 4,
    title: "project 04",
    status: "배포전",
    chamberName: "jangbi_name_001",
    lotCode: "lot_code_001",
    algorithm: "Algorithm Name",
    updates: [
      { name: "업데이트 A", date: new Date("2024-12-16T17:24:32") },
      { name: "업데이트 B", date: new Date("2024-12-12T22:34:02") },
      { name: "업데이트 C", date: new Date("2024-11-26T00:14:42") },
    ],
  },
  {
    id: 5,
    title: "project 05",
    status: "배포중",
    chamberName: "jangbi_name_001",
    lotCode: "lot_code_001",
    algorithm: "Algorithm Name",
    updates: [
      { name: "업데이트 A", date: new Date("2024-12-16T17:24:32") },
      { name: "업데이트 B", date: new Date("2024-12-12T22:34:02") },
      { name: "업데이트 C", date: new Date("2024-11-26T00:14:42") },
    ],
  },
];
