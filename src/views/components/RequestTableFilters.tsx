import { Status } from "@/models/leaveRequest.models"
import { Option, SegmentedButton, SegmentedButtonItem, Select, SelectDomRef, Ui5CustomEvent } from "@ui5/webcomponents-react"
import { SelectChangeEventDetail } from "@ui5/webcomponents/dist/Select.js"
import { FC } from "react"
import { Fragment } from "react/jsx-runtime"

export type SortDirection = 'ASC' | 'DESC' | 'NONE';
export type SortField = 'date_from' | 'date_to'

interface Props {
  handleSortChange: (event: CustomEvent) => void
  sortDirection: SortDirection
  handleFieldChange: (event: Ui5CustomEvent<SelectDomRef, SelectChangeEventDetail>) => void
  sortField: SortField
  handleStatusChange: (event: Ui5CustomEvent<SelectDomRef, SelectChangeEventDetail>) => void
  status: Status
}

export const RequestTableFilters: FC<Props> = ({
  handleSortChange,
  sortDirection,
  handleFieldChange,
  sortField,
  handleStatusChange,
  status
}) => {
  return (
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
  )
}
