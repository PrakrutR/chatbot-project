// src/app/dashboard/page.tsx
'use client'
import ProtectedRoute from '../../components/ProtectedRoute'

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
    </ProtectedRoute>
  )
}