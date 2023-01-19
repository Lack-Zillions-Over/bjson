import { Bjson } from '../controllers/index';

class Person {
  constructor(protected name: string) {}

  public getName() {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }
}

class Hero extends Person {
  constructor(protected name: string, protected power: string) {
    super(name);
  }

  public getPower() {
    return this.power;
  }
}

const setupSut = () => {
  const sut = new Bjson({
    Person,
    Hero,
  });
  return { sut };
};

describe('Bjson Suite Tests', () => {
  test('should get the maximum depth of the object', async () => {
    const { sut } = setupSut();
    expect(sut.getMaxDepth()).toStrictEqual(100);
  });

  test('should serialize/deserialize object', async () => {
    const { sut } = setupSut();
    const value = { a: 1, b: 2, c: 3 };
    const compressed = sut.stringify(value);
    const decompressed = sut.parse(compressed);
    expect(typeof compressed).toBe('object');
    expect(decompressed).toStrictEqual(value);
  });

  test('should serialize/deserialize array', async () => {
    const { sut } = setupSut();
    const value = [1, 2, 3];
    const compressed = sut.stringify(value);
    const decompressed = sut.parse(compressed);
    expect(typeof compressed).toBe('object');
    expect(decompressed).toStrictEqual(value);
  });

  test('should serialize/deserialize string', async () => {
    const { sut } = setupSut();
    const value = 'Hello World';
    const compressed = sut.stringify(value);
    const decompressed = sut.parse(compressed);
    expect(typeof compressed).toBe('object');
    expect(decompressed).toStrictEqual(value);
  });

  test('should serialize/deserialize number', async () => {
    const { sut } = setupSut();
    const value = 2023;
    const compressed = sut.stringify(value);
    const decompressed = sut.parse(compressed);
    expect(typeof compressed).toBe('object');
    expect(decompressed).toStrictEqual(value);
  });

  test('should serialize/deserialize boolean', async () => {
    const { sut } = setupSut();
    const value = true;
    const compressed = sut.stringify(value);
    const decompressed = sut.parse(compressed);
    expect(typeof compressed).toBe('object');
    expect(decompressed).toStrictEqual(value);
  });

  test('should serialize/deserialize class', async () => {
    const { sut } = setupSut();
    const value = new Hero('Batman', 'Money');
    const compressed = sut.stringify(value);
    const decompressed = sut.parse<Hero>(compressed);
    expect(typeof compressed).toBe('object');
    expect(decompressed).toStrictEqual(value);
    expect(decompressed.getName()).toBe('Batman');
  });

  test('should make a deep copy of the object', async () => {
    const { sut } = setupSut();
    const source = new Hero('Batman', 'Money');
    const clone = sut.makeDeepCopy(source);
    expect(clone.getPower()).toBe('Money');
  });

  test('should serialize/deserialize the deep copy of the object', async () => {
    const { sut } = setupSut();
    const source = new Hero('Batman', 'Money');
    const clone = sut.makeDeepCopy(source);
    const compressed = sut.stringify(clone);
    const decompressed = sut.parse<Hero>(compressed);
    expect(typeof compressed).toBe('object');
    expect(decompressed).toStrictEqual(clone);
    expect(decompressed.getPower()).toBe('Money');
  });
});
