import { LeaveRequest, Status } from "@/models/leaveRequest.models"
import { SortDirection, SortField } from "@/views/components/RequestTableFilters"

export const filterAndSortRequests = (
  data: LeaveRequest[],
  field: SortField,
  direction: SortDirection,
  statusFilter: Status
): LeaveRequest[] => {
  let filteredRequests = [...data]
  if (statusFilter !== Status.All) {
    filteredRequests = filteredRequests.filter(request => request.status === statusFilter)
  }

  if (direction === 'NONE') {
    return filteredRequests
  }

  return filteredRequests.sort((a, b) => {
    const dateA = new Date(a[field]).getTime()
    const dateB = new Date(b[field]).getTime()

    return direction === 'ASC' ? dateA - dateB : dateB - dateA
  })
}
