from flask import Flask, jsonify, render_template, request
import openai
import pandas as pd
import numpy as np
import os
import re

app = Flask(__name__, static_url_path='/static')
site_name = app.name

openai.api_key = "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"


# excel_file_path = r"/Users/natalieotero22/girls who cant code/Hackalytics/iwanttodie.xlsx"
script_dir = os.path.dirname(os.path.realpath(__file__))
excel_file_name = "complete_med_records.xlsx"
sumfile_name = "static/Summary.txt"
personfile_name = "static/person.txt"
excel_file_path = os.path.join(script_dir, excel_file_name)
personfile_path = os.path.join(script_dir, personfile_name)
sumfile_path = os.path.join(script_dir, sumfile_name)
df = pd.read_excel(excel_file_path)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    query = request.form.get('query', '')
    bot_response = generate_bot_response("read file " + query)
    summary_response = generate_bot_response("summarize " + query)
    return render_template('index.html', bot_response=bot_response)

def generate_bot_response(user_input):
    max_tokens = 4096
    if "read file" in user_input:
        query = user_input.replace("read file", "").strip()
        result = df[df['full_name'].str.contains(query, case=False)]
        if not result.empty:
            response_text = result.to_string()
            if len(response_text) > max_tokens:
                response_text = response_text[:max_tokens]
            with open(personfile_path, 'w') as f:
                lines = result.to_string().split('\n')
                lines = lines[1:]
                lines = re.split(r'\s\s+', result.to_string())
                f.write('\n'.join(lines))
            return response_text
        else:
            return "No matching records found."
    elif "summarize" in user_input:
        query = user_input.replace("summarize ", "").strip()
        result = df[df['full_name'].str.contains(query, case=False)]
        print(result)
        summary_input = result.to_string()
        if len(summary_input) > max_tokens:
                summary_input = summary_input[:max_tokens]
        prompt =  f"Please summarize the following medical report in a paragraph: {summary_input}. The summary should include past medical history, Healthcare, Vital Signs, Smoking Status and Diagnoses."
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "system", "content": "You are a helpful assistant."},
                    {"role": "user", "content": prompt}],
            max_tokens=800
        )
        response_text = response['choices'][0]['message']['content']
        print("Bot Response (summarize):", response_text) 
        with open(sumfile_path, 'w') as f:
            f.write(response_text)
        return response_text
    else:
        return "Sorry, I don't understand."

if __name__ == '__main__':
    app.run(debug=True, port=5500)