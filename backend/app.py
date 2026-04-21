from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# MongoDB connection
client = MongoClient(os.getenv("MONGO_URI"))
db = client["taskdb"]
collection = db["tasks"]

# -------------------------
# GET all tasks
# -------------------------
@app.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = list(collection.find())
    formatted_tasks = []
    for task in tasks:
        formatted_tasks.append({
            "_id": str(task["_id"]),
            "title": task.get("title", ""),
            "completed": task.get("completed", False)
        })

    return jsonify(formatted_tasks)

# -------------------------
# POST new task
# -------------------------
@app.route("/tasks", methods=["POST"])
def add_task():
    data = request.get_json()

    new_task = {
        "title": data.get("title", ""),
        "completed": False
    }

    result = collection.insert_one(new_task)
    new_task["_id"] = str(result.inserted_id)

    return jsonify(new_task)

# -------------------------
# UPDATE task (toggle complete or edit)
# -------------------------
@app.route("/tasks/<task_id>", methods=["PUT"])
def update_task(task_id):
    data = request.get_json()

    collection.update_one(
        {"_id": ObjectId(task_id)},
        {"$set": data}
    )

    updated_task = collection.find_one({"_id": ObjectId(task_id)})

    return jsonify({
        "_id": str(updated_task["_id"]),
        "title": updated_task.get("title", ""),
        "completed": updated_task.get("completed", False)
    })

# -------------------------
# DELETE task
# -------------------------
@app.route("/tasks/<task_id>", methods=["DELETE"])
def delete_task(task_id):
    collection.delete_one({"_id": ObjectId(task_id)})

    return jsonify({"message": "Task deleted successfully"})

# -------------------------
# Run app
# -------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)