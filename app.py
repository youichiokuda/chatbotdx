from flask import Flask, request, jsonify
import openai
from flask_cors import CORS
import os

openai_api_key = os.environ.get('OPENAI_API_KEY')



app = Flask(__name__)

CORS(app, resources={r"/chat": {"origins": "*"}})



@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json['user_input']
    prompt = f"以下は医療とDXに関連する会話です:\nUser: {user_input}\nBot:"
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=150
    )
    reply = response.choices[0].text
    return jsonify(reply=reply)

if __name__ == '__main__':
    app.run(debug=True)

