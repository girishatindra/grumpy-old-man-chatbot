# :older_man: Chat With The Grumpy Old Man — *A Gemini AI Experience*

Talk with a grumpy, wise, and occasionally hilarious old man — powered by Google Gemini, built using Flask and hosted on Render.

This chatbot simulates a realistic conversation with an old man's persona, enhanced with emotional understanding and audio responses.

<br>

<div align="center" >

[![grandpa-thumbnail](/docs/grandpa-thumnail.png)](#)

</div>

<br>

---

<br>

## 🧠 What It Does

- 💬 Chat with a Grandpa-like AI using Gemini Flash 2.0
- 🎭 Emotion tagging: happy, sad, or confused
- 🔊 Sound feedback based on detected emotions
- :performing_arts: changes facial expressions based on detected emotions
- ☁️ Hosted entirely on [Render](https://render.com)

<br>

## ❓How It Works

- The app uses Google’s **Gemini API** to generate responses.
- Each response includes:
  - `content`: Old man’s reply
  - `emotion`: Interpreted as `"happy"`, `"sad"`, or `"confused"`
- Emotion is detected based on:
  - Compliments (or anything that makes grandpa happy) → `happy`
  - Insults (or anything that makes grandpa sad)→ `sad`
  - Ambiguous prompt → `confused`
- A corresponding audio clip is played for each emotion.
- SpeechSynthesiser used for audio feedback

Example response:
```json
{
  "content": "I appreciate that, youngster!",
  "emotion": "happy"
}
```

<br>

## :desktop_computer: Tech Stack

- Flask
- Gemini API Flash 2.0
- Jquery

<br>

## :construction: Upcoming Features
- New Eomtions and Expressions
- OAuth Integration
- Chat history (for a continuous flow of conversation)
  
