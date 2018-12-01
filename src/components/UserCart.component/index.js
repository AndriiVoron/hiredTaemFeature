import { Component } from 'react';

import styles from './style.css';

class AppComponent extends Component {
  render() {
    const { user, toLeft, toRight } = this.props;
    return (
        <div className={ styles.userCart }>
          <div className={ styles.userCartData }>
            <picture className={ styles.userCartAva }>
              <source media='(min-width: 768px)' srcSet={ user.avatar.large }></source>
              <source media='(min-width: 561px)' srcSet={ user.avatar.medium }></source>
              <img src={ user.avatar.thumbnail } alt='User ava'></img>
            </picture>
            <div className={ styles.userCardDataName }>
              { user.name }
            </div>
          </div>
          <div className={ styles.userCartControl }>
            {toLeft && <span onClick={() => toLeft(user.id)} className={[styles.goArrow, styles.goLeft].join(' ')}>
                go Left
              </span>
            }
            {toRight && <span onClick={() => toRight(user.id)} className={[styles.goArrow, styles.goRight].join(' ')}>
                go Right
              </span>
            }
          </div>
        </div>
    );
  }
}
export default AppComponent;
