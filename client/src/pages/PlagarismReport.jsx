import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/Table";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../components/ui/Collapsible";
import { ChevronDown, ChevronUp } from 'lucide-react';
import Button from "../components/ui/Button";

function PlagiarismReport({ data }) {
  const [expandedSources, setExpandedSources] = useState([]);

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

  return (
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
        <CardHeader>
          <CardTitle>Plagiarism Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Words</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.sources.map((source, index) => (
                <React.Fragment key={index}>
                  <TableRow>
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
                      <TableCell colSpan={4} className="bg-muted">
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

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Scan Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Scan Time:</strong> {new Date(data.scanInformation.scanTime).toLocaleString()}</p>
          <p><strong>Input Type:</strong> {data.scanInformation.inputType}</p>
          <p><strong>Credits Used:</strong> {data.credits_used}</p>
          <p><strong>Credits Remaining:</strong> {data.credits_remaining}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default PlagiarismReport;
