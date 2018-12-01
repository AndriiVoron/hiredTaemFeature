export default class BaseModel {
  constructor(data) {
    const errors = this.checkContract(data);

    if (errors.length) {
      throw new Error(errors.join('\n'));
    }
  }

  checkContract(data) {
    const contract = this.contractData();

    const result = [];

    contract.forEach((key) => {
      if (data[key] === undefined) {
        result.push(`${this.constructor.name}: ${key} is required, check request`);
      }
    });

    return result;
  }
}
