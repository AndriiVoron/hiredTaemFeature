import { Component } from 'react';
import ApiService from '../../services/Api.service';
import FilterComponent from '../Filter.component';
import TableColumn from '../TableColumn.component';
import { APPEND, INTERVIEW, HIRED } from '../../Constants/direction';
import City from '../../models/City';

import styles from './style.css';

class AppComponent extends Component {
  constructor() {
    super();
    this.state = {
      filterOptions: {
        cities: [],
      },
      [APPEND]: [],
      [INTERVIEW]: [],
      [HIRED]: [],
    };
  }

  componentDidMount = () => {
    ApiService.getUsers().then((userList) => {
      const cityOptions = this.prepareListOfCities(userList);
      console.log(cityOptions);
      
      this.setState({
        [APPEND]: userList,
        filterOptions: {
          cities: cityOptions,
        },
      });
    });
  }

  moveUser = (to, from) => {
    return (id) => {
      const userIndex = this.findUser(id, from);
      const user = this.state[from][userIndex];

      if (userIndex >= 0) {
        const newFrom = [...this.state[from]];
        newFrom.splice(userIndex, 1);
        this.setState(prevState => ({
          [to]: [...prevState[to], user],
          [from]: newFrom,
        }));
      }
    };
  }

  findUser = (id, from) => {
    return this.state[from].findIndex(user => user.id === id);
  }

  prepareListOfCities(userList) {
    let cities = userList.map(user => user.city);

    cities = Array.from(new Set(cities));
    cities = cities.map((city, index) => new City(city, index));
    return cities;
  }

  changeFilter = (name, city) => {

  }

  render() {
    return (
      <div>
        <FilterComponent onChangeFilter={this.changeFilter} options={this.state.filterOptions}></FilterComponent>
        <div className={ styles.table }>
          <TableColumn title="Append" userList={this.state[APPEND]} toRight={this.moveUser(INTERVIEW, APPEND)}></TableColumn>
          <TableColumn title="Interviewing" userList={this.state[INTERVIEW]} toLeft={this.moveUser(APPEND, INTERVIEW)} toRight={this.moveUser(HIRED, INTERVIEW)}></TableColumn>
          <TableColumn title="Hired" userList={this.state[HIRED]} toLeft={this.moveUser(INTERVIEW, HIRED)}></TableColumn>
        </div>
      </div>
    );
  }
}
export default AppComponent;
