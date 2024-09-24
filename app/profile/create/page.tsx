import React from "react";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import SubmitButton from "@/components/form/Button";
import { createProfileAction } from "@/lib/action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser();

  if (user?.privateMetadata?.hasProfile) redirect("/");
  return (
    <section>
      <h1 className="text-2xl font-semibold capitalize mb-8"> new user</h1>

      <div className="border rounded-md p-8 ">
        <FormContainer action={createProfileAction}>
          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <FormInput type="text" name="firstName" label="First Name " />
            <FormInput type="text" name="lastName" label="Last Name " />
            <FormInput type="text" name="username" label="Username" />
          </div>

          <SubmitButton text="Create Profile" className="mt-8" />
        </FormContainer>
      </div>
    </section>
  );
}
