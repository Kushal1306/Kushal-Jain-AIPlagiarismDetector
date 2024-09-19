const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const dotenv = require('dotenv');

const reportRoute = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

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

reportRoute.post('/generate-report', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const extractedText = await extractText(req.file);
    console.log("the extracted text is:",extractedText);

    const mockReport = {"status":200,"scanInformation":{"service":"plagiarism","scanTime":"2024-09-19T02:26:00.259Z","inputType":"text"},"result":{"sourceCounts":1,"totalPlagiarismWords":309,"score":100,"textWordCounts":309},"sources":[{"score":100,"canAccess":true,"url":"https://www.ijraset.com/research-paper/smart-chatbot-to-assist-users-of-employment-websites-in-job-search","author":"IJRASET","description":"This paper presents the development and implementation of a smart chatbot designed to assist users o ...","title":"Smart Chatbot to Assist Users of Employment Websites in Job Search, Skill Development, and Networking Opportunities","publishedDate":1712707200000,"source":"ijraset.com","citation":false,"plagiarismWords":309,"totalNumberOfWords":309,"plagiarismFound":[{"startIndex":0,"endIndex":2264,"sequence":"in todays digital age, job search websites have become essential resources for people looking for chances for professional growth,  networking, and employment. numerous job ads, tools for improving skills, and channels for interacting with peers and possible  employers are all provided by these sites. but for certain users, especially those who encounter obstacles like information overload,  inadequate personalisation, and a lack of customised advice, efficiently browsing these websites can be difficult. the efficiency and  ease offered by current technology are frequently lacking in traditional techniques of career growth and job seeking. consequently,  in order to improve user experience and maximise employment domain outcomes, creative solutions utilising chatbot and artificial  intelligence (ai) technologies like large language models are clearly needed. one way to address various important demands and  potential in the sector is to construct a smart chatbot specifically designed to help users of employment websites. a chatbot of this  kind can provide users with individualised assistance and support during their job search by utilising artificial intelligence and  natural language processing. this include recommending appropriate jobs based on the user's tastes and qualifications, making  customised recommendations for programmes that would help them grow their skills and get trained, and helping them network  with other industry professionals. furthermore, a sophisticated chatbot can facilitate users' interactions with employment websites,  guide them through the difficulties of the job search process, and eventually improve their chances of discovering options for  suitable employment.  the primary objectives of this research are to leverage advanced ai technologies, including the bert model,  spacy, and large language models, to design and develop a smart chatbot tailored to assist users of employment websites  comprehensively. harnessing the power of these cutting-edge technologies, the chatbot aims to provide personalized  recommendations and assistance based on users' queries, suggesting relevant skill development resources, and facilitating  networking opportunities with professionals in their respective fields."}],"is_exclude":false}],"indexes":[{"startIndex":0,"endIndex":2264}],"citations":[],"credits_used":652,"credits_remaining":1848};
    res.json(mockReport);
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ error: 'Error generating report: ' + error.message });
  } finally {
    if (req.file) {
      fs.unlink(req.file.path).catch(err => console.error('Error deleting file:', err));
    }
  }
});

module.exports = reportRoute;
