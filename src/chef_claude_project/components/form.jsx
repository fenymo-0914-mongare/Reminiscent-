import React from "react"
import { useAtom } from "jotai"
import ReactMarkdown from "react-markdown"
import { loadingAtom } from "../states/atoms.js"
import { Spinner} from "flowbite-react"

import { ingredientsAtom, recipeAtom } from "../states/atoms"
import { getRecipeChef } from "../hugginFace"

const Form = () => {
    const [ingredients, setIngredients] = useAtom(ingredientsAtom)
    const [recipe, setRecipe] = useAtom(recipeAtom)
    const [loading, setLoading] = useAtom(loadingAtom)

    function handleSubmit(e) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        const newIngredient = formData
            .get("Ingredients")
            ?.trim()

        if (
            newIngredient &&
            !ingredients.includes(newIngredient)
        ) {
            setIngredients(prev => [
                ...prev,
                newIngredient
            ])
        }

        e.currentTarget.reset()
    }

    async function handleGenerateRecipe() {
        try {
            const generatedRecipe =
                await getRecipeChef(ingredients)

            setRecipe(generatedRecipe)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(true)
            await new Promise(resolve => setTimeout(resolve, 2000))
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6">
            <form
                onSubmit={handleSubmit}
                className="flex gap-3 items-center justify-center p-3 w-full border border-gray-300 rounded-sm bg-white"
            >
                <div className="flex-1 focus-within:ring-2 focus-within:ring-orange-300 rounded-sm">
                    <input
                        aria-label="ingredients"
                        name="Ingredients"
                        type="text"
                        placeholder="e.g tomato"
                        className="w-full border-none bg-transparent outline-none px-2 py-1"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-black text-white text-sm px-3 py-2 rounded-sm hover:bg-black/80 transition-colors duration-200"
                >
                    + Add Ingredient
                </button>
            </form>
            {ingredients.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">
                        Your Ingredients:
                    </h2>

                    <ul className="list-disc list-inside space-y-1">
                        {ingredients.map((ingredient, index) => (
                            <li
                                key={index}
                                className="text-sm text-gray-700"
                            >
                                {ingredient}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {ingredients.length > 3 && (
                <div className="flex items-center gap-4 mt-6 p-4 border border-gray-300 rounded-sm bg-white">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-xl font-bold">
                            Ready for a Recipe?
                        </h1>

                        <p className="text-sm text-gray-600">
                            Generate a recipe from your ingredients.
                        </p>
                    </div>

                    <button
                        onClick={handleGenerateRecipe} disabled={loading}
                        className="ml-auto bg-green-600 text-white text-sm px-4 py-2 rounded-sm hover:bg-green-700 transition-colors duration-200"
                    >
                        {!loading ? (
                            "Generate Recipe"
                        ) : (
                           <span className="flex items-center gap-2">
                                <Spinner color="warning" size="lg" />
                                Generating recipe...
                            </span> 
                        )}
                    </button>
                </div>
            )}

            {recipe && (
                <div className="mt-6 p-4 border border-gray-300 rounded-sm bg-white">
                    <h1 className="text-2xl font-bold mb-4">
                        Your Recipe
                    </h1>
                    <div className="prose text-lg font-mono prose-sm max-w-none text-white bg-slate-800 p-4 rounded-sm">
                        <ReactMarkdown>
                            {recipe}
                        </ReactMarkdown>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Form