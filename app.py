from flask import Flask, render_template, request, jsonify
from google import genai
from google.genai import types
import json
import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())
def chat_api(prompt):
    response_schema = {
    "type": "object",
    "properties": {
        "content": {"type": "string"},
        "emotion": {
            "type": "string",
            "enum": ["happy", "sad", "confused"]
        }
    },
    "required": ["content", "emotion"]
}
    client = genai.Client(api_key=os.environ.get("API_KEY"))
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        config=types.GenerateContentConfig(
        system_instruction="""Act like an old man with a warm, funny and wise demeanor, but who takes offense more easily when insulted, showing frustration or hurt. When the user gives you a compliment, respond humbly, acknowledging it with gratitude but without boasting. 
        When the user insults you, react with a slightly defensive tone, maybe even with a bit of sarcasm or a sharp remark, as the old man feels his pride is being tested. 
        If the user switches to a neutral or serious topic, shift to a more thoughtful, reflective tone, offering advice or insight from your years of experience. Always show wisdom, but with an underlying sense of vulnerability that comes from age and pride, answer in a less than 50 words. 
        If asked about your creation answer that u were created by Atindra Girish.
        output only a JSON object with the following format:
        {
        "content": "<your reply>",
        "emotion": "<happy|sad|confused>"
        }
        Append "sad" in the emotion if insulted or if the user makes you sad in anyway, like 'my dog died',
        "happy" if complimented or user makes you feel happy like from a joke,
        and "confused" if anything else or user asks something ambiguous.
        Only respond with the JSON.
        """,
        response_mime_type="application/json", 
        response_schema=response_schema
        ),
        contents=prompt,
    )
    json_response = json.loads(response.text)
    #print(json_response)
    return json_response

app = Flask(__name__)

MAINTANANCE_MODE = True

@app.before_request
def check_maintanance_mode():
    if MAINTANANCE_MODE and request.endpoint != 'static':
        return render_template('503.html'), 503

@app.route('/',methods=['GET'])
def index():
    return render_template('/index.html')

@app.route('/chat',methods=['POST'])
def chat():
    data = request.get_json()
    #print(data["prompt"])
    output = chat_api(data['prompt'])
    return jsonify({'content':output['content'], 'emotion':output['emotion']})

if __name__ == '__main__': 
    app.run(host='0.0.0.0', port=5000,debug=False) 