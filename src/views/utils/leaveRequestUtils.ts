import { LeaveRequest, Status } from "../../models/leaveRequest.models"

export const updateRequestStatus = (
  requests: LeaveRequest[],
  id: string,
  status: Status.Approved | Status.Rejected
): LeaveRequest[] => {
  return requests.map(request => {
    if (request.id === id) {
      return {
        ...request,
        status
      }
    }
    return request
  })
}
