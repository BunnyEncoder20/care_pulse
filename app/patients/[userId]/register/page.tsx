import React from "react";
import Image from "next/image";
import Link from "next/link";

// Components imports
import RegisterForm from "@/components/RegisterForm";

// server actions
import { getUser } from "@/lib/actions/patient.actions";

// current page 📄
const Register = async ({ params: { userId } }: SearchParamProps) => {
  // fetch the user
  const user = await getUser(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          {/* logo */}
          <Image
            src="/assets/icons/logo-full.svg"
            alt="CarePulse Logo"
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
          />

          {/* register form */}
          <RegisterForm user={user} />

          {/* copywright */}
          <div className="txt-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              &copy; 2024 Care Pulse
            </p>
            <Link href="/?admin=true" className="text-green-500 cursor-pointer">
              Doctor Login
            </Link>
          </div>
        </div>
      </section>

      {/* right side image */}
      <Image
        src="/assets/images/register-img.png"
        alt="onboarding image"
        height={1000}
        width={1000}
        className="side-img max-w-[390px]"
      />
    </div>
  );
};

export default Register;
