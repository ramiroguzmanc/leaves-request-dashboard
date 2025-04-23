import { api } from "../api"
import { LeaveRequest } from "../models/leaveRequest.models"

export const getLeaveRequests = async () => {
  return api.get<LeaveRequest[]>('/leave_requests')
}
