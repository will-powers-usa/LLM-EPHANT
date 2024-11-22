const OpenAI =  require('openai');

const fs = require('fs');

// Read file asynchronously
api_key = fs.readFileSync('openAI.key',);

const client = new OpenAI({
  apiKey: api_key, // This is the default and can be omitted
});

// # transfiguration-prompts-celeb.jsonl ftjob-4rvKnVACTsjsHtyfhXBtyRPy ASbzY3Jh
// # transfiguration-prompts-unknown.jsonl ftjob-fALIKTHqgHHtAHA4wGVdS3Qt ASbzjz5M



async function callChatbot(prompt,known_tag){
      const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: `gpt-4o-mini`,
      });
      return chatCompletion.choices[0].message.content 

}

module.exports = { callChatbot };