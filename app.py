import json

from flask import Flask, send_from_directory, render_template, jsonify, request
import os
# import openai  # Предполагаем, что используем OpenAI API
import requests
from dotenv import load_dotenv

# Загрузка переменных окружения из файла .env
load_dotenv()

# app = Flask(__name__, static_folder='react-frontend/build', template_folder='templates')
app = Flask(__name__, static_folder='react-frontend/build')

# @app.route('/<path:path>')
# def static_proxy(path):
#     file_path = os.path.join(app.static_folder, path)
#     if os.path.exists(file_path):
#         return send_from_directory(app.static_folder, path)
#     else:
#         return send_from_directory(app.static_folder, 'index.html')


@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')


# @app.route('/training')
# def training():
#     return send_from_directory(app.static_folder, 'training.html')

@app.route('/<path:path>', methods=['GET'])
def serve_react_app(path):
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


# @app.route('/<path:path>')
# def catch_all(path):
#     if path.startswith('api/'):
#         # Для всех API маршрутов, которые начинаются с /api/
#         return send_from_directory(app.static_folder, path)
#     else:
#         # Для всех остальных маршрутов возвращаем index.html
#         return send_from_directory(app.static_folder, 'index.html')


#
# @app.route('/test1')
# def test1():
#     return send_from_directory(app.static_folder, 'test1.html')
#
#
# @app.route('/test2')
# def test2():
#     return send_from_directory(app.static_folder, 'test2.html')
#
#
# @app.route('/writing')
# def writing():
#     return send_from_directory(app.static_folder, 'writing.html')
#
#
# @app.route('/speaking')
# def speaking():
#     return send_from_directory(app.static_folder, 'speaking.html')


# @app.route('/evaluate_essay', methods=['POST'])
# def evaluate_essay():
#     data = request.get_json()
#     essay = data['essay']
#
#     # Использование OpenAI API для оценки эссе
#     openai.api_key = os.getenv("OPENAI_API_KEY")
#     response = openai.Completion.create(
#         engine="text-davinci-003",  # Используем соответствующую модель
#         prompt=f"Evaluate the following essay: {essay}",
#         max_tokens=1500
#     )
#
#     return jsonify(response.choices[0].text.strip())
@app.route('/evaluate_essay', methods=['POST'])
def evaluate_essay():
    data = request.get_json()
    essay = data['essay']
    print(essay)
    # Aylien API ключи
    AYLIEN_API_ID = os.getenv("AYLIEN_API_ID")
    AYLIEN_API_KEY = os.getenv("AYLIEN_API_KEY")

    headers = {
        'X-AYLIEN-TextAPI-Application-ID': AYLIEN_API_ID,
        'X-AYLIEN-TextAPI-Application-Key': AYLIEN_API_KEY,
        'Content-Type': 'application/json'
    }

    response = requests.post(
        "https://api.aylien.com/api/v1/sentiment",
        headers=headers,
        json={"text": essay}
    )

    print(response.json())
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": "Something went wrong"}), 500


@app.route('/get_questions', methods=['GET'])
def get_questions():
    with open('questions.json', 'r', encoding='utf-8') as f:
        questions = json.load(f)
    return jsonify(questions)


# @app.route('/<path:path>')
# def static_proxy(path):
#     return send_from_directory(app.static_folder, path)


if __name__ == '__main__':
    app.run(debug=True)
