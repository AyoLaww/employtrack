"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { jobApplications } from "@/lib/db/schema";
import { updateTag } from "next/cache";
import { eq, and } from "drizzle-orm";

type ApplicationStatus = "applied" | "interviewing" | "offer" | "accepted" | "rejected";

export async function createApplication(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const companyName = formData.get("companyName") as string;
  const jobTitle = formData.get("jobTitle") as string;
  const status = formData.get("status") as ApplicationStatus;
  const appliedDate = formData.get("appliedDate") as string;

  await db.insert(jobApplications).values({
    userId: session.user.id,
    companyName,
    jobTitle,
    status,
    appliedDate: new Date(appliedDate),
  });

  updateTag(`applications-${session.user.id}`);
}

export async function updateApplication(id: string, formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const companyName = formData.get("companyName") as string;
  const jobTitle = formData.get("jobTitle") as string;
  const status = formData.get("status") as ApplicationStatus;
  const appliedDate = formData.get("appliedDate") as string;

  const result = await db
    .update(jobApplications)
    .set({
      companyName,
      jobTitle,
      status,
      appliedDate: new Date(appliedDate),
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(jobApplications.id, id),
        eq(jobApplications.userId, session.user.id)
      )
    )
    .returning({ id: jobApplications.id });

  if (result.length === 0) {
    throw new Error("Application not found or you don't have permission to edit it");
  }

  updateTag(`applications-${session.user.id}`);
}

export async function deleteApplication(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const result = await db
    .delete(jobApplications)
    .where(
      and(
        eq(jobApplications.id, id),
        eq(jobApplications.userId, session.user.id)
      )
    )
    .returning({ id: jobApplications.id });

  if (result.length === 0) {
    throw new Error("Application not found or you don't have permission to delete it");
  }

  updateTag(`applications-${session.user.id}`);
}