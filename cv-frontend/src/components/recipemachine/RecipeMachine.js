import React from 'react';
import WeeksMenu from './weeksMenu';
import SearchBar from './search_bar';
import { RECIPE } from '../../Queries/recipeQueries';
import { useQuery } from '@apollo/client';

class RecipeMachine extends React.Component{
  constructor() {
    super()
    this.SearchBarSubmit = this.SearchBarSubmit.bind(this)
  }


  SearchBarSubmit(event){
    console.log(event)
  }
  


  render(){
  return (
    <div>
      <h3>RecipeMachine</h3>
      <button>Random Menu</button>
      {/* <SearchBar handleSubmit={this.SearchBarSubmit}/> */}
      <div>
        <ComposeMenu/>
      </div>
    </div>
  )}
}
export default RecipeMachine;

// $allRecipesCategory: String, $allRecipesName: String, $allRecipesIngredient: String


const ComposeMenu = ({category='pää', name='', ingredient='', numDays=7, breakfests=false, lunches=false, dinners=true}) => {
  const {data, loading, error} = useQuery(RECIPE, {
    variables: {
      "allRecipesCategory": category,
      "allRecipesName": name,
      "allRecipesIngredient": ingredient,
    }
  });

  if (loading) return <p>loading</p>
  if (error) {
    console.log(error)
    return <p>error</p>
  }

  const getDays = () =>{
    const Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let curDay = new Date().getDay()
    const DayList = []
    for (let index = 0; index < numDays; index++) {
            DayList.push(Days[curDay]);
            curDay++;
            if (curDay > 6){
              curDay = 0;
            }

    }
    console.log(curDay)
    console.log(DayList)
    return DayList
  }

  const getBreakfasts = () =>{
    if (breakfests){
      const food = []
      for (let index = 0; index < numDays; index++) {
        food.push(data.allRecipes[Math.floor(Math.random() * data.allRecipes.length)])
      }
      return food
    }
    return []
  }

  const getLunches = () =>{
    if (lunches){
      const food = []
      for (let index = 0; index < numDays; index++) {
        food.push(data.allRecipes[Math.floor(Math.random() * data.allRecipes.length)])
      }
      return food
    }
    return []
  }

  const getDinners = () =>{
    if (dinners){
      const food = []
      for (let index = 0; index < numDays; index++) {
        food.push(data.allRecipes[Math.floor(Math.random() * data.allRecipes.length)])
      }
      return food
    }
    return []
  }


  console.log(data)
  return(
    <WeeksMenu
      selectedDays={getDays()}
      breakfests={getBreakfasts()}
      lunches={getLunches()}
      dinners={getDinners()}
    />
  )


}