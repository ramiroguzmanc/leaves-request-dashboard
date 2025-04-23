export interface LeaveRequest {
  createdAt:     string;
  name:          string;
  type_of_leave: string;
  date_from:     string;
  date_to:       string;
  status:        Status;
  reason:        string;
  id:            string;
}

export enum Status {
  Approved = "APPROVED",
  Pending = "PENDING",
  Rejected = "REJECTED",
  All = "ALL",
}
