import BaseModel from './BaseModel';

export default class User extends BaseModel {
  constructor(data) {
    super(data);
    const { title, first, last } = data.name;

    this.city = data.location.city;
    this.name = `${title} ${first} ${last}`;
    this.id = data.login.uuid;
  }

  contractData() {
    return [
      'login',
      'name',
      'location',
    ];
  }
}
