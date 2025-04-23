import { Option, SegmentedButton, SegmentedButtonItem, Select, SelectDomRef, Table, TableCell, TableHeaderCell, TableHeaderRow, TableRow, Ui5CustomEvent } from "@ui5/webcomponents-react"
import { SelectChangeEventDetail } from "@ui5/webcomponents/dist/Select.js"
import { Fragment, useCallback, useEffect, useRef, useState } from "react"
import { LeaveRequest, Status } from "../models/leaveRequest.models"
import { getLeaveRequests } from "../services"
import { Button } from "./ui/button"
import { CircleCheck, CircleX } from "lucide-react"

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
    <>
      <header className='flex justify-between gap-4 p-4 bg-slate-100 rounded-lg mb-4'>
        <div>
          <h1 className='font-semibold text-sm'>Sort direction:</h1>
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
          <h1 className='font-semibold text-sm'>Date field</h1>
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
          <h1 className='font-semibold text-sm'>Status</h1>
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
      </header>
      <Table
        headerRow={<TableHeaderRow sticky className='border-b bg-slate-200 rounded divide-x divide-slate-300'>
          <TableHeaderCell className='px-2' minWidth='200px'><span>Employee</span></TableHeaderCell>
          <TableHeaderCell className='px-2' minWidth='200px'><span>Type of leave</span></TableHeaderCell>
          <TableHeaderCell className='px-2' minWidth='200px'><span>Date (from - to)</span></TableHeaderCell>
          <TableHeaderCell className='px-2' minWidth='200px'><span>Status</span></TableHeaderCell>
          <TableHeaderCell className='px-2' minWidth='200px'><span>Reason</span></TableHeaderCell>
          <TableHeaderCell className='px-2' minWidth='200px'><span>Actions</span></TableHeaderCell>
        </TableHeaderRow>}
        loading={loading}
      >
        {leaveRequests.map(request => (
          <TableRow className='border-b' key={request.id}>
            <TableCell className='px-2'>
              <span>{request.name}</span>
            </TableCell>
            <TableCell className='px-2'>
              <span>{request.type_of_leave}</span>
            </TableCell>
            <TableCell className='px-2'>
              <span>{request.date_from}</span>
              <span>{request.date_to}</span>
            </TableCell>
            <TableCell className='px-2'>
              <span>{request.status}</span>
            </TableCell>
            <TableCell className='px-2 py-1'>
              <span>{request.reason}</span>
            </TableCell>
            <TableCell className='px-2'>
              {request.status === Status.Pending && (
                <section className='flex items-center justify-center'>
                  <Button
                    onClick={() => changeRequestStatus(request.id, Status.Approved)}
                    variant='link'
                    size='icon'
                    className='text-green-600 hover:text-green-800'
                  >
                    <CircleCheck />
                  </Button>
                  <Button
                    onClick={() => changeRequestStatus(request.id, Status.Rejected)}
                    variant='link'
                    className='text-red-600 hover:text-red-800'
                  >
                    <CircleX />
                  </Button>
                </section>
              )}
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </>
  )
}
