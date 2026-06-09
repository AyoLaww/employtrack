import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { jobApplications } from "@/lib/db/schema";
import { eq, desc, asc, count, and } from "drizzle-orm"; // added "and"
import { AddApplicationDialog } from "@/components/add-application-dialog";
import { ApplicationsTable } from "@/components/applications-table";
import type { FilterType, SortType } from "@/components/application-filters";
import { redirect } from "next/navigation";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; sort?: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login");
  }

  const params = await searchParams;
  const filter = (params.filter || "all") as FilterType;
  const sort = (params.sort || "latest") as SortType;
  const sortOrder = sort === "earliest" ? asc : desc;

  const [stats, applications] = await Promise.all([
    db
      .select({
        status: jobApplications.status,
        count: count(),
      })
      .from(jobApplications)
      .where(eq(jobApplications.userId, session.user.id))
      .groupBy(jobApplications.status),

    db
      .select()
      .from(jobApplications)
      .where(
        filter === "all"
          ? eq(jobApplications.userId, session.user.id)
          : and(
              eq(jobApplications.userId, session.user.id),
              eq(jobApplications.status, filter)
            )
      )
      .orderBy(sortOrder(jobApplications.appliedDate)),
  ]);

  const getCount = (status: string) =>
    stats.find((s) => s.status === status)?.count ?? 0;
  const totalCount = stats.reduce((sum, s) => sum + s.count, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Track and manage your job applications
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <StatCard title="Total"        value={totalCount}               variant="primary" />
        <StatCard title="Applied"      value={getCount("applied")}      variant="secondary" />
        <StatCard title="Interviewing" value={getCount("interviewing")} variant="warning" />
        <StatCard title="Offer"        value={getCount("offer")}        variant="accent" />
        <StatCard title="Accepted"     value={getCount("accepted")}     variant="success" />
        <StatCard title="Rejected"     value={getCount("rejected")}     variant="destructive" />
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Your Applications</h3>
          <AddApplicationDialog />
        </div>
        <ApplicationsTable
          applications={applications}
          currentFilter={filter}
          currentSort={sort}
        />
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  variant = "primary",
}: {
  title: string;
  value: number;
  variant?: "primary" | "secondary" | "accent" | "warning" | "success" | "destructive";
}) {
  const variants = {
    primary:     "bg-primary/10 text-primary border-primary/20",
    secondary:   "bg-secondary text-secondary-foreground border-border",
    accent:      "bg-accent/10 text-accent border-accent/20",
    warning:     "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
    success:     "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
    destructive: "bg-destructive/10 text-destructive border-destructive/20",
  };

  return (
    <div className={`rounded-lg border p-4 transition-all hover:shadow-md ${variants[variant]}`}>
      <p className="text-sm font-medium opacity-90">{title}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}