export type Member = {
  uid: string;
  name?: string;
  url?: string;
}

export type ExportState = {
  isLayoutExportUid: boolean;
  count: number;
  options: any[];
  arrUID: Member[];
  status: 'continue' | 'stop';
}
