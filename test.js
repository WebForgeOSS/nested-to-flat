const nestedToFlat = require(".");

describe("nestedToFlat", () => {
  it("should flatten a nested object based on the specified trigger keys", () => {
    const tree = {
      nom: "carlita",
      age: 60,
      enfant: {
        nom: "rosa",
        age: 42,
        enfant: {
          nom: "mamadou",
          age: 16
        }
      }
    };

    const triggerKeys = ["enfant"];
    const expected = [
      {
        nom: "carlita",
        age: 60
      },
      {
        nom: "rosa",
        age: 42
      },
      {
        nom: "mamadou",
        age: 16
      }
    ];

    const result = nestedToFlat(triggerKeys, tree);

    expect(result).toEqual(expected);
  });

  it("should handle an empty object and trigger keys", () => {
    const tree = {};
    const triggerKeys = [];

    const result = nestedToFlat(triggerKeys, tree);

    expect(result).toEqual([]);
  });

  it("should handle an object without nested properties", () => {
    const tree = {
      nom: "carlita",
      age: 60
    };
    const triggerKeys = ["enfant"];

    const result = nestedToFlat(triggerKeys, tree);

    expect(result).toEqual([
      {
        nom: "carlita",
        age: 60
      }
    ]);
  });

  it("should handle an object with empty nested properties", () => {
    const tree = {
      nom: "carlita",
      age: 60,
      enfant: {}
    };
    const triggerKeys = ["enfant"];

    const result = nestedToFlat(triggerKeys, tree);

    expect(result).toEqual([
      {
        nom: "carlita",
        age: 60
      }
    ]);
  });

  it('should return an empty array for an empty object', () => {
    const result = nestedToFlat(['enfant'], {});
    expect(result).toEqual([]);
  });

  it('should flatten a nested object with a single child', () => {
    const tree = {
      nom: "carlita",
      age: 60,
      enfant: {
        nom: "rosa",
        age: 42
      }
    };
    const result = nestedToFlat(['enfant'], tree);
    expect(result).toEqual([
      { nom: "carlita", age: 60 },
      { nom: "rosa", age: 42 }
    ]);
  });

  it('should flatten a deeply nested object', () => {
    const tree = {
      nom: "carlita",
      age: 60,
      enfant: {
        nom: "rosa",
        age: 42,
        enfant: {
          nom: "mamadou",
          age: 16
        }
      }
    };
    const result = nestedToFlat(['enfant'], tree);
    expect(result).toEqual([
      { nom: "carlita", age: 60 },
      { nom: "rosa", age: 42 },
      { nom: "mamadou", age: 16 }
    ]);
  });

  it('should handle an empty nested object', () => {
    const tree = {
      nom: "carlita",
      age: 60,
      enfant: {}
    };
    const result = nestedToFlat(['enfant'], tree);
    expect(result).toEqual([
      { nom: "carlita", age: 60 }
    ]);
  });


  it('should handle multiple trigger keys', () => {
    const tree = {
      nom: "carlita",
      age: 60,
      enfant: {
        nom: "rosa",
        age: 42,
        enfant: {
          nom: "mamadou",
          age: 16
        }
      },
      animal: {
        nom: "lulu",
        age: 2
      }
    };
    const result = nestedToFlat(['enfant', 'animal'], tree);
    expect(result).toEqual([
      { nom: "carlita", age: 60 },
      { nom: 'rosa', age: 42 },
      { nom: 'mamadou', age: 16 },
      { nom: 'lulu', age: 2 }
    ]);
  });

  it('should handle trigger keys that do not exist in the object', () => {
    const tree = {
      name: 'John',
      age: 30
    };
    const result = nestedToFlat(['hobbies'], tree);
    expect(result).toEqual([{ name: 'John', age: 30 }]);
  });

  it('should handle trigger keys that are empty arrays', () => {
    const tree = {
      name: 'John',
      age: 30,
      hobbies: []
    };
    const result = nestedToFlat(['hobbies'], tree);
    console.log("zzzzzzz")
    console.log(result)
    expect(result).toEqual([{ name: 'John', age: 30 }]);
  });

  it('should place the input object in an array if no trigger keys specified', () => {
    const tree = {
      users: [
        {
          name: 'John',
          age: 30,
          address: {
            city: 'New York',
            country: 'USA'
          }
        },
        {
          name: 'Alice',
          age: 25,
          address: {
            city: 'London',
            country: 'UK'
          }
        }
      ]
    };
    const result = nestedToFlat([], tree);
    expect(result).toEqual([tree]);
  });

  it('should handle array of objects', () => {
    const tree = {
      users: [
        {
          name: 'John',
          age: 30,
          address: {
            city: 'New York',
            country: 'USA'
          }
        },
        {
          name: 'Alice',
          age: 25,
          address: {
            city: 'London',
            country: 'UK'
          }
        }
      ]
    };
    const result = nestedToFlat(['users'], tree);

    expect(result).toEqual([
      { name: 'John', age: 30 , address: { city: 'New York', country: 'USA'} },
      { name: 'Alice', age: 25, address: { city: 'London', country: 'UK' } }
    ]);
  });

  it('should handle array of objects with multiple trigger keys', () => {
    const tree = {
      users: [
        {
          name: 'John',
          age: 30,
          address: {
            city: 'New York',
            country: 'USA'
          }
        },
        {
          name: 'Alice',
          age: 25,
          address: {
            city: 'London',
            country: 'UK'
          }
        }
      ]
    };
    const result = nestedToFlat(['users', 'address'], tree);
    console.log({ result })
    expect(result).toEqual([
      { name: 'John', age: 30 },
      { city: 'New York', country: 'USA' },
      { name: 'Alice', age: 25 },
      { city: 'London', country: 'UK' }
    ]);
  });

  it('should handle array of objects with nested arrays', () => {
    const tree = {
      users: [
        {
          name: 'John',
          age: 30,
          hobbies: ['swimming', 'running']
        },
        {
          name: 'Alice',
          age: 25,
          hobbies: ['reading', 'painting']
        }
      ]
    };
    const result = nestedToFlat(['users', 'hobbies'], tree);
 
    expect(result).toEqual([
      { name: 'John', age: 30 },
      'swimming',
      'running',
      { name: 'Alice', age: 25 },
      'reading',
      'painting'
    ]);
  });

});
