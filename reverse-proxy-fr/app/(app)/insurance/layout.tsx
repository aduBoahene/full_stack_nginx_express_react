"use client";
import { Student } from "@/components/studentTable";
import { Button, Dialog, DialogPanel } from "@tremor/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function InsuranceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [studentId, setStudentId] = useState("")

  const router = useRouter();

  const handleReload = () => {
    router.refresh();
  };




  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    const newStudent = {
      id: 0,
      firstname,
      lastname,
      email,
      studentId
    };
    AttemptSaveStudent(newStudent)
    setIsOpen(false);
  };

  

  const AttemptSaveStudent = (payLoad:Student) => {
    // Data to be sent in the POST request 
     

    // Options for the fetch request
    const options = {
      method: "POST", // HTTP method
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify(payLoad), // Convert the data to a JSON string
    };

    // URL to send the request to
    const url = "http://34.201.124.202:3000/api/student";

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        console.log("Success:", data); // Handle the JSON data here
        router.push("/")
      })
      .catch((error) => {
        console.error("Error:", error); // Handle errors here
      });
  };

  return (
    <>
      <div className="hidden order-last flex-col space-y-8 px-4 md:flex">
        <div className="flex flex-col items-start gap-8 justify-between space-y-2">
          <div className="flex flex-row w-full items-center justify-between gap-2">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight">
                Software International
              </h3>
            </div>
            <div className="flex flex-row justify-center items-center gap-2">
              {/* <SwitchPolicies /> */}
              <Button onClick={() => setIsOpen(true)}>
                Add Student
              </Button>
            </div>
          </div>
          {children}
        </div>
      </div>

      <Dialog open={isOpen} onClose={(val) => setIsOpen(val)} static={true}>
        <DialogPanel>
          <h3 className="text-lg font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Add New Student
          </h3>
          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-tremor-content dark:text-dark-tremor-content"
              >
                First Name
              </label>
              <input value={firstname} onChange={(e)=> setFirstname(e.target.value)}
                id="firstname"
                name="firstname"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-tremor-primary focus:border-tremor-primary sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-tremor-content dark:text-dark-tremor-content"
              >
                Last Name
              </label>
              <input value={lastname} onChange={(e)=> setLastname(e.target.value)}
                id="lastname"
                name="lastname"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-tremor-primary focus:border-tremor-primary sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-tremor-content dark:text-dark-tremor-content"
              >
                Email
              </label>
              <input value={email} onChange={(e)=> setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-tremor-primary focus:border-tremor-primary sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="studentId"
                className="block text-sm font-medium text-tremor-content dark:text-dark-tremor-content"
              >
                Student ID
              </label>
              <input value={studentId} onChange={(e)=> setStudentId(e.target.value)}
                id="studentId"
                name="studentId"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-tremor-primary focus:border-tremor-primary sm:text-sm"
              />
            </div>

            <Button onClick={(e)=>handleSubmit(e)} className="mt-4 w-full">
              Submit
            </Button>
          </form>
        </DialogPanel>
      </Dialog>
    </>
  );
}
