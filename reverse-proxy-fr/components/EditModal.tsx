import React from "react";
import { Student } from "./studentTable";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  modalTitle: string;
  data: any;
}

const EditModal: React.FC<ModalProps> = ({
  isOpen,onClose,children,modalTitle,data}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">Edit</h2>

        <div className="flex gap-4 items-center">
          <span>
            <h4>{data?.firstname}</h4>
          </span>{" "}
          <span>
            <h4>{data?.lastname}</h4>
          </span>
          <span>
            <h4>{data?.email}</h4>
          </span>{" "}
          <span>
            <h4>{data?.studentId}</h4>
          </span>
        </div>
        {children}
      </div>
    </div>
  );
};

export default EditModal;
