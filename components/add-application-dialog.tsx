"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { ApplicationForm } from "./application-form";

export function AddApplicationDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button className="hover:cursor-pointer border-border-gray rounded-[3px] bg-black text-white text-[14px] font-serif">Add Application</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-[24px] font-serif">Add New Application</DialogTitle>
        </DialogHeader>
        <ApplicationForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}