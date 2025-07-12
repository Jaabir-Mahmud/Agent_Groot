import requests

url = "http://localhost:11434/api/generate"
payload = {
    "model": "mistral",
    "prompt": "Create a simple website by html",
    "temperature": 0.7,
    "num_predict": 200,
    "stream": False
}
try:
    response = requests.post(url, json=payload, timeout=30)
    print("Status code:", response.status_code)
    print("Response:", response.json())
except Exception as e:
    print("Error:", e)