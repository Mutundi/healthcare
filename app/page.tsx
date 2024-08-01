import Image from "next/image";
import Link from "next/link";

import PatientForm from "@/components/Forms/PatientForm";
import PasskeyModal from "@/components/PasskeyModal";

const Home = ({searchParams}: SearchParamProps) => {
  const isAdmin =searchParams.admin === 'true';

  return (
    <div className="flex h-screen max-h-screen">

      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image 
            src="/assets/icons/logo-full3.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
            © 2024 PatientCare
            </p>
            <Link href="/?admin=true" className="text-pink-500">Admin</Link>
          </div>
        </div>
      </section>

      <Image 
      src="/assets/images/onboarding-img1.png"
      alt="patient"
      height={1000}
      width={1000}
      className="side-img max-w-[50%]"
      />
    </div>
  );
}

export default Home;