"use client";
import { Button } from "@/components/ui/button";
import { CircleCheck, FilePlus, FileText } from "lucide-react";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import useHttp from "@/app/hooks/useHttp";
import { API_ENDPOINTS } from "@/lib/constants";

const fileTypes = ["pdf"];

export default function ResumeUploader() {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState(null);
  const { data, error, isLoading, sendRequest } = useHttp(
    {
      url: API_ENDPOINTS.PDF_READER,
      method: "POST",
    },
    false
  );

  const handleChange = (file) => {
    setFile(file);
  };

  const handleReview = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(API_ENDPOINTS.PDF_READER, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      setExtractedText(data.extracted_text);
    } catch (error) {
      console.error("Error processing PDF:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <FileUploader
        handleChange={handleChange}
        name="resume"
        types={fileTypes}
        multiple={false}
        onTypeError={(error) => {
          setFile(null);
          setError(error);
        }}
      >
        <ResumeContainer file={file} />
      </FileUploader>
      {file && (
        <Button
          className="mt-4 w-full"
          onClick={handleReview}
          disabled={isLoading}
        >
          <FileText className="w-4 h-4 mr-2" />
          Review Resume
        </Button>
      )}
      {extractedText && (
        <p className="text-black text-center mt-4">{extractedText}</p>
      )}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  );
}

function ResumeContainer({ file }) {
  return (
    <div className="border-2 p-6 sm:p-10 md:p-16 border-dashed border-cyan-400 rounded-lg bg-cyan-50 hover:bg-cyan-100 hover:border-cyan-600 hover:cursor-pointer flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8">
      <FilePlus className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-gray-400" />
      <p className="text-base sm:text-lg md:text-xl text-center">
        Drop a file here to upload, or
        <span className="text-blue-500 block text-center mt-2">
          Click to Upload
        </span>
      </p>
      <p className="text-sm text-gray-500">Accepted file type: PDF</p>
      {file && (
        <p className="text-green-500 flex items-center gap-2 sm:gap-3 text-base sm:text-lg">
          <CircleCheck className="w-5 h-5 sm:w-6 sm:h-6" />
          {file.name}
        </p>
      )}
    </div>
  );
}
