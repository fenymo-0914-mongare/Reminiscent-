import React from 'react'
import { useAtom } from 'jotai'
import { ingredientsAtom } from '../states/atoms'

const Form = () => {
    const [ingredients, setIngredients] = useAtom(ingredientsAtom)

    const ingredientsList = ingredients.map((ingredient, index) => (
        <li key={index} className='text-sm text-gray-700'>{ingredient}</li>
    ))

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const newIngredient = formData.get('Ingredients')
        if (newIngredient) {
            setIngredients(prev => [...prev, newIngredient])
        } 
        e.currentTarget.reset()
    }

  return (
    <div className='max-w-md mx-auto mt-10 p-6' >
        <form className='flex gap-3 items-center-safe justify-items-center-safe p-3 w-[100%] order-2 border-gray-300 rounded-sm bg-white' 
            onSubmit={handleSubmit}>
            <div className="focus-within:ring-2 focus-within:ring-orange-300 rounded-sm">
                <input aria-label="ingredients" name='Ingredients' type="text" placeholder='e.g salagna'
                className='border-none bg-transparent outline-none px-2'/> 
            </div>              
            <button type="submit"
            className='bg-black text-white text-sm px-3 py-1 rounded-sm hover:bg-black/80 transition-colors duration-200'
            >+ Add ingredient</button>
        </form>
        <div className='mt-4'>
            <h2 className='text-lg font-semibold mb-2'>Ingredients List:</h2>
            <ul className='list-disc list-inside'>
                {ingredientsList}
            </ul>
            <div className="flex items-center gap-4 mt-6 p-4 border-2 border-gray-300 rounded-sm bg-white">
                <div className="flex flex-col gap-1">
                    <h1 className='text-2xl font-bold'>Ready for Recipe?</h1>
                    <p>Generate your recipe based on your ingredients!</p>
                </div>
                <button className='bg-orange-500 text-white px-4 py-2 rounded-sm hover:bg-orange-600 transition-colors duration-200'>
                    Generate Recipe
                </button>
            </div>
        </div>
    </div>
    )
}

export default Form
