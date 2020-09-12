export interface Log {
  MobileUserId: string;
  MobileDomain: string;
  Branch: string;
  OperationName: string;
  Status: string;
  Category: string;
  ExceptionType: string;
  ExceptionName: string;
  StartTime: string;
  EndTime: string;
  Duration: number;
  Inputs: string;
  Outputs: string;
}