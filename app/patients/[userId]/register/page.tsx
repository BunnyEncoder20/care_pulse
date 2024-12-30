import React from "react";
import Image from "next/image";

// Components imports
import RegisterForm from "@/components/forms/RegisterForm";

// server actions
import { getUser } from "@/lib/actions/patient.actions";

// current page 📄
const Register = async ({ params: { userId } }: SearchParamProps) => {
  // fetch the user
  const user = await getUser(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
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
          <p className="copyright py-12">
            &copy; 2024 Care Pulse
          </p>
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
