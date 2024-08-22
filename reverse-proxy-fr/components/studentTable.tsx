"use client";
import {
  DialogPanel,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import Modal from "./TableModal";
import { useRouter } from "next/navigation";
import { Dialog } from "@radix-ui/react-dialog";

export interface Student {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  studentId: string;
}

export const StudentTable = () => {

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);


  const openViewModal = () => setIsViewModalOpen(true);
  const closeModal = () => setIsViewModalOpen(false);
  const [studentToView, setStudentToView] = useState();
  const [studentToBeEdited, setStudentToBeEdited] = useState();

  const openModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);


  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);

  const router = useRouter()

  const handleViewClick = (student: any) => {
    console.log("student to be viewed", student);
    setStudentToView(student);
    openViewModal();
  };

  const handleEditClick = (student: any) => {
    console.log("to be edited", student);
    //set student to be edited
    setStudentToBeEdited(student)
    setIsEditModalOpen(true)
  };

  const handleDeleteClick = (student: any) => {
    console.log("to be deleted", student);
    setStudentToView(student)
    DeleteSTudent(student.id)
  };

  useEffect(() => {
    setLoading(true);
    const options = {
      method: "GET", // HTTP method
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
    };

    // URL to send the request to
    const url = "http://34.201.124.202:5000/api/student";

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setLoading(false);
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        setLoading(false);
        console.log("students:", data); // Handle the JSON data here
        setStudents(data.data);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error); // Handle errors here
      });
  }, []);

  function DeleteSTudent(id: number){
    try {
      const options = {
        method: "DELETE", // HTTP method
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
      };
  
      // URL to send the request to api/student/:studentId
      const url = `http://34.201.124.202:5000/api/student/${id}`;
  
      fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          setLoading(false);
          return response.json(); // Parse the JSON response
        })
        .then((data) => {
          setLoading(false);
          console.log("students:", data); // Handle the JSON data here
          router.push("/")
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error:", error); // Handle errors here
        });
    } catch (error) {
      console.log("error", error)
    }
   
  }

  return (
    <div className="w-full">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>First Name</TableHeaderCell>
            <TableHeaderCell>Last Name</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Student ID</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            <p>Loading...</p>
          ) : students && students.length > 0 ? (
            students.map((student) => (
              <TableRow key={student?.id}>
                <TableCell>{student.firstname}</TableCell>
                <TableCell>{student.lastname}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.studentId}</TableCell>
                <ActionIcons
                  viewClick={() => handleViewClick(student)}
                  editClick={() => handleEditClick(student)}
                  deleteClick={() => handleDeleteClick(student)}
                  student={student}
                />
              </TableRow>
            ))
          ) : (
            <p>No students available.</p>
          )}
        </TableBody>
      </Table>

      <Modal
        data={studentToView}
        isOpen={isViewModalOpen}
        onClose={closeModal}
        modalTitle="View Record"
      >
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={closeModal}
        >
          Close
        </button>
      </Modal>

      {/* <EditDialogModal isEditModalOpen={isEditModalOpen} data={studentToBeEdited} /> */}
<EditModal data={studentToBeEdited} isEditModalOpen={isEditModalOpen} onClose={closeEditModal}/>
    </div>
  );
};

interface ActionIconsProps {
  viewClick: (data: Student) => void;
  editClick: (data: Student) => void;
  deleteClick: (data: Student) => void;
}

function ActionIcons({
  viewClick,
  editClick,
  deleteClick,
  student,
}: ActionIconsProps & { student: Student }) {
  return (
    <TableCell className="flex items-center gap-2">
      <Eye
        className="cursor-pointer"
        size={20}
        onClick={() => viewClick(student)}
      />
      <Pencil
        className="cursor-pointer"
        size={20}
        onClick={() => editClick(student)}
      />
      <Trash2
        className="cursor-pointer"
        size={20}
        onClick={() => deleteClick(student)}
      />
    </TableCell>
  );
}

interface EditDialogModalProps{
  data: Student | undefined
  isEditModalOpen: boolean
  onClose: ()=> void
}

function EditModal({ data, isEditModalOpen, onClose }:EditDialogModalProps) {

  const router=useRouter()

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");

  useEffect(() => {
    if (data) {
      setFirstname(data?.firstname || "");
      setLastname(data.lastname || "");
      setEmail(data.email || "");
      setStudentId(data.studentId || "");
    }
  }, [data]);
  if (!isEditModalOpen) return null;

  function sendForm(e:FormEvent){
    e.preventDefault()
    console.log("sending form")
    EditStudent(data?.id ?? 0)
  }

  function EditStudent(id: number){
    try {
      const options = {
        method: "PUT", // HTTP method
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          studentId
        }), // Add the data to the request body

      };
  
      // URL to send the request to api/student/:studentId
      const url = `http://34.201.124.202:5000/api/student/${id}`;
  
      fetch(url, options)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parse the JSON response
        })
        .then((data) => {
          console.log("after edit students:", data); // Handle the JSON data here
          router.push("/")
        })
        .catch((error) => {
          console.error("Error:", error); // Handle errors here
        });
    } catch (error) {
      console.log("error", error)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Edit Data</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Firstname
            </label>
            <input
              type="text"
              value={firstname} onChange={(e)=> setFirstname(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Lastname
            </label>
            <input
              type="text"
              value={lastname} onChange={(e)=> setLastname(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="text"
              value={email} onChange={(e)=> setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              StudentID
            </label>
            <input
              type="text"
              value={studentId} onChange={(e)=> setStudentId(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={(e)=>sendForm(e)}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
