import { Component } from 'react';

class AppComponent extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '',
    };
  }

  changeInput = (e) => {
    this.setState({
      searchTerm: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <label>Name: </label>
        <input placeholder="search..." value={this.state.searchTerm} onChange={this.changeInput}></input>
      </div>
    );
  }
}
export default AppComponent;
