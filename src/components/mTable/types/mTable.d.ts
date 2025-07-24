export declare namespace IMTable {
  interface IProps {
    columnsConfig: any[];
    title: string;
    tableData?: any[] | undefined;
    autoFetch?: boolean | undefined;
  }
  interface IExpose {
    fetchData: () => Promise<void>;
  }
  interface IEmits {}
}
