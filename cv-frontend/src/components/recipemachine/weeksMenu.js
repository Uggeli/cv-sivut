import React from "react";
import RecipeDisplay from "./recipe_display";
import './recipemachine_styles.css'

const WeeksMenu = ({selectedDays, breakfests, lunches, dinners}) => {
  
  let curKey = 0

  const CreateDisplay = (item) =>{
    return (
      <RecipeDisplay 
        category={item.category}
        image_link={item.image_link}
        ingredients={item.ingredients}
        instructions={item.instructions}
        name={item.name}
        key={++curKey}
      />
    )
  }

  return (
    <div className='divTable greyGridTable'>
      <div className='divTableHeading'>
        <div className='divTableRow'>
          {selectedDays.map((day) => 
          <div key={++curKey} className='divTableHead'>{day}</div>)}
        </div>
      </div>
      <div className='divTableBody'>
      {breakfests.length !== 0 ? (
      <div className='divTableRow'>
          {breakfests.map((item) => 
          CreateDisplay(item))}
        </div>
      ):(
        <>
        </>
      )}{lunches.length !== 0 ?
        (<div className='divTableRow'>
          {lunches.map((item) => 
          CreateDisplay(item))}
        </div>
        ):(
          <>
          </>
        )}{dinners.length !== 0 ?
        (<div className='divTableRow'>
          {dinners.map((item) => 
          CreateDisplay(item))}
        </div>
        ):(
          <>
          </>
        )}
      </div>
    </div>
  )
};

export default WeeksMenu;
