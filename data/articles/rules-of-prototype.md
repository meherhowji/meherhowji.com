---
title: Rules of Prototype
excerpt: Understand the rules that drives the prototype system. It is key to mastering this complicated topic.
publishedTime: '2022-03-07T00:00:00'
modifiedTime: '2023-12-24T23:37:25'
author: Meher Howji
tags: javascript
publishTo: meherhowji.com
draft: 'true'
order: 7
---
If you read the [[introduction-to-javascript|introduction]], you then would recall that the language 'Self' influences the prototype system and therefore it makes sense to approach this concept from a mindset that is not based on a class-based language. Although ES6 introduced classes in JS, it is just a wrapper over the prototype system to emulate class-like behaviour.

Prototypes can be seen as super-set to class-based systems because you can implement classes with prototypes, not vice versa. The prototype is a very lightweight system with very few moving parts. A bit of confusion comes from the fact that the names of these moving parts or properties are very A
similar.

## Key Properties
1. `prototype`
2. `[[prototype]]` or `<<prototype>>` -
3. `__proto__` aka dunder proto

## Rules
1. The `prototype` property is only available on functions. It points to an object and is used as a container for methods and properties to be shared by objects by creating a prototype chain.
2. `[[prototype]]` is an internal and immutable property used by the JS engine. It is used for look-up when a property/method is unavailable in an object.
3. `__proto__` is mutable and user-accessible version of `[[prototype]]`. Using it to update properties/methods has huge performance implications and is generally not advised.
5. `[[prototype]]` and `__proto__` is available on everything except primitives.

## Primitives and \_\_proto\_\_
Primitives have no method/properties, but when properties are accessed like `(42).toString()`, JS auto-boxes them in a wrapper object except for `null` and `undefined`. This is the reason,
- `(42).__proto__` returns `Number { 0 }`
- `"hi".__proto__` returns `String { '' }`
- `true.__proto__` returns `Boolean { false }`
- `Symbol.__proto__` returns `Object { ... }`
- `null.__proto__` and `undefined.__proto__` throw a TypeError as they do not have corresponding object wrapper types like String, Number, and Boolean.
