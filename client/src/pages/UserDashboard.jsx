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
      alert("Please upload a file");
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
      console.log(response.data);
      setReportData(response.data);
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center p-6 bg-white">
      <div className="w-full max-w-4xl border border-dashed border-neutral-200 dark:border-neutral-800 rounded-lg p-4 bg-black">
        <div className="flex items-center justify-center">
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

      <div className="w-full max-w-4xl mt-6 border border-dashed border-neutral-200 rounded-lg p-6 bg-white">
        {reportData && (
          <>
            <PlagiarismReport data={reportData.report} />
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Suggestions to decrease plagiarism by OpenAI</h2>
              <ul className="list-disc ml-6 space-y-2">
                {reportData.suggestions.map((suggestion, index) => (
                  <li key={index} className="text-gray-700">
                    {suggestion.suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
