import React from 'react'
import { Accordion, Button, Panel, ListGroup, ListGroupItem } from 'react-bootstrap'

export default class Recipe extends React.Component {
  render () {
    let panel = this.props.recipe.map((title, index) => {
      let list = title[1].map((list, index) => <ListGroupItem key={index}>{list}</ListGroupItem>)
      return (
        <Panel bsStyle="info" header={title[0]} eventKey={index} key={index}>
          <h4 className="text-center">Ingredients</h4>
          <hr />
          <ListGroup>
            {list}
          </ListGroup>
          <Button bsStyle="danger" onClick={() => this.props.deleteRecipe(index)}>Delete</Button> <Button onClick={() => this.props.editRecipe(index)} bsStyle="success">Edit</Button>
        </Panel>
      )
    })
    return (
      <Accordion>
         {panel}
      </Accordion>
    )
  }
}

Recipe.propTypes = {
  recipe: React.PropTypes.array.isRequired,
  deleteRecipe: React.PropTypes.func.isRequired,
  editRecipe: React.PropTypes.func.isRequired
}
