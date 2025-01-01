"use client";

import React from "react";
import Image from "next/image";

// components
import StatusBadge from "@/components/StatusBadge";
import AppointmentModal from "@/components/AppointmentModal";

// UI
import { ColumnDef } from "@tanstack/react-table";

// utils
import { formatDateTime } from "@/lib/utils";

// constants
import { Doctors } from "@/constants";
import { Appointment } from "@/types/appwrite.types";

// shad table columns
export const columns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => (
      <p className="text-14-medium">{row.original.patient.name}</p>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => (
      <p className="text1-14-regular min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: "primaryPhysician",
    header: () => "Doctor",
    cell: ({ row }) => {
      const doctor = Doctors.find((doc) =>
        doc.name === row.original.primaryPhysician
      );

      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image}
            alt={doctor?.name}
            height={100}
            width={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">
            Dr. {doctor?.name}
          </p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div className="flex gap-1">
          <AppointmentModal
            type="Schedule"
            patientId={appointment.patient.$id}
            userId={appointment.userId}
            appointment={appointment}
          />
          <AppointmentModal
            type="Cancel"
            patientId={appointment.patient.$id}
            userId={appointment.userId}
            appointment={appointment}
          />
        </div>
      );
    },
  },
];
