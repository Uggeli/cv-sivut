import React from "react";
import { useState } from "react";


const RecipeDisplay = ({category, image_link, ingredients, instructions, name}) =>{
    const [menuOpen, setmenuOpen] = useState(false)


    const handleClick = () =>{
        setmenuOpen(!menuOpen)
    }

    const showIngredients = () =>{
        const ingredient_list = ingredients.split('|')
        console.log(ingredient_list)
        return ingredient_list.map((item) => <li>{item}</li>)
    }

    const showInstructions = () =>{
        const ingredient_list = instructions.split()
        return ingredient_list.map((item) => <p>{item}</p>)
    }

    

    return (
        <div className='divTableCell'>
            <button onClick={handleClick} className='recipe-button'>
                {name}
            </button>
            {!menuOpen &&(
                <div>
                    Ainekset:
                    {showIngredients()}
                    <div>
                        
                    </div>
                    Valmistus:
                    {showInstructions()}
                </div>
            )}
        </div>
    )
}

export default RecipeDisplay


