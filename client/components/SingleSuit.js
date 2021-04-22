import React, { Component } from 'react'
import {connect} from 'react-redux'
import { fetchSingleSuit } from "../store/suits"

class SingleSuit extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.loadSingleSuit(id);
  }

  render() {
    const { singleSuit } = this.props

    return (
      <div>
        <div>
          {
            !singleSuit ?
            (
            <h3>NO SUIT!</h3>
          )
          :
          (
            <div>
              {singleSuit.name}
            </div>
          )}
        </div>

        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>

      </div>
    )
  }

}

const mapStateToProps = (state) => ({
  singleSuit: state.suits.singleSuit
});

const mapDispatchToProps = (dispatch, { history }) => ({
  loadSingleSuit: (suitId) => dispatch(fetchSingleSuit(suitId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleSuit);
