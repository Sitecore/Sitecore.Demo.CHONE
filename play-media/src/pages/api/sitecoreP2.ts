import { Configuration, OpenAIApi } from "openai";
import { resourceLimits } from "worker_threads";


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function P2(req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: reviewPrompt(req.body.product),
    max_tokens: 150,
    temperature: 0.70,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0
  });
  res.status(200).json({ result: completion.data.choices[0].text });
  //console.log('P2: '+ completion.data.choices[0].text);
  //console.log('P2: '+ completion.data.choices[0].text);
}

function reviewPrompt(productName) {
  return `Topic: Scuba Diving at Skomer Marine Reserve Wales`;
}






