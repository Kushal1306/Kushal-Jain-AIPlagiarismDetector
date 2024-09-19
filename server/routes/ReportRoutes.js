const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs/promises');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const dotenv = require('dotenv');
const upload=require('../middlewares/UploadMiddleware.js')
const extractText=require('../middlewares/TextExtractionMiddleware.js');
const axios = require('axios');
const { ChatOpenAI } = require("@langchain/openai");
const {z}=require('zod');

dotenv.config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
console.log(OPENAI_API_KEY);


const singleSuggestionSchema = z.object({
  suggestion:z.string()
});

// Define the schema for multiple questions
const multipleSuggestionSchema = z.object({
  suggestions: z.array(singleSuggestionSchema),
});

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0,
});

const reportRoute = express.Router();


reportRoute.post('/generate-report', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // const extractedText = await extractText(req.file);
    const extractedText = await extractText(req.file.buffer, req.file.mimetype);

    console.log("The extracted text is:", extractedText);

    const response = await axios.post('https://api.gowinston.ai/v2/plagiarism', 
      {
        text: extractedText,
      }, 
      {
        headers: {
          Authorization: `Bearer ${process.env.WINSTON_API_TOKEN}`,
          'Content-Type': 'application/json',
        }
      }
    );
    
    
    console.log("Plagiarism API response:", response.data);

    const prompt = `
    You have been provided with a plagiarism report in JSON format, which includes information about the sources of plagiarism, 
    the extent of copied content, and specific text sections identified as plagiarized. Your task is to analyze this JSON data 
    and provide detailed recommendations to reduce plagiarism.
    
    Report: ${response.data}
    
    Based on the data, suggest the following:
    
    1. Paraphrasing Techniques: Recommend methods to effectively rephrase the identified plagiarized sections while preserving the original meaning.
    
    2. Unique Content Creation: Advise on how to add original insights, examples, or personal analysis to enhance the uniqueness of the content.
    
    3. Citation Practices: Provide guidance on how to properly cite sources and integrate external information to avoid plagiarism issues.
    
    4. Synonyms and Sentence Structure: Suggest ways to vary the language and sentence structures to reduce similarity with the original sources.
    
    5. Additional Tips: Offer any other best practices for ensuring that the content is original and well-differentiated from the sources detected.
    
    Include specific recommendations based on the data provided in the JSON to help the user create more original and compliant content.
    Give suggestions in points at most 10.
  `;
  
    const structuredLlm = model.withStructuredOutput(multipleSuggestionSchema);
    const answer=await structuredLlm.invoke(prompt);

    console.log("suggestions are:",answer.suggestions);

    res.status(200).json({
      suggestions:answer.suggestions,
      report:response.data

    });

  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Error generating report: ' + error.message });
  } finally {
    if (req.file) {
      //removing file after operations
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        }
      });
    }
  }
});

module.exports = reportRoute;
