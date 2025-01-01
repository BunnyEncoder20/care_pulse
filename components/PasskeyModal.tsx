"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

// UI
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

// utils
import { decryptKey, encryptKey } from "@/lib/utils";

// current component ⚛️
const PasskeyModal = () => {
  // states and hooks
  const [open, setOpen] = useState(true);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const path = usePathname();

  // get admin passkey if already there in localstorage
  const encryptedPasskey = typeof window !== "undefined"
    ? window.localStorage.getItem("passkey")
    : null;

  // if admin encryptedPasskey exists, decrypt it and redirect to admin
  useEffect(() => {
    // we check if path exists to know we are in the browser
    if (path) {
      const accesskey = encryptedPasskey && decryptKey(encryptedPasskey);
      if (accesskey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        setOpen(false);
        router.push("/admin");
      } else {
        setOpen(true);
      }
    }
  }, [encryptedPasskey]);

  // handlers
  const closeModalHandler = () => {
    setOpen(false);
    router.push("/");
  };

  const validatePasskeyHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    console.log("Validating passkey...");
    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      // store current users encrypted passkey so that we know who did what
      console.log("Valid Passkey. Encrypting...");
      const encryptedPasskey = encryptKey(passkey);
      localStorage.setItem("passkey", encryptedPasskey);

      console.log("Success ✅");
      setOpen(false);
    } else {
      setError("Invalid Passkey, please try again.");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Admin access Verificaiton

            <Image
              src="/assets/icons/close.svg"
              alt="close"
              height={20}
              width={20}
              onClick={() => closeModalHandler()}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access admin page, please enter the admin passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div>
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => setPasskey(value)}
          >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot index={0} className="shad-otp-slot" />
              <InputOTPSlot index={1} className="shad-otp-slot" />
              <InputOTPSlot index={2} className="shad-otp-slot" />
              <InputOTPSlot index={3} className="shad-otp-slot" />
              <InputOTPSlot index={4} className="shad-otp-slot" />
              <InputOTPSlot index={5} className="shad-otp-slot" />
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <p className="shad-error text-14-regular mt-4 flex justify-center">
              {error}
            </p>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogAction
            onClick={(e) => validatePasskeyHandler(e)}
            className="shad-primary-btn w-full"
          >
            Submit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PasskeyModal;
