import React from "react";
import Image from "next/image";
import Link from "next/link";

// components
import StatCard from "@/components/StatCard";
import { DataTable } from "@/components/table/DataTable";
import { columns, Payment } from "@/components/table/columns";

// server actions
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";

// fake data func

// current component ⚛️
const Admin = async () => {
  // fetch appointment list
  const appointmentData = await getRecentAppointmentList();

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        {/* logo */}
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            height={32}
            width={162}
            className="h-8 w-fit"
          />
        </Link>
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        {/* welcome section */}
        <section className="w-full space-y-4">
          <h1 className="header">Welcome, Admin</h1>
          <p className="text-dark-700">Start managing new appoitments</p>
        </section>

        {/* stat cards */}
        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointmentData.scheduledCount}
            label="Scheduled appointments"
            icon="/assets/icons/appointments.svg"
          />

          <StatCard
            type="pending"
            count={appointmentData.pendingCount}
            label="Pending appointments"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={appointmentData.cancelledCount}
            label="Cancelled appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>

        {/* data table */}
        <DataTable
          columns={columns}
          data={appointmentData.documents}
        />
      </main>
    </div>
  );
};

export default Admin;
