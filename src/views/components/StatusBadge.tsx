import { Status } from "@/models/leaveRequest.models"
import { FC } from "react"

interface Props {
  status: Status
}

const colors = {
  [Status.Pending]: 'border-gray-300 text-gray-600 bg-gray-100',
  [Status.Approved]: 'border-green-300 text-green-600 bg-green-100',
  [Status.Rejected]: 'border-red-300 text-red-600 bg-red-100',
  [Status.All]: ''
}

export const StatusBadge: FC<Props> = ({ status }) => {
  return (
    <div className={`border px-2 py-1 rounded lowercase first-letter:uppercase ${colors[status]}`}>
      {status}
    </div>
  )
}
