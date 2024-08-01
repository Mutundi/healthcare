import Image from "next/image";

import AppointmentForm from "@/components/Forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.actions";

const NewAppointment = async ({params: { userId }}: SearchParamProps) => {
    console.log('UserId:', userId);
    const patient = await getPatient(userId);
    // console.log('Patient data', patient);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] clex-1 justify-between">
          <Image 
            src="/assets/icons/logo-full1.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mb-12 h-10 w-fit"
          />

          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient?.$id}
          />

            <p className="copyright py-12 mt-10">
                © 2024 PatientCare
            </p>
        </div>
      </section>

      <Image 
      src="/assets/images/appointment-img.png"
      alt="appointment"
      height={1000}
      width={1000}
      className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}

export default NewAppointment;