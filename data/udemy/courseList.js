const ejsScopesIndex = [
  {
    index: 1,
    title: 'JS Compilation & Execution Phase',
    subtitle: 'Learn about the basic fundamental of the compilation nature of JS',
    duration: '8:14',
  },
  {
    index: 2,
    title: 'Introduction to Scope',
    subtitle: 'Understanding the concept of scope from the compilation phase perspective',
    duration: '19:30',
  },
  {
    index: 3,
    title: 'Dynamic Global Variables',
    subtitle:
      'We look at how the JS used to create dynamic global variables and we will learn a way to avoid such pattern',
    duration: '21:12',
  },
  {
    index: 4,
    title: 'How is Scope Implemented',
    subtitle:
      'We get deep at how the scope is implemented by the engine and what data structures are used to carry out the scope look-up.',
    duration: '13:51',
  },
  {
    index: 5,
    title: 'Function Expressions & Scopes',
    subtitle:
      'We look at how scopes are treated differently by the javascript compiler and why we can invoke our function declarations before they are defined and assigned. ',
    duration: '11:33',
  },
  {
    index: 6,
    title: 'Function Scoping and IIFE',
    subtitle: 'Learn how function scoping works and why IIFE works the way it looks.',
    duration: '24:27',
  },
  {
    index: 7,
    title: 'Block Scoping and Let-Const',
    subtitle: 'We look at the new ES6 block scoping and how can we create smaller units of scopes.',
    duration: '15:52',
  },
  {
    index: 8,
    title: 'What is Hoisting and What it is No ',
    subtitle: 'Learn how hoisting is a metaphor to describe the compilation nature of JavaScript',
    duration: '15:50',
  },
]

const ejsObjectIndex = [
  {
    index: 1,
    title: 'What is THIS keyword',
    subtitle:
      "Learn about THIS keyword and why it is so much closer to dynamic scoping (something that JS doesn't have)",
    duration: '6:54',
  },
  {
    index: 2,
    title: 'Implicit Binding',
    subtitle:
      'We look at how Implicit Binding in JavaScript works, this is the most common way of pointing this to a context',
    duration: '5:38',
  },
  {
    index: 3,
    title: 'Explicit Binding',
    subtitle:
      'In this lesson, we look at how call/apply/bind can be used to set the context for THIS',
    duration: '5:25',
  },
  {
    index: 4,
    title: 'Default Binding',
    subtitle:
      "We all know about default binding, even if we don't know if it's default binding. This is one of the reasons why THIS can get confusing.",
    duration: '3:46',
  },
  {
    index: 5,
    title: 'NEW Keyword (binding)',
    subtitle:
      'Learn how using the new keyword impacts what context THIS will point to, the lesson keeps the advanced usage for a later lesson',
    duration: '4:20',
  },
  {
    index: 6,
    title: 'Order of Precendence for Bindings',
    subtitle:
      'Shuffling several bindings can create a confusing pattern in determining what context THIS points, this guide will sail you through it.',
    duration: '3:00',
  },
  {
    index: 7,
    title: 'Arrow Functions & THIS Binding - Part 1',
    subtitle:
      'THIS keyword takes a classical turn when handling the binding, and not so surprisingly, this is arrow function resolves the THIS binding lexically.',
    duration: '3:38',
  },
  {
    index: 8,
    title: 'Arrow Functions & THIS Binding - 2',
    subtitle:
      'We take a look at another example but this time without the setTimeout API and we observe how THIS will get resolved.',
    duration: '4:14',
  },
]

const courseList = [
  {
    key: 1,
    title: 'Exploring JavaScript Scopes',
    details: '8 Videos - 2 Hours',
    courseIndex: ejsScopesIndex,
    bgGradient: 'pastelPinkGradient',
    appearDelay: '0.2s',
    link: 'https://www.udemy.com/course/exploring-javascript-scopes/',
  },
  {
    key: 2,
    title: 'Exploring JavaScript Objects',
    details: '4 Videos - 31 Minute',
    courseIndex: ejsObjectIndex,
    bgGradient: 'pastelGreenBlueGradient',
    appearDelay: '0.4s',
    link: 'https://www.udemy.com/course/exploring-javascript-objects/',
  },
]

export { courseList }
