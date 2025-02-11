import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/Table";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ChevronDown, ChevronUp, Download } from 'lucide-react';
import Button from "../components/ui/Button";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function PlagiarismReport({ data }) {
  const [expandedSources, setExpandedSources] = useState([]);
  const reportRef = useRef(null);

  const plagiarismPercentage = (data.result.totalPlagiarismWords / data.result.textWordCounts) * 100;
  const originalPercentage = 100 - plagiarismPercentage;

  const pieData = [
    { name: 'Plagiarized', value: plagiarismPercentage },
    { name: 'Original', value: originalPercentage }
  ];

  const COLORS = ['#FF6384', '#36A2EB'];

  const toggleSource = (index) => {
    setExpandedSources(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const downloadReport = () => {
    html2canvas(reportRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Add plagiarized text from all sources
      pdf.addPage();
      pdf.setFontSize(16);
      pdf.text('Plagiarized Text from All Sources', 14, 20);
      pdf.setFontSize(12);
      let yOffset = 30;
      data.sources.forEach((source, index) => {
        pdf.text(`Source ${index + 1}: ${source.source}`, 14, yOffset);
        yOffset += 10;
        const wrappedText = pdf.splitTextToSize(source.plagiarismFound[0].sequence, pdfWidth - 28);
        pdf.text(wrappedText, 14, yOffset);
        yOffset += wrappedText.length * 7 + 10;

        if (yOffset > pdf.internal.pageSize.getHeight() - 20) {
          pdf.addPage();
          yOffset = 20;
        }
      });

      pdf.save('plagiarism-report.pdf');
    });
  };

  return (
    <div ref={reportRef} className="relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Plagiarism</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-4">
              <p className="text-lg font-semibold">{plagiarismPercentage.toFixed(2)}% Plagiarized</p>
              <p className="text-sm text-gray-500">
                {data.result.totalPlagiarismWords} out of {data.result.textWordCounts} words
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Plagiarism Sources</CardTitle>
            <Button
              onClick={downloadReport}
              variant="outline"
              size="sm"
              className="flex items-center bg-black text-white"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Words</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Text</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.sources.map((source, index) => (
                  <React.Fragment key={index}>
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                          {source.source}
                        </a>
                      </TableCell>
                      <TableCell>{source.plagiarismWords}</TableCell>
                      <TableCell>{source.score}%</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => toggleSource(index)}>
                          {expandedSources.includes(index) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                          <span className="sr-only">Toggle plagiarized text</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    {expandedSources.includes(index) && (
                      <TableRow>
                        <TableCell colSpan={5} className="bg-muted">
                          <div className="p-2 text-sm">
                            <h4 className="font-semibold mb-2">Plagiarized Text:</h4>
                            <p>{source.plagiarismFound[0].sequence}</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PlagiarismReport;