import React from 'react'
import Window from '../components/Window'
import Recipe from '../components/Recipe'
import { Button } from 'react-bootstrap'
import axios from 'axios'

export default class WindowContainer extends React.Component {
  constructor () {
    super()
    this.state = {
      showModal: false,
      recipeTitle: 'Untitled',
      ingredients: [],
      recipe: [],
      showEdit: false
    }

    this.close = this.close.bind(this)
    this.open = this.open.bind(this)
    this.handleChangeRecipe = this.handleChangeRecipe.bind(this)
    this.handleChangeIngredient = this.handleChangeIngredient.bind(this)
    this.addRecipe = this.addRecipe.bind(this)
    this.deleteRecipe = this.deleteRecipe.bind(this)
    this.editRecipe = this.editRecipe.bind(this)
    this.updateRecipe = this.updateRecipe.bind(this)
  }

  componentDidMount () {
    axios.get('/getRecipes')
      .then(res => {
        let data = res.data.map(data => [data.name, data.ingredients])
        this.setState({
          recipe: data
        })
      })
      .catch(err => {
        console.log('Error in mounting', err)
      })
  }
  addRecipe () {
    this.setState({
      showModal: false
    })
    axios.post('/addRecipe', {
      name: this.state.recipeTitle,
      ingredients: this.state.ingredients.split(',')
    })
    .then(res => {
      let recipe = this.state.recipe
      recipe.push([res.data.name, res.data.ingredients])
      this.setState({
        recipe: recipe
      })
    })
    .catch(err => {
      console.log('Error in add', err)
    })
  }
  close () {
    this.setState({
      showModal: false,
      showEdit: false
    })
  }
  open () {
    this.setState({ showModal: true })
  }
  deleteRecipe (index) {
    let tempRecipe = this.state.recipe.slice()
    let deleteRecipe = tempRecipe.splice(index, 1)[0]
    axios.post('/deleteRecipe', {
      name: deleteRecipe[0]
    })
    .then(res => {
      this.setState({
        recipe: tempRecipe
      })
    })
    .catch(err => {
      console.log('Error in delete', err)
    })
  }
  editRecipe (index) {
    let tempRecipe = this.state.recipe.slice(index, index + 1)[0]
    this.setState({
      showEdit: true,
      recipeTitle: tempRecipe[0],
      ingredients: tempRecipe[1].join(','),
      index: index
    })
  }
  updateRecipe (index) {
    let recipe = this.state.recipe.slice()
    recipe[index] = [this.state.recipeTitle, this.state.ingredients.split(',')]
    axios.post('/updateRecipe', {
      searchName: this.state.recipe[index][0],
      newName: this.state.recipeTitle,
      ingredients: this.state.ingredients.split(',')
    })
    .then(res => {
      this.setState({
        recipe: recipe,
        showEdit: false
      })
    })
    .catch(err => {
      console.log('Error in add', err)
    })
  }
  handleChangeRecipe (e) {
    this.setState({ recipeTitle: e.target.value })
  }
  handleChangeIngredient (e) {
    this.setState({ ingredients: e.target.value })
  }
  render () {
    return (
      <div className="container">
        <Window
          showModal={this.state.showModal}
          close={this.close}
          addRecipe={this.addRecipe}
          handleChangeRecipe={this.handleChangeRecipe}
          handleChangeIngredient={this.handleChangeIngredient}
          buttonText="Add"
        />
        {this.state.showEdit
          ? <Window
            showModal={this.state.showEdit}
            close={this.close}
            addRecipe={this.addRecipe}
            handleChangeRecipe={this.handleChangeRecipe}
            handleChangeIngredient={this.handleChangeIngredient}
            buttonText="Edit"
            editTitle={this.state.recipeTitle}
            editIngredient={this.state.ingredients}
            updateRecipe={this.updateRecipe}
            index={this.state.index}
            />
            : null
        }
        <div className="jumbotron">
          <Recipe
            deleteRecipe={this.deleteRecipe}
            editRecipe={this.editRecipe}
            recipe={this.state.recipe}
          />
        </div>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
        >
          Add Recipe
        </Button>
      </div>
    )
  }
}
