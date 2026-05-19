import React from 'react'

const Form = () => {
  return (
    <div>
        <form className='flex gap-3 items-center-safe justify-items-center-safe p-3 w-[100%] border-2 border-gray-300 rounded-sm bg-white'>
            <div className="focus-within:ring-2 focus-within:ring-orange-300 rounded-sm">
                <input aria-label="ingredients" type="text" placeholder='e.g salagna'
                className='border-none bg-transparent outline-none px-2'/> 
            </div>              
            <button type="submit"
            className='bg-black text-white text-sm px-3 py-1 rounded-sm hover:bg-black/80 transition-colors duration-200'
            >+ Add ingredient</button>
        </form>
    </div>
    )
}

export default Form
