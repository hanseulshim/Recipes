import React from 'react'
import Header from './Header'
import WindowContainer from '../containers/WindowContainer'

export default class Main extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <WindowContainer />
      </div>
    )
  }
}
