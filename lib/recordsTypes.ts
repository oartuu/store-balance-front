export interface DayRecordResponse {
  id: string;
  date: string;
  isOpen: boolean;
  companyId: string;
  createdAt: string;
  finishedAt: any;
  records: Record[];
}

export interface Record {
  id: string;
  title: string;
  type: string;
  total: number;
  userId: string;
  dayRecordId: string;
  createdAt: string;
  items: Item[];
}

export interface Item {
  id: string;
  title: string;
  price: number;
  recordId: string;
}
export interface RecordItem {
  id: string;
  title: string;
  price: number;
}
