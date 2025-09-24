import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function GovernanceLoading() {
  return (
    <DashboardLayout userRole="buyer">
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48 bg-slate-700" />
            <Skeleton className="h-4 w-96 bg-slate-700" />
          </div>
          <Skeleton className="h-10 w-32 bg-slate-700" />
        </div>

        {/* Voting Power Card Skeleton */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-5 w-32 bg-slate-700" />
                <Skeleton className="h-4 w-64 bg-slate-700" />
              </div>
              <div className="text-right space-y-1">
                <Skeleton className="h-8 w-20 bg-slate-700" />
                <Skeleton className="h-4 w-16 bg-slate-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-10 w-full bg-slate-700" />

          {/* Proposal Cards Skeleton */}
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-64 bg-slate-700" />
                      <Skeleton className="h-5 w-20 bg-slate-700" />
                    </div>
                    <Skeleton className="h-4 w-full bg-slate-700" />
                    <Skeleton className="h-4 w-3/4 bg-slate-700" />
                    <div className="flex gap-4">
                      <Skeleton className="h-4 w-24 bg-slate-700" />
                      <Skeleton className="h-4 w-20 bg-slate-700" />
                      <Skeleton className="h-4 w-28 bg-slate-700" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-16 bg-slate-700" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full bg-slate-700" />
                  <Skeleton className="h-2 w-full bg-slate-700" />
                  <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-8 bg-slate-700" />
                    <Skeleton className="h-8 bg-slate-700" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Skeleton className="h-10 flex-1 bg-slate-700" />
                  <Skeleton className="h-10 flex-1 bg-slate-700" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
