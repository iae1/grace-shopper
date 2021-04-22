import React, { Component } from 'react'
import {connect} from 'react-redux'
import { fetchSuits } from "../store/suits"

class AllSuits extends Component {
  componentDidMount() {
    this.props.loadSuits();
  }

  render() {
    const { suits } = this.props

    return (
      <div>
        {!suits || !suits.length ? (
          <h3>NO SUITS!</h3>
        ) : (
          suits.map((s) => (
            <div key={s.id}>
              {s.name}
            </div>
          ))
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  suits: state.suits.allSuits
});

const mapDispatchToProps = (dispatch, { history }) => ({
  loadSuits: () => dispatch(fetchSuits()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllSuits);
