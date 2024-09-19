const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs/promises');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const dotenv = require('dotenv');


async function extractText(fileBuffer, fileType) {
    let text = '';

    try {
        switch (fileType) {
            case 'application/pdf':
                text = await pdf(fileBuffer).then(data => data.text);
                break;
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                const result = await mammoth.extractRawText({ buffer: fileBuffer });
                text = result.value;
                break;
            case 'text/plain':
                text = fileBuffer.toString('utf8');
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

module.exports = extractText;