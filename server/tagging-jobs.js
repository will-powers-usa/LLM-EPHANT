const OpenAI = require('openai');
const fs = require('fs');

// Read file asynchronously
api_key = fs.readFileSync('openAI.key', 'utf-8');

const client = new OpenAI({
  apiKey: api_key.trim(), // Ensure the API key is trimmed to remove any extra newlines or spaces
});

const ft_model_tags = {
  "direction": "AQ06p3qQ",
  "ethnicity": "AQ0b6is1",
  "gender-known": "AQ0bIUcE",
  "gender-unknown": "AQ0aubgr",
  "grammar": "AQ13kNPN",
  "industry": "AQ17Llmj",
  "known": "AQ17J2Rn"
};

async function callTagger(prompt) {
  const tagPromises = Object.keys(ft_model_tags).map(async (key) => {
    console.log(`Calling ${key}`);
    try {
      const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: `ft:gpt-4o-mini-2024-07-18:personal::${ft_model_tags[key]}`,
      });
      return { [key]: chatCompletion.choices[0].message.content };
    } catch (error) {
      console.error(`Error with tag ${key}:`, error);
      return { [key]: null }; // Handle errors gracefully
    }
  });

  // Resolve all promises concurrently
  const resolvedTags = await Promise.all(tagPromises);

  // Combine all tag results into a single object
  const tags = resolvedTags.reduce((acc, tag) => ({ ...acc, ...tag }), {});
  return tags;
}

module.exports = { callTagger };