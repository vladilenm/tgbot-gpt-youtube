import { Configuration, OpenAIApi } from 'openai'
import config from 'config'
import { createReadStream } from 'fs'

class OpenAI {
  roles = {
    ASSISTANT: 'assistant',
    USER: 'user',
    SYSTEM: 'system',
  }

  constructor(apiKey) {
    const configuration = new Configuration({
      apiKey,
    })
    this.openai = new OpenAIApi(configuration)
  }

async chat(messages) {
try {
const response = await this.openai.createChatCompletion({
model: 'gpt-3.5-turbo',
messages,
})
if (response == undefined || !response.data.choices.length) {
throw new Error("Something went wrong!");
}
return response.data.choices[0].message
} catch (err) {
if (err["response"]["status"] == "404") {
console.error(
"\nNot Found: Model not found. Please check the model name."
);
}
if (err["response"]["status"] == "429") {
console.error(
"\nAPI Rate Limit Exceeded: ChatGPT is getting too many requests from the user in a short period of time. Please wait a while before sending another message."
);
}
if (err["response"]["status"] == "400") {
console.error(
"\nBad Request: Prompt provided is empty or too long. Prompt should be between 1 and 4096 tokens."
);
}
if (err["response"]["status"] == "402") {
console.error(
"\nPayment Required: ChatGPT quota exceeded. Please check you chatGPT account."
);
}
if (err["response"]["status"] == "503") {
console.error(
"\nService Unavailable: ChatGPT is currently unavailable, possibly due to maintenance or high traffic. Please try again later."
);
} else {
console.error("Something went wrong!!!");
}
return "Произошла непредвиденная ошибка";
}
}

async transcription(filepath) {
try {
const response = await this.openai.createTranscription(
createReadStream(filepath),
'whisper-1'
)
return response.data.text
} catch (err) {
if (err["response"]["status"] == "404") {
console.error(
"\nNot Found: Model not found. Please check the model name."
);
}
if (err["response"]["status"] == "429") {
console.error(
"\nAPI Rate Limit Exceeded: ChatGPT is getting too many requests from the user in a short period of time. Please wait a while before sending another message."
);
}
if (err["response"]["status"] == "400") {
console.error(
"\nBad Request: Prompt provided is empty or too long. Prompt should be between 1 and 4096 tokens."
);
}
if (err["response"]["status"] == "402") {
console.error(
"\nPayment Required: ChatGPT quota exceeded. Please check you chatGPT account."
);
}
if (err["response"]["status"] == "503") {
console.error(
"\nService Unavailable: ChatGPT is currently unavailable, possibly due to maintenance or high traffic. Please try again later."
);
} else {
console.error("Something went wrong!!!");
}
return "Скажи текст "Произошла непредвиденная ошибка" другими словами";
}
}
}

export const openai = new OpenAI(config.get('OPENAI_KEY'))
