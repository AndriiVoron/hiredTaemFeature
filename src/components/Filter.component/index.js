import { Component } from 'react';
import FilterSearchItem from '../FilterSearchItem.component';
import FilterSelectItem from '../FilterSelect.component';

import styles from './style.css';

class FilterComponent extends Component {
  onChangeFilters = (filterName) => {
    return (data) => {
      this.props.onChangeFilter({
        [filterName]: data,
      });
    };
  }

  render() {
    const { city, name } = this.props.values;
    const citiesOption = this.props.options.cities;
    return (
      <div className={ styles.filterBlock }>
        <FilterSearchItem onChange={this.onChangeFilters('name')} value={name}></FilterSearchItem>
        <FilterSelectItem onChange={this.onChangeFilters('city')} value={city} options={citiesOption}></FilterSelectItem>
      </div>
    );
  }
}
export default FilterComponent;
