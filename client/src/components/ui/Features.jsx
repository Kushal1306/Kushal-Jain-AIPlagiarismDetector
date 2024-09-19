import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from './Card';
import { Globe, FileText, Zap, BarChart2, Share2 } from 'lucide-react';

const Feature = ({ title, description, icon }) => {
  return (
    <Card className="bg-white border-2 border-gray-300 hover:border-gray-600 transition-all duration-300 transform hover:-translate-y-2">
      <CardHeader>
        <div className="mb-2 bg-gray-100 rounded-full p-4 inline-block">
          {icon}
        </div>
        <CardTitle className="text-2xl font-bold text-black">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export const Features = () => {
  const features = [
    {
      title: "Lightning Fast and Powered by AI",
      description: "Experience rapid plagiarism detection and content analysis, all powered by advanced AI algorithms for immediate results.",
      icon: <Zap className="h-8 w-8 text-black" />
    },
    {
      title: "Multilingual Support",
      description: "Analyze and detect plagiarism in multiple languages, ensuring accuracy and efficiency for global content creators.",
      icon: <Globe className="h-8 w-8 text-black" />
    },
    {
      title: "Detailed Report and Recommendations",
      description: "Receive in-depth plagiarism reports with actionable recommendations for improving content originality.",
      icon: <BarChart2 className="h-8 w-8 text-black" />
    },
    {
      title: "Versatile Input Sources",
      description: "Upload  PDF, docx or text formats for comprehensive plagiarism checks across various formats.",
      icon: <FileText className="h-8 w-8 text-black" />
    },
    {
      title: "Adaptive Suggestions",
      description: "Receive tailored paraphrasing and citation suggestions to enhance content originality.",
      icon: <BarChart2 className="h-8 w-8 text-black" />
    },
    {
      title: "Global Content Integration",
      description: "Check content against sources worldwide to ensure thorough plagiarism detection across global databases.",
      icon: <Share2 className="h-8 w-8 text-black" />
    },
    
  ];


  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-6xl font-bold text-center mb-20 text-black">
          Our Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;