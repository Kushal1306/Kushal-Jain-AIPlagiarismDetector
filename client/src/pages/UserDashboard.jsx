"use client";
import React, { useState } from "react";
import axios from 'axios'; 
import Button from "../components/ui/Button";
import { FileUpload } from "../components/ui/FileUpload";
import PlagiarismReport from "./PlagarismReport";

function Dashboard() {
  const [file, setFile] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (files) => {
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const generateReport = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload the file");
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:3000/user/generate-report", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setReportData(response.data);
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-6 bg-white">
      <div className="w-full max-w-none grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="md:col-span-1 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-lg p-4 bg-black flex flex-col justify-between">
          <div className="flex-grow flex items-center justify-center">
            <FileUpload onChange={handleFileUpload} />
          </div>
          <Button 
            onClick={generateReport} 
            disabled={!file || isLoading}
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            {isLoading ? "Generating..." : "Generate Report"}
          </Button>
        </div>
        <div className="md:col-span-2 border border-dashed border-neutral-200 rounded-lg p-6 bg-white">
          {reportData && (
            <PlagiarismReport data={reportData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
