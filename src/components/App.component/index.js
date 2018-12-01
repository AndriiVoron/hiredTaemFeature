import { Component } from 'react';

class AppComponent extends Component {
  constructor() {
    super();
    this.state = {
      test: 'Hello World!!!',
    };
  }

  render() {
    return (
        <div>{ this.state.test }</div>
    );
  }
}
export default AppComponent;
