// tests/filterAndSortRequests.test.ts
import { describe, it, expect } from 'vitest'
import { LeaveRequest, Status } from '../models/leaveRequest.models'
import { filterAndSortRequests } from '@/views/utils/filterAndSortRequests'

const mockLeaveRequests: LeaveRequest[] = [
  {
    id: "1",
    name: "Juan Pérez",
    type_of_leave: "Vacaciones",
    date_from: "2023-01-01",
    date_to: "2023-01-10",
    createdAt: "2022-12-15",
    status: Status.Pending,
    reason: "Viaje familiar"
  },
  {
    id: "2",
    name: "Ana Gómez",
    type_of_leave: "Enfermedad",
    date_from: "2023-03-01",
    date_to: "2023-03-05",
    createdAt: "2023-02-20",
    status: Status.Approved,
    reason: "Reposo médico"
  },
  {
    id: "3",
    name: "Carlos Ruiz",
    type_of_leave: "Vacaciones",
    date_from: "2023-02-01",
    date_to: "2023-02-10",
    createdAt: "2023-01-10",
    status: Status.Pending,
    reason: "Viaje"
  }
]

describe('filterAndSortRequests', () => {
  it('should filter by status', () => {
    const result = filterAndSortRequests(mockLeaveRequests, 'date_from', 'NONE', Status.Pending)
    expect(result).toHaveLength(2)
    expect(result.every(r => r.status === Status.Pending)).toBe(true)
  })

  it('should sort ascending', () => {
    const result = filterAndSortRequests(mockLeaveRequests, 'date_from', 'ASC', Status.All)
    expect(result[0].id).toBe('1')
    expect(result[1].id).toBe('3')
    expect(result[2].id).toBe('2')
  })

  it('should sort descending', () => {
    const result = filterAndSortRequests(mockLeaveRequests, 'date_from', 'DESC', Status.All)
    expect(result[0].id).toBe('2')
    expect(result[1].id).toBe('3')
    expect(result[2].id).toBe('1')
  })
})
