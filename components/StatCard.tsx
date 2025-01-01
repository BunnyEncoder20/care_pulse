import React from "react";

// for dynamic TWCSS classes
import clsx from "clsx";

// current component ⚛️
const StatCard = ({
  count = 0,
  label,
  icon,
  type,
}: StatCardProps) => {
  return (
    <div
      className={clsx("stat-card", {
        "bg-appointments": type === "appointments",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
      })}
    >
      StatCard
    </div>
  );
};

export default StatCard;
