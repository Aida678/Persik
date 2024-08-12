import json
from datetime import timedelta

from flask import Flask, send_from_directory, render_template, jsonify, request
import os
# import openai  # Предполагаем, что используем OpenAI API
import requests
from flask_bcrypt import Bcrypt
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
# Загрузка переменных окружения из файла .env
load_dotenv()

# app = Flask(__name__, static_folder='react-frontend/build', template_folder='templates')
app = Flask(__name__, static_folder='react-frontend/build')
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=20)


CORS(app)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
# login_manager = LoginManager(app)
# login_manager.login_view = 'login'

# @app.route('/<path:path>')
# def static_proxy(path):
#     file_path = os.path.join(app.static_folder, path)
#     if os.path.exists(file_path):
#         return send_from_directory(app.static_folder, path)
#     else:
#         return send_from_directory(app.static_folder, 'index.html')
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(150), nullable=False)
    last_name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(150), nullable=False)


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


@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(first_name=data['first_name'], last_name=data['last_name'], email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    access_token = create_access_token(identity=new_user.id)
    return jsonify(access_token=access_token)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if user and bcrypt.check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token)
    return jsonify({'message': 'Invalid credentials'}), 401


@app.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({
        'first_name': user.first_name,
        'last_name': user.last_name,
        'email': user.email
    })

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
@jwt_required()
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
@jwt_required()
def get_questions():
    with open('questions.json', 'r', encoding='utf-8') as f:
        questions = json.load(f)
    return jsonify(questions)


# @app.route('/<path:path>')
# def static_proxy(path):
#     return send_from_directory(app.static_folder, path)


if __name__ == '__main__':
    app.run(debug=True)
