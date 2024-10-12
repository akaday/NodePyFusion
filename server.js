import json

def process_data():
    data = {"message": "Hello from Python with data processing!"}
    return json.dumps(data)

if __name__ == "__main__":
    print(process_data())
