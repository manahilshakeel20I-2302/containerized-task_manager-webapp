import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
from bson.objectid import ObjectId
from bson.json_util import dumps, loads

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

# GET all tasks
@app.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = list(collection.find())

    # Ensure all tasks have consistent keys and string _id
    formatted_tasks = []
    for task in tasks:
        formatted_tasks.append({
            "_id": str(task.get("_id")),          # convert ObjectId to string
            "title": task.get("title", ""),       # default empty string if missing
            "completed": task.get("completed", False)  # default False
        })

    return jsonify(formatted_tasks)

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