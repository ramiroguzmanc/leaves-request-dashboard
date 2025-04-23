import { RequestTableFilters, SortDirection, SortField } from "@/views/components/RequestTableFilters"
import { SelectDomRef, Ui5CustomEvent } from "@ui5/webcomponents-react"
import { SelectChangeEventDetail } from "@ui5/webcomponents/dist/Select.js"
import { useEffect, useRef, useState } from "react"
import { LeaveRequest, Status } from "../models/leaveRequest.models"
import { getLeaveRequests } from "../services"
import { LeaveRequestTable } from "./components/LeaveRequestTable"
import { filterAndSortRequests } from "./utils/filterAndSortRequests"
import { updateRequestStatus } from "./utils/leaveRequestUtils"

export const LeaveRequestView = () => {
  const [loading, setLoading] = useState(true)
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([])
  const [sortDirection, setSortDirection] = useState<SortDirection>('NONE')
  const [sortField, setSortField] = useState<SortField>('date_from')
  const [status, setStatus] = useState<Status>(Status.All)
  const initialLeaveRequests = useRef<LeaveRequest[]>([])

  const fetchLeaveRequests = async () => {
    try {
      const { data } = await getLeaveRequests()
      setLeaveRequests(data)
      initialLeaveRequests.current = data
    } catch (error) {
      console.error("Error fetching leave requests:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSortChange = (event: CustomEvent) => {
    const selectedDirection = event.detail.selectedItems[0];
    const selectedKey = selectedDirection.getAttribute('data-key')
    setSortDirection(selectedKey as SortDirection)
  }

  const handleFieldChange = (event: Ui5CustomEvent<SelectDomRef, SelectChangeEventDetail>) => {
    const selectedField = event.detail.selectedOption.getAttribute('data-key')
    setSortField(selectedField as SortField)
  }

  const handleStatusChange = (event: Ui5CustomEvent<SelectDomRef, SelectChangeEventDetail>) => {
    const selectedStatus = event.detail.selectedOption.getAttribute('data-key')
    setStatus(selectedStatus as Status)
  }

  const changeRequestStatus = (id: string, status: Status.Approved | Status.Rejected) => {
    setLeaveRequests(prevRequests => {
      const updatedRequests = updateRequestStatus(prevRequests, id, status)
      return updatedRequests
    })
  }

  useEffect(() => {
    fetchLeaveRequests()
  }, [])

  useEffect(() => {
    const filtered = filterAndSortRequests(
      initialLeaveRequests.current,
      sortField,
      sortDirection,
      status
    )
    setLeaveRequests(filtered)
  }, [sortField, sortDirection, status])

  return (
    <>
      <RequestTableFilters
        handleSortChange={handleSortChange}
        sortDirection={sortDirection}
        handleFieldChange={handleFieldChange}
        sortField={sortField}
        handleStatusChange={handleStatusChange}
        status={status}
      />
      <LeaveRequestTable
        loading={loading}
        leaveRequests={leaveRequests}
        changeRequestStatus={changeRequestStatus}
      />
    </>
  )
}
