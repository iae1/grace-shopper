import React, { Component } from 'react'

class AllSuits extends Component {
  componentDidMount() {
    this.props.loadSuits();
  }

  render() {
    return (
      <div>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  suits: state.suits
});

const mapDispatchToProps = (dispatch, { history }) => ({
  loadSuits: () => dispatch(fetchSuits()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AllSuits);
