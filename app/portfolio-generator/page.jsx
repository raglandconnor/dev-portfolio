"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CircleCheck,
  BriefcaseBusiness,
  Upload,
  Download,
  Edit,
  Eye,
} from "lucide-react";
import { FileUploader } from "react-drag-drop-files";
import { API_ENDPOINTS } from "@/lib/constants";
import { generatePortfolio } from "@/actions/portfolio-generator";

const fileTypes = ["pdf"];

export default function PortfolioGenerator() {
  const [file, setFile] = useState(null);
  const [uploadingError, setUploadingError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resumeText, setResumeText] = useState(null);
  const [portfolioHTML, setPortfolioHTML] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = async (file) => {
    setFile(file);
    setUploadingError(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(API_ENDPOINTS.PDF_READER, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResumeText(data.extracted_text);
    } catch (error) {
      console.error("Error processing PDF:", error);
      setUploadingError(`Failed to process the resume: ${error.message}`);
    }
  };

  const handleGeneratePortfolio = async () => {
    setIsLoading(true);
    try {
      const generatedHTML = await generatePortfolio(resumeText);
      setPortfolioHTML(generatedHTML);
      console.log("Portfolio HTML:", generatedHTML);
    } catch (error) {
      console.error("Error generating portfolio:", error);
      setUploadingError(`Failed to generate portfolio: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!portfolioHTML) return;

    const blob = new Blob([portfolioHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "portfolio.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleHTMLChange = (event) => {
    setPortfolioHTML(event.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Portfolio Generator</h1>
      <div className="flex flex-col items-center justify-center gap-4 w-full mx-auto">
        <div className="w-full max-w-full overflow-hidden">
          <FileUploader
            handleChange={handleChange}
            name="resume"
            types={fileTypes}
            multiple={false}
            onTypeError={(error) => {
              setFile(null);
              setUploadingError(error);
            }}
          >
            <div className="w-full p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors duration-300 cursor-pointer">
              {file ? (
                <>
                  <CircleCheck className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 text-center truncate">
                    {file.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 text-center">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </>
              ) : (
                <>
                  <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 text-center">
                    Upload your resume
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 text-center">
                    Drag and drop or click to select a PDF file
                  </p>
                </>
              )}
            </div>
          </FileUploader>
        </div>
        {file && (
          <Button
            className="flex-1 mt-4"
            onClick={handleGeneratePortfolio}
            disabled={isLoading}
          >
            <BriefcaseBusiness className="w-4 h-4 mr-2" />
            {isLoading ? "Generating..." : "Generate Portfolio"}
          </Button>
        )}
        {uploadingError && (
          <p className="text-red-500 text-center mt-4">{uploadingError}</p>
        )}
      </div>
      <div className="mt-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h2 className="text-2xl font-bold mb-2 sm:mb-0">
            Generated Portfolio {isEditing ? "Editor" : "Preview"}
          </h2>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              onClick={() => setIsEditing(!isEditing)}
              className="w-full sm:w-auto"
            >
              {isEditing ? (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </>
              ) : (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit HTML
                </>
              )}
            </Button>
            <Button onClick={handleDownload} className="w-full sm:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Download HTML
            </Button>
          </div>
        </div>
        <div className="border rounded-lg p-4 bg-white">
          {isEditing ? (
            <textarea
              value={portfolioHTML}
              onChange={handleHTMLChange}
              className="w-full h-[600px] font-mono text-sm"
            />
          ) : (
            <iframe
              srcDoc={portfolioHTML}
              title="Generated Portfolio"
              className="w-full h-[600px] border-none"
              sandbox="allow-scripts"
            />
          )}
        </div>
      </div>
    </div>
  );
}
