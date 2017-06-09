class Person {
  constructor (name, age) {
    this.name = name;
    this.age = age;
  }

  getName() { return this.name; }
  setName(value) { return this.name = value; }
  getAge() { return this.age; };
  addYear() { return this.age += 1; };
}