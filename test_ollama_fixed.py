import requests
import time

def test_ollama_with_timeout(timeout_seconds=120):
    url = "http://localhost:11434/api/generate"
    payload = {
        "model": "mistral",
        "prompt": "Create a simple website by html",
        "temperature": 0.7,
        "num_predict": 200,
        "stream": False
    }
    
    print(f"Testing Ollama with {timeout_seconds} second timeout...")
    print(f"Prompt: {payload['prompt']}")
    print("-" * 50)
    
    start_time = time.time()
    
    try:
        response = requests.post(url, json=payload, timeout=timeout_seconds)
        end_time = time.time()
        
        print(f"Status code: {response.status_code}")
        print(f"Response time: {end_time - start_time:.2f} seconds")
        
        if response.status_code == 200:
            result = response.json()
            print("✅ SUCCESS!")
            print(f"Response: {result.get('response', 'No response')[:200]}...")
            return True
        else:
            print(f"❌ API Error: {response.text}")
            return False
            
    except requests.exceptions.Timeout:
        end_time = time.time()
        print(f"❌ TIMEOUT after {end_time - start_time:.2f} seconds")
        return False
    except Exception as e:
        end_time = time.time()
        print(f"❌ Error after {end_time - start_time:.2f} seconds: {e}")
        return False

if __name__ == "__main__":
    print("Testing Ollama API with increased timeout...")
    print("=" * 60)
    
    # Test with different timeouts
    timeouts = [30, 60, 120]
    
    for timeout in timeouts:
        success = test_ollama_with_timeout(timeout)
        print()
        if success:
            print(f"✅ Test passed with {timeout} second timeout!")
            break
        else:
            print(f"❌ Test failed with {timeout} second timeout")
            print()
    
    print("=" * 60)
    print("Test completed!") 