---
title: Explicit Binding - THIS Keyword
excerpt: Explicit binding refers to the automatic binding of this keyword to the object that it is called from.
publishedTime: '2022-01-23T00:00:00'
modifiedTime: 2022/1/23
coverImage: /featuredImages/articles/implicit-binding-this-keyword-part-3.jpg
coverCredit: Photo by Simon Berger on Unsplash
author: Meher Howji
tags: javascript
draft: 'false'
order: 5
publishTo: meherhowji.com
---

https://www.youtube.com/watch?v=ht9jxw8G0AE

Implicit binding applies when we use a function and invoke it as a method of an object. In that
case, the `this` keyword points to the object on which the method was invoked. In the following
examples, you will notice that the invocation of `getName` was done using the object `person` and
that's what made the `this` keyword point to the `person` object.

```js
var person = {
  firstName: 'meher',
  getName: function () {
    console.log(this.firstName)
  },
}

person.getName() // outputs meher
```

## Function Outside the Method

Also, it does not matter whether the function was defined within the object or not. Look at the
below example, the function's definition location doesn't matter at all. But because the function
again invoked using the `person` object, the `this` keyword understands the context and points to
the `person` object.

```js
function getName() {
  console.log(this.firstName)
}

var person = {
  firstName: 'meher',
  getName,
}

person.getName() // outputs meher
```

Now, you can notice that because function location doesn't matter, we can use this property to our
advantage and create a reusable function(s) that can be run on different objects and return
different results. Imagine, if we had an `employee` object somewhere in the codebase and a `person`
object. Both objects can reuse the `firstName` function.

## When Implicit Binding Fails

If you store the function reference in a variable and then invoke the function later. The implicit
binding is lost.

```js
var person = {
  firstName: 'meher',
  getName: function () {
    console.log(this.firstName)
  },
}

var fn = person.getName

fn() // looks up globally?
```

## Callbacks

In the case of the callbacks, the general rule these days is that whatever is on the left side,
which doesn't work. See why:

```js
function getName() {
  console.log(this.firstName)
}

var person = {
  firstName: 'meher',

  getName,
}

function displayFirstName(cb) {
  cb()
}

displayFirstName(person.getName)
```

Even when the implicit-lost context is passed, the global issue is still raised.

```js
function getName() {
  console.log(this.firstName)
}

var person = {
  firstName: 'meher',
  getName,
}

setTimeout(person.getName, 1000)

// An implementation similar to this could be found in a library or native API:
function setTimeout(fn, delay) {
  fn()
}
```
