# LZO: Bjson

> Data Serializer and Deserializer.

[![Sponsor][sponsor-badge]][sponsor]
[![Commitizen friendly][commitizen-badge]][commitizen]
[![TypeScript version][ts-badge]][typescript-4-9]
[![Node.js version][nodejs-badge]][nodejs]
[![MIT][license-badge]][license]
[![Build Status - GitHub Actions][gha-badge]][gha-ci]

## Installation

```bash
npm install lzo-bjson OR yarn add lzo-bjson
```

## Usage

### Just

```typescript
import { Bjson } from 'lzo-bjson';

const bjson = new Bjson({});

const obj = bjson.stringify({ a: 1, b: 2, c: 3 });
const arr = bjson.stringify([1, 2, 3]);
const int = bjson.stringify(2023);
const bol = bjson.stringify(true);
const str = bjson.stringify('John Doe');

console.log(bjson.parse(obj), typeof bjson.parse(obj)); // { a: 1, b: 2, c: 3 } object
console.log(bjson.parse(arr), typeof bjson.parse(arr)); // [1, 2, 3] object
console.log(bjson.parse(int), typeof bjson.parse(int)); // 2023 number
console.log(bjson.parse(bol), typeof bjson.parse(bol)); // true boolean
console.log(bjson.parse(str), typeof bjson.parse(str)); // John Doe string
```

```typescript
import { bjson } from 'lzo-bjson';

class Person {
  constructor(private name: string) {}

  public getName() {
    return this.name;
  }

  public setName(name: string) {
    this.name = name;
  }
}

const bjson = new Bjson({
  Person,
});

const person = new Person('John Doe');

const compressed = bjson.stringify(person); // Uint8Array
const decompressed = bjson.parse(compressed); // Person
console.log(decompressed.getName()); // John Doe

// ! Maintains class integrity

decompressed.setName('Jane Doe');
const compressed2 = bjson.stringify(decompressed); // Uint8Array
const decompressed2 = bjson.parse(compressed2); // Person
console.log(decompressed2.getName()); // Jane Doe
```

### Maintaining Inheritance

```typescript
import { bjson } from 'lzo-bjson';

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

const bjson = new Bjson({
  Person,
  Hero,
});

const person = new Hero('John Doe', 'Super Strength');

const compressed = bjson.stringify(person); // Uint8Array
const decompressed = bjson.parse<Hero>(compressed); // Person
console.log(decompressed.getName()); // John Doe
console.log(decompressed.getPower()); // Super Strength
```

## API

`Bjson.getMaxDepth(): number`

> Get the maximum depth of the object

`Bjson.makeDeepCopy<T>(object: T): T`

> Make a deep copy of the object

`Bjson.stringify<T>(value: T): Uint8Array`

> Stringify the object to Uint8Array

`Bjson.parse<T>(json: Uint8Array): T`

> Parse the Uint8Array to object maintaining the prototype chain

## Backers & Sponsors

Support this project by becoming a [sponsor][sponsor].

## License

Licensed under the MIT. See the [LICENSE](https://github.com/Lack-Zillions-Over/bjson/blob/main/LICENSE) file for details.

[commitizen-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen]: http://commitizen.github.io/cz-cli/
[ts-badge]: https://img.shields.io/badge/TypeScript-4.9-blue.svg
[nodejs-badge]: https://img.shields.io/badge/Node.js->=%2018.12.1-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v18.x/docs/api/
[gha-badge]: https://github.com/Lack-Zillions-Over/bjson/actions/workflows/nodejs.yml/badge.svg
[gha-ci]: https://github.com/Lack-Zillions-Over/bjson/actions/workflows/nodejs.yml
[typescript-4-9]: https://devblogs.microsoft.com/typescript/announcing-typescript-4-9/
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: https://github.com/Lack-Zillions-Over/bjson/blob/main/LICENSE
[sponsor-badge]: https://img.shields.io/badge/♥-Sponsor-fc0fb5.svg
[sponsor]: https://github.com/sponsors/Lack-Zillions-Over
