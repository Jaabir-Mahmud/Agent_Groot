# src/utils/llm.py
import requests
import json
import tiktoken
from flask import current_app

def count_tokens(text, model="gpt-3.5-turbo"):
    """
    Count tokens in text using tiktoken.
    Using gpt-3.5-turbo encoding as it's commonly supported.
    """
    try:
        encoding = tiktoken.encoding_for_model(model)
        return len(encoding.encode(text))
    except Exception as e:
        current_app.logger.warning(f"Could not count tokens with tiktoken: {e}")
        # Fallback: rough estimate (1 token ≈ 4 characters)
        return len(text) // 4

def call_llm_api(prompt):
    # Count tokens in the prompt
    prompt_tokens = count_tokens(prompt)
    max_prompt_tokens = 3750
    
    if prompt_tokens > max_prompt_tokens:
        current_app.logger.warning(f"Prompt too long: {prompt_tokens} tokens (max: {max_prompt_tokens})")
        return f"Error: Prompt too long ({prompt_tokens} tokens). Maximum allowed is {max_prompt_tokens} tokens."
    
    url = "http://localhost:11434/api/generate"
    payload = {
        "model": "mistral",
        "prompt": prompt,
        "stream": False,
        "num_predict": 3750,
        "timeout": 300
    }
    headers = {"Content-Type": "application/json"}
    
    try:
        current_app.logger.debug(f"Sending to Ollama: {payload}")
        current_app.logger.info(f"Prompt tokens: {prompt_tokens}")
        response = requests.post(url, data=json.dumps(payload), headers=headers, timeout=300)
        response.raise_for_status()
        return response.json().get("response", "No response")
    except requests.exceptions.RequestException as e:
        current_app.logger.error(f"API call failed: {e}")
        return f"Error: {str(e)}"