const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs/promises');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const dotenv = require('dotenv');

async function extractText(file) {
    const ext = path.extname(file.path).toLowerCase();
    let text = '';
  
    try {
      switch (ext) {
        case '.pdf':
          const dataBuffer = await fs.readFile(file.path);
          const pdfData = await pdf(dataBuffer);
          text = pdfData.text;
          break;
        case '.docx':
          const result = await mammoth.extractRawText({ path: file.path });
          text = result.value;
          break;
        case '.txt':
          text = await fs.readFile(file.path, 'utf8');
          break;
        default:
          throw new Error('Unsupported file type');
      }
      return text;
    } catch (error) {
      console.error('Error extracting text:', error);
      throw error;
    }
  }

module.exports=extractText;