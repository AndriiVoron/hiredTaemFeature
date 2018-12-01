import { Component } from 'react';
import UserCart from '../UserCart.component';

import styles from './style.css';

class TableColumnComponent extends Component {
  render() {
    return (
      <div className={ styles.tableColumn }>
        <h2>{this.props.title}</h2>
        {this.props.userList.map(user => (
          <UserCart user={user} key={user.id} toRight={this.props.toRight} toLeft={this.props.toLeft}></UserCart>
        ))}
      </div>
    );
  }
}
export default TableColumnComponent;
