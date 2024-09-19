// src/app/dashboard/page.tsx
import { Suspense } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';

export const dynamic = 'force-dynamic';

export default function Dashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProtectedRoute>
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard!</p>
      </ProtectedRoute>
    </Suspense>
  );
}
