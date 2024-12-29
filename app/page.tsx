import React from "react";

// UI imports
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex">
      <h1 className="text-3xl underline text-white">Home</h1>
      <Button>Click me</Button>
    </div>
  );
}
