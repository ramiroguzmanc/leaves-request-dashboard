import { Option, SegmentedButton, SegmentedButtonItem, Select, SelectDomRef, Table, TableCell, TableHeaderCell, TableHeaderRow, TableRow, Ui5CustomEvent } from "@ui5/webcomponents-react"
import { SelectChangeEventDetail } from "@ui5/webcomponents/dist/Select.js"
import { Fragment, useCallback, useEffect, useRef, useState } from "react"
import { LeaveRequest, Status } from "../models/leaveRequest.models"
import { getLeaveRequests } from "../services"

type SortDirection = 'ASC' | 'DESC' | 'NONE';
type SortField = 'date_from' | 'date_to'

export const LeaveRequestTable = () => {
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

  const filterAndSortRequests = useCallback(
    (
      field: SortField = sortField,
      direction: SortDirection = sortDirection,
      statusFilter: Status = status
    ) => {
      let filteredRequests = [...initialLeaveRequests.current]
      if (statusFilter !== Status.All) {
        filteredRequests = filteredRequests.filter(request => request.status === statusFilter)
      }

      if (direction === 'NONE') {
        setLeaveRequests(filteredRequests)
        return
      }
      const sortedRequests = [...filteredRequests].sort((a, b) => {
        const dateA = new Date(a[field]).getTime();
        const dateB = new Date(b[field]).getTime();

        if (direction === 'ASC') {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      });

      setLeaveRequests(sortedRequests)
    },
    [sortField, sortDirection, status]
  )

  const changeRequestStatus = (id: string, status: Status.Approved | Status.Rejected) => {
    setLeaveRequests(prevRequests => {
      const updatedRequests = prevRequests.map(request => {
        if (request.id === id) {
          return {
            ...request,
            status: status
          }
        }
        return request
      })
      return updatedRequests
    })
  }

  useEffect(() => {
    fetchLeaveRequests()
  }, [])

  useEffect(() => {
    filterAndSortRequests()
  }, [filterAndSortRequests])

  return (
    <section>
      <div>
        <h1>Sort direction:</h1>
        <SegmentedButton
          accessibleName='Sort direction'
          onSelectionChange={handleSortChange}
        >
          <Fragment key='.0'>
            <SegmentedButtonItem data-key='ASC'  selected={sortDirection === 'ASC'}>
              ASC
            </SegmentedButtonItem>
            <SegmentedButtonItem data-key='DESC' selected={sortDirection === 'DESC'}>
              DESC
            </SegmentedButtonItem>
            <SegmentedButtonItem data-key='NONE' selected={sortDirection === 'NONE'}>
              NONE
            </SegmentedButtonItem>
          </Fragment>
        </SegmentedButton>
      </div>
      <div>
        <h1>Date field</h1>
        <Select
          onChange={handleFieldChange}
        >
          <Option data-key='date_from' selected={sortField === 'date_from'}>
            Date from
          </Option>
          <Option data-key='date_to' selected={sortField === 'date_to'}>
            Date to
          </Option>
        </Select>
      </div>

      <div>
        <h1>Status</h1>
        <Select
          onChange={handleStatusChange}>
          <Option data-key='ALL' selected={status === Status.All}>
            All
          </Option>
          <Option data-key='PENDING' selected={status === Status.Pending}>
            Pending
          </Option>
          <Option data-key='APPROVED' selected={status === Status.Approved}>
            Approved
          </Option>
          <Option data-key='REJECTED' selected={status === Status.Rejected}>
            Rejected
          </Option>
        </Select>
      </div>
      <Table
        headerRow={<TableHeaderRow sticky>
          <TableHeaderCell minWidth='200px'><span>Employee</span></TableHeaderCell>
          <TableHeaderCell minWidth='200px'><span>Type of leave</span></TableHeaderCell>
          <TableHeaderCell minWidth='200px'><span>Date (from - to)</span></TableHeaderCell>
          <TableHeaderCell minWidth='200px'><span>Status</span></TableHeaderCell>
          <TableHeaderCell minWidth='200px'><span>Reason</span></TableHeaderCell>
          <TableHeaderCell minWidth='200px'><span>Actions</span></TableHeaderCell>
        </TableHeaderRow>}
        loading={loading}
      >
        {leaveRequests.map(request => (
          <TableRow key={request.id}>
            <TableCell>
              <span>{request.name}</span>
            </TableCell>
            <TableCell>
              <span>{request.type_of_leave}</span>
            </TableCell>
            <TableCell>
              <span>{request.date_from}</span>
              <span>{request.date_to}</span>
            </TableCell>
            <TableCell>
              <span>{request.status}</span>
            </TableCell>
            <TableCell>
              <span>{request.reason}</span>
            </TableCell>
            <TableCell>
              {request.status === Status.Pending && (
                <section>
                  <button onClick={() => changeRequestStatus(request.id, Status.Approved)}>A</button>
                  <button onClick={() => changeRequestStatus(request.id, Status.Rejected)}>D</button>
                </section>
              )}
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </section>
  )
}
