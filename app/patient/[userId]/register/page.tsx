import RegisterForm from "@/components/Forms/RegisterForm";
import { getPatient, getUser } from "@/lib/actions/patient.actions";

import { redirect } from "next/navigation";
import Image from 'next/image';

const Register = async ({params: { userId }}: SearchParamProps) => {
  const user = await getUser(userId);
  const patient = await getPatient(userId);

  
  if (patient) redirect(`/patient/${userId}/new-appointment`);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image 
            src="/assets/icons/logo-full1.svg"
            alt="patient"
            height={1000}
            width={1000}
            className="mb-12 h-10 w-fit"
          />
          <RegisterForm user={user} />

          <p className="copyright py-10">© 2024 PatientCare</p>
        </div>
      </section>

      <Image 
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[690px]"
      />
    </div>
  )
}

export default Register