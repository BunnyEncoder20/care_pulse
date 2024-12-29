import React from "react";
import Image from "next/image";

// UI imports
import { Button } from "@/components/ui/button";

// current component ⚛️
const SubmitButton = ({
  isLoading,
  classnames,
  children,
}: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={classnames ?? "shad-primary-btn w-full"}
    >
      {isLoading
        ? (
          <div className="flex items-center gap-4">
            Loading...
            <Image
              src="/assets/icons/loader.svg"
              alt="loading..."
              height={24}
              width={24}
              className="animate-spin"
            />
          </div>
        )
        : children}
    </Button>
  );
};

export default SubmitButton;
