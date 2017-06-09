describe("Spy", function () {
  var person;

  beforeEach(function () {
    person = new Person("Jim", 25);
  });

  it("осуществлен вызов функции", function () {
    spyOn(person, 'getName');
    person.getName();
    expect(person.getName).toHaveBeenCalled();
  });

  it("проверка количества вызовов", function () {
    spyOn(person, 'addYear');
    person.addYear();
    person.addYear();
    expect(person.addYear.calls.count()).toEqual(2);
  });

  it("проверка аргументов", function () {
    spyOn(person, 'setName');
    person.setName("Ira");
    expect(person.setName).toHaveBeenCalledWith("Ira");
  });

  it("есть доступ к последнему вызову", function () {
    spyOn(person, 'setName');
    person.setName("Ira");
    expect(person.setName.calls.mostRecent().args[0]).toEqual("Ira");
  });

  it("есть доступ ко всем вызовам", function () {
    spyOn(person, 'setName');
    person.setName("Ira");
    expect(person.setName.calls.allArgs()[0][0]).toEqual("Ira");
  });

  it("вызывает оригинальную функцию", function () {
    spyOn(person, 'getName').and.callThrough();
    expect(person.getName()).toEqual("Jim");
    expect(person.getName).toHaveBeenCalled();
  });

  it("возвращает указанное значение", function () {
    spyOn(person, 'getName').and.returnValue("Dan");
    expect(person.getName()).toEqual("Dan");
    expect(person.getName).toHaveBeenCalled();
  });

  it("вызывает указанную функцию", function () {
    spyOn(person, 'getAge').and.callFake(() => 5 * 11);
    expect(person.getAge()).toEqual(55);
  });

  // createSpy
  it("создает фальшивую функцию", function () {
    let concat = jasmine.createSpy('concat');
    concat("one", "two");
    expect(concat.and.identity()).toEqual('concat'); // есть имя для идентификации
    expect(concat).toHaveBeenCalled();
    expect(concat).toHaveBeenCalledWith("one", "two");
    expect(concat.calls.count()).toEqual(1);
  });

  it("создает фальшивый объект", function() {
    const button = jasmine.createSpyObj('BUTTON', ['click', 'setTitle', 'getTitle']);
    button.click();
    button.setTitle("Help");
    expect(button.click).toBeDefined();
    expect(button.click).toHaveBeenCalled();
    expect(button.setTitle).toHaveBeenCalledWith("Help");
    expect(button.getTitle).not.toHaveBeenCalled();
  });

  it("проверяет тип", function() {
    spyOn(person, 'setName');
    person.setName("Ira");
    expect(person.setName).toHaveBeenCalledWith(jasmine.any(String));
  });
});

describe("Время", function() {
  let callback = null;
  beforeEach(function() {
    callback = jasmine.createSpy('TIMER');
    jasmine.clock().install();
  });
  it("вызывает timeout синхронно", function() {
    setTimeout(() => callback(), 100);
    expect(callback).not.toHaveBeenCalled();
    jasmine.clock().tick(101);
    expect(callback).toHaveBeenCalled();
  });
});