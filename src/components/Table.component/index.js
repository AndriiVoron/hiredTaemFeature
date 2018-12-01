import { Component } from 'react';
import ApiService from '../../services/Api.service';

class AppComponent extends Component {
  constructor() {
    super();
    this.state = {
      test: 'Hello World!!!',
    };

    ApiService.getUsers().then((test) => {
      console.log('test', test);
    });
  }

  render() {
    return (
        <div>{ this.state.test }</div>
    );
  }
}
export default AppComponent;
