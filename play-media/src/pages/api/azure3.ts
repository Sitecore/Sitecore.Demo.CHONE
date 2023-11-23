// server.js
const apiKey = process.env.AZURE_OPENAI_KEY;
const base_url = process.env.BASE_URL;
const deploymentName = process.env.DEPLOYMENT_NAME;

//let url = `${base_url}/openai/deployments/${deploymentName}/completions?api-version=2022-12-01`;

let url = `https://sitecoreopenai-sandbox-product.openai.azure.com/openai/deployments/mytextmodel/completions?api-version=2022-12-01`;
console.log("i am at top trying the azure ai!!!!")
export default async function (req, res) {
    try {
      console.log("i am trying the azure ai!!!!")
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': 'c776fbacfeba4785ad35a69c652e7314'
            },

            body: JSON.stringify({
              model: "text-davinci-003",
              prompt: "Topic: Yoga",
              max_tokens: 250,
              temperature: 0.7

            }),

        });

        const data = await response.json();
        res.status(200).json({ result: data.choices[0].text });


    } catch(e) {
        console.error(e);
    }
}

function generatePrompt(prompt) {
    return {
        'prompt': prompt,
        'max_tokens': 1000,
        // other options here
    };
}