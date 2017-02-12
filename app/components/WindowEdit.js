import React from 'react'
import { Button, Modal, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

export default class WindowEdit extends React.Component {
  render () {
    return (
      <Modal show={this.props.showModal} onHide={this.props.close}>
        <Modal.Header closeButton>
          <Modal.Title>Edit a Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup controlId="formControlsText">
              <ControlLabel>Recipe</ControlLabel>
              <FormControl type="text" placeholder="Recipe Name" onChange={this.props.handleChangeRecipe} value={this.props.editTitle} />
            </FormGroup>
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Ingredients</ControlLabel>
              <FormControl type="text" componentClass="textarea" onChange={this.props.handleChangeIngredient} placeholder="Enter Ingredients,Separated,By Commas" value={this.props.editIngredient} />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="success" onClick={() => this.props.update(this.props.index)}>Update</Button>
          <Button bsStyle="danger" onClick={this.props.close}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
