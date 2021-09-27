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

export const ProductPrice = gql`
    query Query(
        $getProductSearchTerm: String
        ) {
        GetProduct(
            search_term: $getProductSearchTerm
            ) {
                id
                category
                brand_name
                product_name
                price_wholenumber
                ean_code
                price_decimal
                price_unit
        }
    }
`

