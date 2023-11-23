
const apiKey = process.env.NEXT_PUBLIC_AZURE_OPENAI_KEY;
const base_url = process.env.NEXT_PUBLIC_BASE_URL;
const deploymentName = process.env.NEXT_PUBLIC_DEPLOYMENT_NAME;

let url = `${base_url}/openai/deployments/${deploymentName}/chat/completions?api-version=2023-07-01-preview`;

export default async function (req, res) {
    console.log("trying url: ", url);
    try {

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey
            },

            body: JSON.stringify({
                model: "text-davinci-003",
                messages: [
                    {
                        role: "user",
                        content: "a short article summary for mountain biking in Epping Forest"
                    }
                ],
                temperature: 0.5,
                top_p: 1,
                n: 1,
                stream: false,
                max_tokens: 150,
                presence_penalty: 0,
                frequency_penalty: 0
            }),

        });

        const data = await response.json();
        console.log("response: ", data);
        res.status(200).json({ result: data.choices[0].message.content });


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