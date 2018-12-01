import { Component } from 'react';

class AppComponent extends Component {
  constructor() {
    super();
    this.state = {
      filterValue: '',
    };
  }

  changeSelect = (e) => {
    this.setState({
      filterValue: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <label>City: </label>
        <select value={this.state.filterValue} onChange={this.changeSelect}>
          <option value='' disabled hidden>Please choose city</option>
          {this.props.options.map((city) => {
            return (<option value={city.name} key={city.index}>{city.name}</option>);
          })}
        </select>
      </div>
    );
  }
}
export default AppComponent;
