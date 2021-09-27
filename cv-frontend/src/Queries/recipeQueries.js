import {gql} from '@apollo/client'

export const RECIPE = gql`
    query Query(
        $allRecipesCategory: String
        $allRecipesName: String
        $allRecipesIngredient: String
        ) {
        allRecipes(
            category: $allRecipesCategory
            name: $allRecipesName
            ingredient: $allRecipesIngredient
        ) {
            id
            name
            preptime
            image_link
            category
            description
            ingredients
            instructions
        }
    }
`;

