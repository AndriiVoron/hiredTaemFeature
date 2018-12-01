import { Component } from 'react';

class FilterSearchItemComponent extends Component {
  changeInput = (e) => {
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <div>
        <label>Name: </label>
        <input placeholder="search..." value={this.props.value} onChange={this.changeInput}></input>
      </div>
    );
  }
}
export default FilterSearchItemComponent;
