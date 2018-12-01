import { Component } from 'react';
import City from '../../models/City';
import FilterComponent from '../Filter.component';
import TableColumn from '../TableColumn.component';
import ApiService from '../../services/Api.service';
import TabsConnector from '../../services/TabsConnector.service';
import { APPEND, INTERVIEW, HIRED } from '../../Constants/direction';

import styles from './style.css';

class TableComponent extends Component {
  constructor() {
    super();
    this.state = {
      filterOptions: {
        cities: [],
      },
      filterValue: {
        city: '',
        name: '',
      },
      origin: {
        [APPEND]: [],
        [INTERVIEW]: [],
        [HIRED]: [],
      },
      current: {
        [APPEND]: [],
        [INTERVIEW]: [],
        [HIRED]: [],
      },
    };
  }

  componentDidMount = () => {
    TabsConnector.addListener(this.handleOtherTabChanges);
    ApiService.getUsers().then((userList) => {
      const cityOptions = this.prepareListOfCities(userList);

      this.setState({
        current: {
          [APPEND]: userList,
          [INTERVIEW]: [],
          [HIRED]: [],
        },
        origin: {
          [APPEND]: userList,
          [INTERVIEW]: [],
          [HIRED]: [],
        },
        filterOptions: {
          cities: cityOptions,
        },
      });
    });
  }

  prepareListOfCities(userList) {
    let cities = userList.map(user => user.city);

    cities = Array.from(new Set(cities));
    cities = cities.map((city, index) => new City(city, index));

    return cities;
  }

  moveUser = (to, from) => {
    return (id) => {
      const copyOrigin = { ...this.state.origin };
      const userIndex = this.findUser(copyOrigin, id, from);

      if (userIndex >= 0) {
        const user = copyOrigin[from][userIndex];
        copyOrigin[from].splice(userIndex, 1);
        copyOrigin[to].push(user);

        const current = this.changeFilter(this.state.filterValue.city, this.state.filterValue.name, copyOrigin);

        this.setState({
          origin: copyOrigin,
          current,
        });
      }
    };
  }

  findUser = (copyList, id, from) => {
    return copyList[from].findIndex(user => user.id === id);
  }

  filterWasChanged = ({ city = this.state.filterValue.city, name = this.state.filterValue.name }, otherDomain) => {
    const current = this.changeFilter(city, name);

    this.setState({
      current,
      filterValue: {
        city,
        name,
      },
    }, () => {
      if (!otherDomain) {
        TabsConnector.sendMessage(this.state.filterValue);
      }
    });
  }

  changeFilter = (city = this.state.filterValue.city, name = this.state.filterValue.name, origin = this.state.origin) => {
    const nameToLower = name.toLowerCase();
    const result = {
      [APPEND]: this.filterUserList(nameToLower, city, origin[APPEND]),
      [INTERVIEW]: this.filterUserList(nameToLower, city, origin[INTERVIEW]),
      [HIRED]: this.filterUserList(nameToLower, city, origin[HIRED]),
    };

    return result;
  }

  filterUserList(name, city, list) {
    let result = [...list];

    if (name && name.length) {
      result = list.filter((user) => {
        return user.name.toLowerCase().includes(name);
      });
    }

    if (city && city.length) {
      result = list.filter((user) => {
        return user.city === city;
      });
    }

    return result;
  }

  handleOtherTabChanges = ({ city, name }) => {
    this.filterWasChanged({
      city: this.state.filterOptions.cities.includes(city) ? city : this.state.filterValue.city,
      name,
    }, true);
  }

  render() {
    return (
      <div>
        <FilterComponent onChangeFilter={this.filterWasChanged} options={this.state.filterOptions} values={this.state.filterValue}></FilterComponent>
        <div className={ styles.table }>
          <TableColumn title='Append' userList={this.state.current[APPEND]} toRight={this.moveUser(INTERVIEW, APPEND)}></TableColumn>
          <TableColumn title='Interviewing' userList={this.state.current[INTERVIEW]} toLeft={this.moveUser(APPEND, INTERVIEW)} toRight={this.moveUser(HIRED, INTERVIEW)}></TableColumn>
          <TableColumn title='Hired' userList={this.state.current[HIRED]} toLeft={this.moveUser(INTERVIEW, HIRED)}></TableColumn>
        </div>
      </div>
    );
  }
}
export default TableComponent;
