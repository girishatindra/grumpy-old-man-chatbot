# :older_man: Chat With The Grumpy Old Man — *A Gemini AI Experience*

<br>
<br>

> [!IMPORTANT]
> <br> **Infrastructure Migration in Progress**<br><br>
> *The site is currently being deployed to Google Cloud Platform (GCP) to fully utilize its cloud infrastructure. The service is temporarily offline during this transition. We'll be back online once the "Grumpy Old Man" finishes his digital renovations.*<br>

<br>
<br>

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
- ☁️ **Infrastructure**: Full migration to Google Cloud Platform for better scalability.
- 🗣️ **Audio**: Integration of Gemini Text-to-Speech (TTS) for a more immersive character experience.
- 🔊 **UI/UX**: A dedicated Audio Toggle to give users control over sound output.
- 🎭 **Logic**: Enhanced Emotional Engine to provide a wider range of character expressions.
- 🕛 **Memory**: Single Session Chat History to maintain context during conversations.

