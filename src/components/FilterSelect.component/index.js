import { Component } from 'react';

class FilterSelectComponent extends Component {
  changeSelect = (e) => {
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <div>
        <label>City: </label>
        <select value={this.props.value} onChange={this.changeSelect}>
          <option value='' disabled hidden>Please choose city</option>
          {this.props.options.map((city) => {
            return (<option value={city.name} key={city.index}>{city.name}</option>);
          })}
        </select>
      </div>
    );
  }
}
export default FilterSelectComponent;
