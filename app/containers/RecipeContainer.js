import React from 'react'
import Recipe from '../components/Recipe'

export default class RecipeContainer extends React.Component {
  constructor (props) {
    super(props)
    this.deleteRecipe = this.deleteRecipe.bind(this)
  }

  render () {
    return <Recipe recipeTitleArray={this.props.recipeTitleArray} ingredientsArray={this.props.ingredientsArray} deleteRecipe={this.deleteRecipe} />
  }
}
