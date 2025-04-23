import { Button } from "@/components/ui/button"
import { LeaveRequest, Status } from "@/models/leaveRequest.models"
import { Table, TableCell, TableHeaderCell, TableHeaderRow, TableRow } from "@ui5/webcomponents-react"
import { CircleCheck, CircleX } from "lucide-react"
import { FC } from "react"

interface Props {
  loading: boolean
  leaveRequests: LeaveRequest[]
  changeRequestStatus: (id: string, status: Status.Approved | Status.Rejected) => void
}

export const LeaveRequestTable: FC<Props> = ({ loading, leaveRequests, changeRequestStatus }) => {
  return (
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
  )
}
