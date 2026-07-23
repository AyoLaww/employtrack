"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createApplication, updateApplication } from "@/app/dashboard/actions";
import { useState } from "react";
import type { JobApplication } from "@/lib/db/schema";

interface ApplicationFormProps {
  application?: JobApplication;
  onSuccess?: () => void;
}

export function ApplicationForm({ application, onSuccess }: ApplicationFormProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      if (application) {
        await updateApplication(application.id, formData);
      } else {
        await createApplication(formData);
      }
      onSuccess?.();
    } catch (error) {
      console.error("Error saving application:", error);
      alert("Failed to save application");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="companyName">Company Name *</Label>
        <Input
          id="companyName"
          name="companyName"
          defaultValue={application?.companyName}
          required
          className="mt-1"
          autoComplete="off"
        />
      </div>

      <div>
        <Label htmlFor="jobTitle">Job Title *</Label>
        <Input
          id="jobTitle"
          name="jobTitle"
          defaultValue={application?.jobTitle}
          required
          className="mt-1"
          autoComplete="off"
        />
      </div>

      {/* <div>
        <Label htmlFor="applicationUrl">Application URL</Label>
        <Input
          id="applicationUrl"
          name="applicationUrl"
          type="url"
          defaultValue={application?.applicationUrl || ""}
          placeholder="https://..."
          className="mt-1"
        />
      </div> */}

      <div>
        <Label htmlFor="status">Status *</Label>
        <Select name="status" defaultValue={application?.status || "applied"}>
          <SelectTrigger className="mt-1">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="applied">Applied</SelectItem>
            <SelectItem value="interviewing">Interviewing</SelectItem>
            <SelectItem value="offer">Offer</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="appliedDate">Applied Date *</Label>
        <Input
          id="appliedDate"
          name="appliedDate"
          type="date"
          defaultValue={
            application?.appliedDate
              ? new Date(application.appliedDate).toISOString().split("T")[0]
              : new Date().toISOString().split("T")[0]
          }
          required
          className="mt-1"
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit" disabled={loading} className="w-full hover:cursor-pointer border-border-gray rounded-[3px] bg-black text-white text-[14px] font-serif">
          {loading ? "Saving..." : application ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}