# Puter.js AI Integration Setup

This guide explains how to set up and configure Puter.js AI integration in the GROOT Agent system.

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `groot-backend` directory with the following variables:

```bash
# Puter.js AI Configuration
PUTER_API_KEY=your_puter_api_key_here

# Optional: Customize Puter.js settings
PUTER_BASE_URL=https://api.puter.com
PUTER_TIMEOUT=120

# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True

# Database Configuration
DATABASE_URL=sqlite:///app.db

# Security
SECRET_KEY=your_secret_key_here
```

### Getting Puter.js API Key

1. Visit [Puter.js](https://puter.com)
2. Sign up for an account
3. Navigate to API settings
4. Generate an API key
5. Copy the key to your `.env` file

## 🚀 Features

### Fast Mode
- **Purpose**: Quick text analysis without file processing
- **Use Case**: General questions, text analysis, quick responses
- **Button**: "Puter.js Fast Mode" (purple gradient)
- **Input**: Text in the task input field

### File Upload Mode
- **Purpose**: File analysis and processing
- **Use Case**: Document analysis, code review, image processing
- **Button**: "Attach File & Analyze" (purple gradient)
- **Input**: File upload + optional task description

## 📁 Supported File Types

The system supports the following file types for Puter.js analysis:

### Text Files
- `.txt` - Plain text files
- `.md` - Markdown files
- `.py` - Python scripts
- `.js`, `.jsx` - JavaScript files
- `.ts`, `.tsx` - TypeScript files
- `.json` - JSON data files
- `.xml` - XML files
- `.html` - HTML files
- `.css` - CSS files
- `.csv` - CSV data files

### Documents
- `.pdf` - PDF documents
- `.doc`, `.docx` - Word documents
- `.xls`, `.xlsx` - Excel spreadsheets

### Images
- `.jpg`, `.jpeg` - JPEG images
- `.png` - PNG images
- `.gif` - GIF images
- `.svg` - SVG vector graphics

## 🎯 Usage Instructions

### Fast Mode
1. Select "Fast Mode" radio button
2. Enter your text in the task input field
3. Click "Puter.js Fast Mode" button
4. Wait for analysis to complete
5. View results in the Results panel

### File Upload Mode
1. Select "Attach File" radio button
2. Optionally enter a task description
3. Click "Attach File & Analyze" button
4. Select a file from your computer
5. Wait for file processing to complete
6. View analysis results in the Results panel

## 🔍 API Endpoints

### File Upload
```
POST /api/puter/upload
Content-Type: multipart/form-data

Parameters:
- file: The file to analyze
- task: Optional task description
```

### Fast Mode
```
POST /api/puter/fast-mode
Content-Type: application/json

Body:
{
  "text": "Text to analyze",
  "context": "Optional context"
}
```

### Status Check
```
GET /api/puter/status

Response:
{
  "success": true,
  "available": true,
  "service": "Puter.js AI",
  "status": "online"
}
```

## 🛠️ Troubleshooting

### Common Issues

1. **"Puter.js AI service is not available"**
   - Check your internet connection
   - Verify your API key is correct
   - Ensure Puter.js service is online

2. **"File upload failed"**
   - Check file size (max 10MB recommended)
   - Verify file type is supported
   - Ensure file is not corrupted

3. **"Fast mode error"**
   - Check text input is not empty
   - Verify API key is valid
   - Check network connectivity

### Debug Mode

Enable debug logging by setting:
```bash
FLASK_DEBUG=True
```

This will show detailed error messages in the console.

## 🔒 Security Considerations

- Never commit your API key to version control
- Use environment variables for sensitive data
- Regularly rotate your API keys
- Monitor API usage and costs

## 📊 Performance

### Fast Mode
- **Typical Response Time**: 2-5 seconds
- **Token Limit**: 1500 tokens
- **Best For**: Quick analysis and responses

### File Upload Mode
- **Typical Response Time**: 5-15 seconds
- **Token Limit**: 2000 tokens
- **Best For**: Detailed file analysis

## 🔄 Integration with GROOT Agents

Puter.js results are automatically:
- Added to task history
- Logged in activity feed
- Displayed in results panel
- Stored with metadata

## 📈 Monitoring

Monitor Puter.js usage through:
- Activity log entries
- Task history with "puter-ai" model tag
- API response times
- Success/failure rates

## 🎉 Success!

Once configured, you'll have access to:
- **Fast Mode**: Quick text analysis with Puter.js AI
- **File Upload**: Comprehensive file analysis
- **Seamless Integration**: Results appear in GROOT interface
- **History Tracking**: All analyses saved to task history

Your GROOT Agent system now has powerful Puter.js AI capabilities! 🌱 