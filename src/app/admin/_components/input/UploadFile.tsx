"use client";

import clsx from "clsx";
import { CloudUpload, FileText, X } from "lucide-react";
import React, { useRef, useState, DragEvent, ChangeEvent } from "react";

interface FileInputProps {
  onFileChange: (file: File | null) => void;
  className?: string;
  id?: string;
  acceptedFileTypes?: string;
  label?: string;
  maxFileSizeMB?: number;
  fileTypesDescription?: string;
}

const FileInput: React.FC<FileInputProps> = ({
  onFileChange,
  className,
  id = "file-upload",
  acceptedFileTypes = ".pdf,.doc,.docx,.jpg,.jpeg,.png",
  maxFileSizeMB = 5,
  fileTypesDescription = "PDF, DOC, JPG, PNG",
}) => {
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    if (file.size > maxFileSizeMB * 1024 * 1024) {
      setError(`File is too large. Max size: ${maxFileSizeMB}MB`);
      return false;
    }
    // Simple type validation based on extension (more robust validation might be needed)
    const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
    if (
      !acceptedFileTypes.split(",").includes(fileExtension) &&
      !acceptedFileTypes.includes("image/*") &&
      !acceptedFileTypes.includes("application/pdf")
    ) {
      // A more complex check might be needed if using wildcards like image/*
      // For now, this is a basic check.
      if (
        !acceptedFileTypes.includes(file.type.split("/")[0] + "/*") &&
        !acceptedFileTypes.includes(file.type)
      ) {
        setError(`Invalid file type. Accepted: ${fileTypesDescription}`);
        return false;
      }
    }
    setError(null);
    return true;
  };

  const handleFileProcessing = (file: File) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      onFileChange(file);
    } else {
      setSelectedFile(null);
      onFileChange(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
    setError(null);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileProcessing(files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileProcessing(files[0]);
    }
  };

  const handleBrowseClick = () => {
    setError(null);
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    onFileChange(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={clsx("w-full", className)}>
      <div
        className={clsx(
          "border-2 flex justify-center items-center gap-1 border-primary-1 rounded-lg cursor-pointer py-3 transition-colors duration-200 ease-in-out",
          dragging ? "bg-primary-1/10" : "bg-transparent hover:bg-primary-1/5",
          error ? "border-red-500 hover:bg-red-500/5" : "border-primary-1",
          !selectedFile && "border-dashed"
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={!selectedFile ? handleBrowseClick : undefined}
      >
        <input
          type="file"
          id={id}
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept={acceptedFileTypes}
        />
        {!selectedFile ? (
          <>
            <CloudUpload
              size={16}
              // className={clsx("text-primary-1", error && "text-red-500")}
            />
            <p className={clsx("text-xss text-center")}>
              Drag your file here or{" "}
              <span className="text-underline text-primary-3">choose file</span>
            </p>
          </>
        ) : (
          <div className="flex items-center justify-center gap-2 ">
            <FileText size={16} className="text-primary-1" />
            <p className="text-xss font-medium text-neutral-1 truncate max-w-[200px]">
              {selectedFile.name}
            </p>
            <p className="text-xss text-neutral-3"> 
              {(selectedFile.size / 1024).toFixed(2)} KB
            </p>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="my-auto text-red-500 hover:text-red-700 text-xss flex items-center gap-0.5"
            >
              <X size={14} /> Remove
            </button>
          </div>
        )}
      </div>
      {error && <p className="text-xss text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default FileInput;
