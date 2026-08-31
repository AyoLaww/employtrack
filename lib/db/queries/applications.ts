import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { jobApplications } from "@/lib/db/schema";
import { eq, desc, asc, count, and } from "drizzle-orm";
import type { FilterType, SortType } from "@/components/application-filters";

export function getDashboardData(userId: string, filter: FilterType, sort: SortType) {
  return unstable_cache(
    async () => {
      const sortOrder = sort === "earliest" ? asc : desc;

      const [stats, applications] = await Promise.all([
        db
          .select({ status: jobApplications.status, count: count() })
          .from(jobApplications)
          .where(eq(jobApplications.userId, userId))
          .groupBy(jobApplications.status),

        db
          .select()
          .from(jobApplications)
          .where(
            filter === "all"
              ? eq(jobApplications.userId, userId)
              : and(eq(jobApplications.userId, userId), eq(jobApplications.status, filter))
          )
          .orderBy(sortOrder(jobApplications.appliedDate)),
      ]);

      return { stats, applications };
    },

    [`dashboard-${userId}-${filter}-${sort}`],
    { tags: [`applications-${userId}`] }
  )();
}