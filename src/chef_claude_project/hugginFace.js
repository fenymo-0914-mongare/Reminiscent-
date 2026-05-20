import {HfInference} from '@huggingface/inference'

const SYS_PROMPT =`You are an assistant that receives a list of ingredients that a user has and suggestd a recipe they could make with some or all of those ingredients. you do not need to use every ingredient they mention in your recipe.
    The recipe can include additional ingredients they did not mention, but it should primarily focus on the ingredients they have, try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.`       

const hugginFaceAPI = new HfInference({
    token: process.env.HUGGING_FACE_API_KEY,
    dangerouslyAllowBrowser: true
})

export async function getRecipechef(ingredientsArray) {
    const ingredientsList = ingredientsArray.join(', ')

    try{
        const message = await hugginFaceAPI.chat.complete({
        model: 'mistlarai/Mixtral-8x7B-Instruct-v0.1.Q4_0.gguf',
        max_tokens: 1024,
        messages: [
            { role: 'system', content: SYS_PROMPT },
            { role: 'user', content: `Here are the ingredients I have: ${ingredientsList}. What can I make with them?` }
        ]
    })

    return message.choices[0].message

    }catch(error){
        return ( (error instanceof Error) ? error.message : 'An unknown error occurred while fetching the recipe.')

    }
}