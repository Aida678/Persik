from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html")


@app.route('/training')
def training():
    return render_template("training.html")


@app.route('/test')
def test():
    return render_template("test.html")


@app.route('/writing')
def writing():
    return render_template("writing.html")


@app.route('/speaking')
def speaking():
    return render_template("speaking.html")


if __name__ == '__main__':
    app.run(debug=True)

