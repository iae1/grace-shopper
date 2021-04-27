import React, { Component } from 'react'
import {connect} from 'react-redux'
import { fetchSuits } from "../store/suits"
import { Link } from 'react-router-dom'

class AllSuits extends Component {
  componentDidMount() {
    this.props.loadSuits();
  }

  render() {
    const { suits } = this.props

    return (
      <div className="all-suits">
        {!suits || !suits.length ? (
          <h3>NO SUITS!</h3>
        ) : (
          suits.map((s) => (
            <div className="eachSuit" key={s.id}>
              <img src={s.imageUrl} width="200px" height="300px" />
              <h3><Link to={`/suits/${s.id}`}>{s.name} - {s.color}</Link></h3>
              <h4>${s.price}</h4>
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
