import Image from "next/image";

// UI
import { Button } from "./ui/button";

const SubmitButton = ({ isLoading, classnames, children }: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={classnames ?? "shad-primary-btn w-full"}
    >
      {isLoading
        ? (
          <div className="flex items-center gap-4">
            <Image
              src="/assets/icons/loader.svg"
              alt="loader"
              width={24}
              height={24}
              className="animate-spin"
            />
            Loading...
          </div>
        )
        : children}
    </Button>
  );
};

export default SubmitButton;
