
const apiKey = process.env.NEXT_PUBLIC_AZURE_OPENAI_KEY;
const base_url = process.env.NEXT_PUBLIC_BASE_URL;
const deploymentName = process.env.NEXT_PUBLIC_DEPLOYMENT_NAME;

let url = `${base_url}/openai/deployments/${deploymentName}/completions?api-version=2022-12-01`;

export default async function (req, res) {
    try {

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey
            },

            body: JSON.stringify({
              model: "text-davinci-003",
              prompt: "Topic: Hiking",
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