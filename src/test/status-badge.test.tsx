import { render } from '@testing-library/react'
import { Status } from '@/models/leaveRequest.models'
import { describe, expect, it } from 'vitest'
import { badgeColors, StatusBadge } from '@/views/components/StatusBadge'

describe('StatusBadge', () => {
  it('renders correct style and text for each status', () => {
    const statuses = [Status.Pending, Status.Approved, Status.Rejected, Status.All]

    statuses.forEach(status => {
      const { getByText } = render(<StatusBadge status={status} />)
      const element = getByText(status)

      expect(element).toBeInTheDocument()
      expect(element).toHaveTextContent(status)

      expect(element).toHaveClass('border')
      expect(element.className).toContain(badgeColors[status])
    })
  })

  it('renders the status with lowercase except first letter capitalized', () => {
    const status = Status.Pending
    const { getByText } = render(<StatusBadge status={status} />)
    const element = getByText(status)

    expect(element.textContent).toBe(status)
  })

  it('matches snapshot', () => {
    const { container } = render(<StatusBadge status={Status.Approved} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
