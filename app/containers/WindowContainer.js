import React from 'react'
import Window from '../components/Window'
import WindowEdit from '../components/WindowEdit'
import Recipe from '../components/Recipe'
import { Button } from 'react-bootstrap'
import axios from 'axios'

export default class WindowContainer extends React.Component {
  constructor () {
    super()
    this.state = {
      showModal: false,
      recipeTitle: 'Untitled',
      recipeTitleArray: [],
      ingredients: [],
      ingredientsArray: [],
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
    this.update = this.update.bind(this)
  }

  componentDidMount() {
    axios.get('/getRecipes')
      .then( res => {
        console.log("Received", res)
        var data = res.data.map(data => [data.name, data.ingredients])
        this.setState({
          recipe: data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  addRecipe () {
    this.setState({
      showModal: false
      // recipeTitleArray: this.state.recipeTitleArray.concat(this.state.recipeTitle),
      // ingredientsArray: this.state.ingredientsArray.concat([this.state.ingredients]),
      // recipe: this.state.recipe.concat([[this.state.recipeTitle, this.state.ingredients]]),
      // editIngredient: ''
    })

    axios.post('/addRecipe', {
      name: this.state.recipeTitle,
      ingredients: this.state.ingredients
    })
    .then( res => {
      console.log(res);
    })
    .catch( err => {
      console.log(err);
    }).then(
      axios.get('/getRecipes')
      .then( res => {
        console.log("Received", res)
        var data = res.data.map(data => [data.name, data.ingredients])
        this.setState({
          recipe: data
        })
      })
      .catch(err => {
        console.log(err)
      })
    )



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
    tempRecipe.splice(index, 1)
    this.setState({
      recipe: tempRecipe
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
  update (index) {
    let tempRecipe = this.state.recipe
    tempRecipe[index] = [this.state.recipeTitle, [this.state.ingredients]]
    this.setState({
      recipe: tempRecipe,
      showEdit: false
    })
  }
  handleChangeRecipe (e) {
    this.setState({ recipeTitle: e.target.value })
  }

  handleChangeIngredient (e) {
    this.setState({ ingredients: e.target.value.split(',') })
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
        />
        {this.state.showEdit
          ? <WindowEdit
            showModal={this.state.showEdit}
            close={this.close}
            addRecipe={this.addRecipe}
            handleChangeRecipe={this.handleChangeRecipe}
            handleChangeIngredient={this.handleChangeIngredient}
            editTitle={this.state.recipeTitle}
            editIngredient={this.state.ingredients}
            update={this.update}
            index={this.state.index}
            />
            : null
        }
        <div className="jumbotron">
          <Recipe deleteRecipe={this.deleteRecipe} editRecipe={this.editRecipe} recipe={this.state.recipe} />
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
