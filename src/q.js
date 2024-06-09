const q = [
  {
    id: "1",
    title: "What's the output?",
    code: `
    function callName() {
      var myName = "Eddie";
    }
    callName();
    console.log(myName);
    `,
    option: ["myName is not defined", "Eddie", "undefined"],
    answer: "A",
  },
  {
    id: "2",
    title: "What's the output?",
    code: `
    var myName = "Eddie";
    function fn(myName) {
      console.log(myName);
    }

    setTimeout(() => {
      fn(myName);
      myName = "Tiffany";
    }, 3000);
    myName = "Tom";
    `,
    option: ["Eddie", "Tiffany", "Tom"],
    answer: "C",
  },
  {
    id: "3",
    title: "What's the output?",
    code: `
    let num = 10 || 1 * 100;
    console.log(num);
    `,
    option: ["10", "100", "1"],
    answer: "A",
  },
  {
    id: "4",
    title: "What's the output?",
    code: `
    var a = 10;
    console.log(++a * a++);
    `,
    option: ["100", "121", "132"],
    answer: "B",
  },
  {
    id: "5",
    title: "What's the output?",
    code: `
    function fn(num) {
      var str = num || 100;
      console.log(str);
    }

    fn(0);
    `,
    option: ["0", "100", "NaN"],
    answer: "B",
  },
  {
    id: "6",
    title: "What's the output?",
    code: `
    var person = {
      name: "Tiffany",
    };
    function fn(p) {
      return p.name = "Eddie";
    }
    var person2 = fn(person);
    console.log(person2);
    `,
    option: ['{name:"Tiffany"}', '{name:"Eddie"}', "Tiffany", "Eddie"],
    answer: "D",
  },
  {
    id: "7",
    title: "What's the output?",
    code: `
    var myName = "Tiffany";
    var obj = {
      fn: function () {
        var myName = "Eddie";
        setTimeout(() => {
          console.log(this.myName);
        }, 1);
      },
      myName: "Tom",
    };
    obj.fn();
    `,
    option: ["Tiffany", "Eddie", "Tom"],
    answer: "C",
  },
  {
    id: "8",
    title: "What's the output?",
    code: `
    console.log(3 > 2 > 1);
    `,
    option: ["true", "false"],
    answer: "B",
  },
  {
    id: "9",
    title: "What's the output?",
    code: `
    console.log(0.1 + 0.2 == 0.3);
    `,
    option: ["true", "false"],
    answer: "B",
  },
  {
    id: "10",
    title: "Which is not falsy value?",
    option: ["[]", "NaN", "undefined", "null"],
    answer: "A",
  },
  {
    id: "11",
    title: "What's the output?",
    code: `
    function getName() {
      console.log(myName);
    }
    let myName = "Tiffany";
    setTimeout(() => {
      myName = "Eddie";
      getName();
    });
    getName();
    `,
    option: [
      "Tiffany Tiffany",
      "Tiffany Eddie",
      "Eddie Tiffany",
      "Eddie Eddie",
    ],
    answer: "B",
  },
  {
    id: "12",
    title: "What's the output?",
    code: `
    let a = 1;
    let b = a;
    b = 2;
    console.log(a);
    `,
    option: ["1", "2"],
    answer: "A",
  },
  {
    id: "13",
    title: "What's the output?",
    code: `
    let a = { name: "Tiffany" };
    let b = a;
    b.name = "Eddie";
    console.log(a.name);
    `,
    option: ["Tiffany", "Eddie"],
    answer: "B",
  },
  {
    id: "14",
    title: "What's the output?",
    code: `
    let newList = [1, 2, 3].push(4);

    console.log(newList.push(5));
    `,
    option: ["[1,2,3,4,5]", "[1,2,3,4]", "[1,2,3,5]", "Error"],
    answer: "D",
  },
  {
    id: "15",
    title: "What's the output?",
    code: `
    const one = false || {} || null;
    const two = null || false || '';
    const three = [] || 0 || true;

    console.log(one, two, three);
    `,
    option: ["false null []", 'null "" true', '{} "" []', "null null true"],
    answer: "C",
  },
  {
    id: "16",
    title: "What's the output?",
    code: `
    function getAge(...args) {
      console.log(typeof args);
    }
    getAge(25);
    `,
    option: ["number", "array", "object", "NaN"],
    answer: "C",
  },
  {
    id: "17",
    title: "What's the output?",
    code: `
    function getAge() {
      'use strict';
      age = 25;
      console.log(age);
    }

    getAge();
    `,
    option: ["21", "undefined", "ReferenceError", "TypeError"],
    answer: "C",
  },
  {
    id: "18",
    title: "What's the output?",
    code: `
    console.log(1);

    setTimeout(function () {
      console.log(2);
    }, 0);

    Promise.resolve()
      .then(function () {
        console.log(3);
      })
      .then(function () {
        console.log(4);
      });
    `,
    option: ["1 2 3 4 ", "1 3 4 2 ", "3 4 1 2", "2 1 3 4"],
    answer: "B",
  },
  {
    id: "19",
    title: "What's the output?",
    code: `
    console.log(1);

    setTimeout(() => console.log(2));

    Promise.resolve().then(() => console.log(3));

    Promise.resolve().then(() => setTimeout(() => console.log(4)));

    Promise.resolve().then(() => console.log(5));

    setTimeout(() => console.log(6));

    console.log(7);
    `,
    option: [
      "1 7 3 5 2 6 4",
      "1 7 2 6 3 5 4",
      "1 2 3 4 5 6 7",
      "1 2 7 3 4 5 6",
    ],
    answer: "A",
  },
  {
    id: "20",
    title: "What's the output?",
    code: `
    let obj1 = { a: 1 };
    let obj2 = { a: obj1.a };
    obj1.a = 2;
    console.log(obj2.a); 
    `,
    option: ["1", "2"],
    answer: "A",
  },
];

export { q };
