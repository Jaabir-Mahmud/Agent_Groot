# AI Model Integration Guide for Groot Multi-Agent AI System

This guide explains how to integrate real Large Language Models (LLMs) and other AI models into the Groot Multi-Agent AI System. The current system uses simulated responses, and this guide will help you replace those simulations with actual API calls to your chosen AI services.

## 📍 Where to Make Changes

All primary changes for AI model integration will be made in the backend Flask application, specifically in the file:

`groot-backend/src/routes/agents.py`

## 🧠 Understanding the Placeholder Functions

In `agents.py`, you will find the following placeholder functions:

- `call_llm_api(prompt, model_name, max_tokens, temperature)`
- `research_with_llm(query)`
- `generate_content_with_llm(topic, research_summary)`

These functions currently return simulated responses. Your task is to replace their internal logic with actual API calls to your preferred LLM providers (e.g., OpenAI, Google Gemini, Hugging Face, etc.).

## 🔑 API Keys and Environment Variables

It is highly recommended to manage your API keys and sensitive information using environment variables. You can create a `.env` file in the `groot-backend/` directory and load it using a library like `python-dotenv`.

**Example `.env` file:**
```
LLM_API_KEY=your_llm_api_key_here
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GEMINI_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**To load environment variables in `main.py` (or directly in `agents.py` if preferred):**

First, install `python-dotenv`:
```bash
cd groot-backend
source venv/bin/activate
pip install python-dotenv
```

Then, add this to the top of `groot-backend/src/main.py` (or `agents.py`):
```python
import os
from dotenv import load_dotenv

load_dotenv()  # This will load variables from .env
```

Now you can access your API key using `os.getenv("LLM_API_KEY")`.

## 🛠️ Integrating Your AI Models

### 1. `call_llm_api` Function

This is the core function where you will make the actual API call to your LLM provider. You will need to install the appropriate client library for your chosen LLM.

**Example: Integrating OpenAI GPT-3.5/GPT-4**

First, install the OpenAI Python client:
```bash
cd groot-backend
source venv/bin/activate
pip install openai
```

Then, modify the `call_llm_api` function in `groot-backend/src/routes/agents.py`:

```python
import os
# from openai import OpenAI # Uncomment this line

def call_llm_api(prompt, model_name="gpt-3.5-turbo", max_tokens=500, temperature=0.7):
    """Function for calling a Large Language Model (LLM) API.
    Replace this with actual API calls to your chosen LLM (e.g., OpenAI, Google Gemini, Hugging Face).
    """
    try:
        # Example for OpenAI
        # client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        # response = client.chat.completions.create(
        #     model=model_name,
        #     messages=[
        #         {"role": "system", "content": "You are a helpful assistant."},
        #         {"role": "user", "content": prompt}
        #     ],
        #     max_tokens=max_tokens,
        #     temperature=temperature,
        # )
        # return response.choices[0].message.content

        # Example for Google Gemini (using google-generativeai library)
        # import google.generativeai as genai
        # genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        # model = genai.GenerativeModel(model_name)
        # response = model.generate_content(prompt)
        # return response.text

        # Placeholder response if no actual API is integrated
        return f"[LLM Response for \""{prompt[:100]}...\""" using {model_name}]\nThis is a simulated response from an AI model. Integrate your actual LLM API here."

    except Exception as e:
        print(f"Error calling LLM API: {e}")
        return f"Error: Could not get response from LLM. {e}"
```

**Note**: Remember to uncomment the `import` statements for the client libraries you choose to use.

### 2. `research_with_llm` Function

This function is called by the Research Agent. You can refine the prompt here to guide the LLM for research tasks.

```python
def research_with_llm(query):
    """Simulates research using an LLM.
    Replace with actual LLM call for research and summarization.
    """
    prompt = f"Conduct comprehensive research on: {query}. Summarize key findings, trends, and important data points. Provide sources if possible. Focus on factual accuracy and conciseness."
    return call_llm_api(prompt, model_name="research_llm_model_name") # Specify your research model here
```

### 3. `generate_content_with_llm` Function

This function is called by the Content Agent. You can refine the prompt here to guide the LLM for content generation tasks.

```python
def generate_content_with_llm(topic, research_summary=""):
    """Simulates content generation using an LLM.
    Replace with actual LLM call for content creation.
    """
    prompt = f"Generate a detailed report or article on the topic: {topic}. Incorporate the following research summary: {research_summary}. Include an executive summary, detailed analysis, and actionable recommendations. Ensure the tone is professional and informative."
    return call_llm_api(prompt, model_name="content_llm_model_name") # Specify your content generation model here
```

## ✅ Verification

After integrating your AI models:

1.  **Restart the Backend**: Ensure your Flask backend is restarted to pick up the changes.
    ```bash
    cd groot-backend
    source venv/bin/activate
    python src/main.py
    ```
2.  **Submit a Task**: Go to the Groot dashboard (`http://localhost:5173/dashboard` if running frontend locally) and submit a task.
3.  **Monitor Activity**: Observe the activity log. You should see messages indicating that the LLM is being called, and the final result should contain responses generated by your integrated AI models instead of the simulated ones.

## ⚠️ Important Considerations

-   **API Rate Limits**: Be mindful of API rate limits from your LLM providers. Implement retry mechanisms or back-off strategies if necessary.
-   **Cost**: LLM API calls incur costs. Monitor your usage.
-   **Model Selection**: Choose appropriate LLM models for each agent's task (e.g., a powerful model for complex research, a faster model for simpler content generation).
-   **Error Handling**: Enhance the `try-except` blocks to handle specific API errors gracefully.
-   **Security**: Never hardcode API keys directly in your code. Always use environment variables.
-   **Scalability**: For production deployments, consider using a dedicated message queue (e.g., Celery with Redis/RabbitMQ) for asynchronous task processing to avoid blocking the main Flask thread during LLM calls.

By following these steps, you can successfully integrate real AI models into your Groot Multi-Agent AI System, transforming it from a simulation into a powerful, AI-driven application.

