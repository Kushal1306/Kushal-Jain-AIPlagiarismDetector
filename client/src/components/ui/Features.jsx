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
      title: "Multilingual Quiz Creation",
      description: "Create engaging quizzes in multiple languages, perfect for global learning.",
      icon: <Globe className="h-8 w-8 text-black" />
    },
    {
      title: "Diverse Question Formats",
      description: "Generate multiple-choice, true/false, and open-ended questions for varied assessments.",
      icon: <FileText className="h-8 w-8 text-black" />
    },
    {
      title: "Versatile Input Sources",
      description: "Create quizzes from text, PDF, or URL inputs for maximum flexibility.",
      icon: <Zap className="h-8 w-8 text-black" />
    },
    {
      title: "Adaptive Difficulty Levels",
      description: "Automatically adjust question difficulty for optimal learning challenges.",
      icon: <BarChart2 className="h-8 w-8 text-black" />
    },
    {
      title: "Global Quiz Sharing",
      description: "Distribute quizzes worldwide to foster collaboration and knowledge exchange.",
      icon: <Share2 className="h-8 w-8 text-black" />
    },
    {
      title: "Advanced Analytics",
      description: "Gain insights into student performance to improve learning strategies.",
      icon: <BarChart2 className="h-8 w-8 text-black" />
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-6xl font-bold text-center mb-20 text-black">
          Powerful Features
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