import axios from 'axios';
import Errors from '../models/ErrorModels';
  // BadConnectionError,
  // InvalidDataError,
import UserModel from '../models/User';

class ApiService {
  constructor() {
    this.axios = axios;
  }

  getUsers() {
    return this.axios.get('https://randomuser.me/api/?nat=gb&results=5')
      .then(res => res.data.results)
      .then((data) => {
        try {
          if (!Array.isArray(data)) {
            throw new Error();
          }

          return data.map(item => new UserModel(item));
        } catch (err) {
          throw new Errors.InvalidDataError('Data results should be array of users');
        }
      })
      .catch((err) => {
        if (err instanceof Errors.InvalidDataError) {
          throw Errors.InvalidDataError;
        } else {
          throw new Errors.BadConnectionError(err.message || 'Bad connection');
        }
      });
  }
}

export default new ApiService();
