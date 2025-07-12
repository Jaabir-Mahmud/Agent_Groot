# src/utils/puter.py
import requests
import json
import base64
import os
import tempfile
from typing import Optional, Dict, Any
from flask import current_app
import logging

logger = logging.getLogger(__name__)

class PuterAI:
    """
    Puter.js AI Model Integration
    Handles file processing and AI interactions through Puter.js API
    """
    
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv('PUTER_API_KEY')
        self.base_url = "https://api.puter.com"
        self.session = requests.Session()
        
        if self.api_key:
            self.session.headers.update({
                'Authorization': f'Bearer {self.api_key}',
                'Content-Type': 'application/json'
            })
    
    def process_file(self, file_path: str, task_description: str) -> Dict[str, Any]:
        """
        Process a file using Puter.js AI model
        
        Args:
            file_path: Path to the file to process
            task_description: Description of what to do with the file
            
        Returns:
            Dict containing the processing result
        """
        try:
            # Read and encode the file
            with open(file_path, 'rb') as f:
                file_content = f.read()
                file_base64 = base64.b64encode(file_content).decode('utf-8')
            
            # Get file metadata
            file_name = os.path.basename(file_path)
            file_size = len(file_content)
            file_extension = os.path.splitext(file_name)[1].lower()
            
            # Prepare the request payload
            payload = {
                "file": {
                    "name": file_name,
                    "content": file_base64,
                    "size": file_size,
                    "type": self._get_mime_type(file_extension)
                },
                "task": task_description,
                "model": "puter-ai",  # Puter.js AI model
                "options": {
                    "max_tokens": 2000,
                    "temperature": 0.7,
                    "include_metadata": True
                }
            }
            
            # Make the API call
            response = self.session.post(
                f"{self.base_url}/v1/ai/process-file",
                json=payload,
                timeout=120
            )
            
            if response.status_code == 200:
                result = response.json()
                logger.info(f"Successfully processed file {file_name} with Puter.js")
                return {
                    "success": True,
                    "result": result.get("analysis", ""),
                    "metadata": result.get("metadata", {}),
                    "file_info": {
                        "name": file_name,
                        "size": file_size,
                        "type": file_extension
                    }
                }
            else:
                logger.error(f"Puter.js API error: {response.status_code} - {response.text}")
                return {
                    "success": False,
                    "error": f"API Error {response.status_code}: {response.text}"
                }
                
        except Exception as e:
            logger.error(f"Error processing file with Puter.js: {str(e)}")
            return {
                "success": False,
                "error": f"Processing error: {str(e)}"
            }
    
    def fast_mode_analysis(self, text_input: str, context: Optional[str] = None) -> Dict[str, Any]:
        """
        Fast mode analysis using Puter.js AI without file processing
        
        Args:
            text_input: The text to analyze
            context: Optional context for the analysis
            
        Returns:
            Dict containing the analysis result
        """
        try:
            payload = {
                "text": text_input,
                "context": context or "General analysis and response generation",
                "model": "puter-ai",
                "mode": "fast",
                "options": {
                    "max_tokens": 1500,
                    "temperature": 0.8,
                    "response_format": "detailed"
                }
            }
            
            response = self.session.post(
                f"{self.base_url}/v1/ai/analyze",
                json=payload,
                timeout=60
            )
            
            if response.status_code == 200:
                result = response.json()
                logger.info("Successfully completed fast mode analysis with Puter.js")
                return {
                    "success": True,
                    "result": result.get("analysis", ""),
                    "confidence": result.get("confidence", 0.0),
                    "processing_time": result.get("processing_time", 0)
                }
            else:
                logger.error(f"Puter.js fast mode error: {response.status_code} - {response.text}")
                return {
                    "success": False,
                    "error": f"Fast mode error: {response.status_code}"
                }
                
        except Exception as e:
            logger.error(f"Error in fast mode analysis: {str(e)}")
            return {
                "success": False,
                "error": f"Fast mode error: {str(e)}"
            }
    
    def _get_mime_type(self, extension: str) -> str:
        """Get MIME type based on file extension"""
        mime_types = {
            '.txt': 'text/plain',
            '.md': 'text/markdown',
            '.py': 'text/x-python',
            '.js': 'application/javascript',
            '.jsx': 'application/javascript',
            '.ts': 'application/typescript',
            '.tsx': 'application/typescript',
            '.json': 'application/json',
            '.xml': 'application/xml',
            '.html': 'text/html',
            '.css': 'text/css',
            '.csv': 'text/csv',
            '.pdf': 'application/pdf',
            '.doc': 'application/msword',
            '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            '.xls': 'application/vnd.ms-excel',
            '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.png': 'image/png',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml'
        }
        return mime_types.get(extension.lower(), 'application/octet-stream')
    
    def is_available(self) -> bool:
        """Check if Puter.js API is available"""
        try:
            response = self.session.get(f"{self.base_url}/v1/health", timeout=10)
            return response.status_code == 200
        except:
            return False

# Global instance
puter_ai = PuterAI() 