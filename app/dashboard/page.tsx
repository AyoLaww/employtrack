import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { jobApplications } from "@/lib/db/schema";
import { eq, desc, asc, count, and } from "drizzle-orm"; // added "and"
import { AddApplicationDialog } from "@/components/add-application-dialog";
import { ApplicationsTable } from "@/components/applications-table";
import type { FilterType, SortType } from "@/components/application-filters";
import { redirect } from "next/navigation";
import { StatCard } from "@/components/stat-card";

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
        <h2 className="text-[72px] font-serif">Hello, {session.user.name}.</h2>
        <p className="mt-1 text-[24px] text-muted-foreground font-sans tracking-tighter">
          Track and manage your job applications
        </p>
      </div>

      <div className="flex flex-row gap-4">
        <StatCard title="Total"        value={totalCount}               variant="Total" />
        <StatCard title="Applied"      value={getCount("applied")}      variant="Applied" />
        <StatCard title="Interviewing" value={getCount("interviewing")} variant="Interviewing" />
        <StatCard title="Offer"        value={getCount("offer")}        variant="Offer" />
        <StatCard title="Accepted"     value={getCount("accepted")}     variant="Accepted" />
        <StatCard title="Rejected"     value={getCount("rejected")}     variant="Rejected" />
      </div>

      <div className="rounded-[3px] border bg-off-white border-border-gray p-[24px]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[24px] font-serif">Your Applications</h3>
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

