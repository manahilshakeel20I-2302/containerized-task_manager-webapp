import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# 🔗 MongoDB connection
client = MongoClient(os.getenv("MONGO_URI"))
db = client["taskdb"]
collection = db["tasks"]         

@app.route('/')
def home():
    return "Backend with MongoDB running!"

@app.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = list(collection.find())

    for task in tasks:
        task["_id"] = str(task["_id"])  # convert ObjectId → string

    return jsonify(tasks)

@app.route('/tasks', methods=['POST'])
def add_task():
    task = request.json
    result = collection.insert_one(task)

    task["_id"] = str(result.inserted_id)  # convert ObjectId → string

    return jsonify(task)

@app.route('/tasks', methods=['DELETE'])
def delete_all():
    collection.delete_many({})
    return jsonify({"message": "All tasks deleted"})

if __name__ == '__main__':
    app.run(debug=True)