from flask import Flask, send_from_directory, render_template
import os

app = Flask(__name__, static_folder='react-frontend/build', template_folder='templates')

@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def static_proxy(path):
    file_name = path.split('/')[-1]
    dir_name = os.path.join(app.static_folder, '/'.join(path.split('/')[:-1]))
    return send_from_directory(dir_name, file_name)

if __name__ == '__main__':
    app.run(debug=True)
