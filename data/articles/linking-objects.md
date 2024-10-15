---
title: Linking Object or Inheriting From Objects
excerpt: Linking objects is key to understanding the prototype system as it leads up to complex patterns involving constructors and subclasses
publishedTime: '2023-05-31T15:15:10'
modifiedTime: '2023-07-21T22:35:12'
coverImage: ''
coverCredit: ''
author: Meher Howji
tags: javascript
draft: 'false'
publishTo: meherhowji.com
order: 10
---

In JS, you can link objects and share properties pretty easily. Let's create an object `talk` that has a function `greet`. And create 2 objects from where we want to point to the `talk` object so that we can invoke the `greet` function as if it exists on the `friend` or `buddy` object.

```js
var talk = {
  greet: function () {
    return 'Hello! I am ' + this.name
  },
}

var friend = {
  name: 'meher',
}

var buddy = {
  name: 'you',
}
```

Now, if you log the friend object, you would see the internal slot called `[[Prototype]]`(in the case of Chrome) and `<prototype>`(in the case of Firefox). By default, this internal slot `<prototype>` points to the Object constructor, which is one of the [fundamental objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects#fundamental_objects). In simple terms, fundamental objects are just built-in objects, they are Object, Function, Boolean, and Symbol functions.

For us to make our object invoke the `greet` function as it was its own, we need to make this internal prototype(`[[prototype]] or <prototype>`) point to the `talk` object. Because this internal prototype is used for lookup when a property/method doesn’t exist on an object.

```js
Object {
  name: "meher"
  // we want to point this to the `talk` object, as this is used for the lookup
  [[prototype]]: Object {...}
}
```

The following 2 ways we can make the internal prototype point to the `talk` object but we DON’T use them because it has performance [implications](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto). In a gist, changing the `[[prototype]]` is generally slow due to how the JS engine optimizes property accesses.

```js
// Try both nonetheless to just see the effect, AVOID using them though
friend.__proto__ = talk
// or
Object.setPrototypeOf(friend, talk)
```

The correct way to do it would be using the `Object.create` method. `Object.create` creates a temporary object that points to the `talk` object, and we make our object point to this temporary object. Look at this simplified polyfill for Object.create or the one at [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

Notice how the `new` keyword does the heavy lifting, take a look at this [video](https://youtu.be/g2XWyfHvjCk) to quickly revise and follow what exactly the `new` keyword does.

```js
function ObjectCreate(pointTo) {
  function F()
  F.prototype = pointTo
  var obj = new F()
  return obj
}
```

Now, coming back to our code, if you couldn't follow the polyfill for Object.create then simply assume it to be a nice little black box that _links_ objects without having a performance implication. And there are 2 ways to use it:

```js title="without property descriptor"
var friend = Object.create(talk)
friend.name = 'meher'
```

Object.create has 2 parameters, the second one is a [property-descriptor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty), which is a fancy word for describing the nature of the properties of your object.

```js title="with property descriptor"
var friend = Object.create(talk, {
  name: {
    value: 'meher',
    writable: true, // we want the object to be ...
  },
})
```
