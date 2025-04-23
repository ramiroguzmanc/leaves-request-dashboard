import { describe, it, expect } from 'vitest'
import { LeaveRequest, Status } from '../models/leaveRequest.models'
import { updateRequestStatus } from '../views/utils/leaveRequestUtils'

describe('Leave Request Approval and Rejection Logic', () => {

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
      type_of_leave: "Permiso personal",
      date_from: "2023-02-01",
      date_to: "2023-02-05",
      createdAt: "2023-01-15",
      status: Status.Rejected,
      reason: "Trámites personales"
    }
  ]

  it('should change request status to Approved when approved', () => {

    const updatedRequests = updateRequestStatus(mockLeaveRequests, "1", Status.Approved)

    const updatedRequest = updatedRequests.find(req => req.id === "1")
    expect(updatedRequest).toBeDefined()
    expect(updatedRequest?.status).toBe(Status.Approved)

    expect(updatedRequests.find(req => req.id === "2")?.status).toBe(Status.Approved)
    expect(updatedRequests.find(req => req.id === "3")?.status).toBe(Status.Rejected)
  })

  it('should change request status to Rejected when rejected', () => {

    const updatedRequests = updateRequestStatus(mockLeaveRequests, "1", Status.Rejected)

    const updatedRequest = updatedRequests.find(req => req.id === "1")
    expect(updatedRequest).toBeDefined()
    expect(updatedRequest?.status).toBe(Status.Rejected)

    expect(updatedRequests.find(req => req.id === "2")?.status).toBe(Status.Approved)
    expect(updatedRequests.find(req => req.id === "3")?.status).toBe(Status.Rejected)
  })

  it('should not change any status when ID does not exist', () => {
    const updatedRequests = updateRequestStatus(mockLeaveRequests, "nonexistent", Status.Approved)

    expect(updatedRequests.find(req => req.id === "1")?.status).toBe(Status.Pending)
    expect(updatedRequests.find(req => req.id === "2")?.status).toBe(Status.Approved)
    expect(updatedRequests.find(req => req.id === "3")?.status).toBe(Status.Rejected)
  })

  it('should handle multiple changes correctly', () => {
    let updatedRequests = updateRequestStatus(mockLeaveRequests, "1", Status.Approved)

    updatedRequests = updateRequestStatus(updatedRequests, "1", Status.Rejected)

    const updatedRequest = updatedRequests.find(req => req.id === "1")
    expect(updatedRequest).toBeDefined()
    expect(updatedRequest?.status).toBe(Status.Rejected)
  })
})
