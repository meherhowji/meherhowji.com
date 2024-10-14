---
title: Implicit Binding - THIS Keyword
excerpt: Implicit binding is the automatic binding of the "this" keyword to the object where a method is invoked, based on the calling context.
publishedTime: '2022-01-23T00:00:00'
modifiedTime: '2023-12-18T21:52:40'
coverImage: /featuredImages/articles/implicit-binding-this-keyword-part-3.jpg
coverCredit: Photo by Simon Berger on Unsplash
author: Meher Howji
tags: javascript
draft: 'false'
order: 4
publishTo: meherhowji.com
---

https://www.youtube.com/watch?v=zoz_Ih9-y_0

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

Furthermore, it doesn't matter if the function was defined inside or outside the object. Take a look
at the example below, the function's definition location is inconsequential. However, because the
function is once again invoked using the person object, this keyword comprehends the context and
refers to the person object.

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

As the function location doesn't matter, we can use this to our advantage and create a reusable
function that can run on different objects and return different results. For example, if an `employee`
object and `person` object both can access the `firstName` function.

## When Implicit Binding Fails

If you store the function reference in a variable and then invoke the function later. **The implicit
binding is lost.**

```js
var person = {
  firstName: 'meher',
  getName: function () {
    console.log(this.firstName)
  },
}

var fn = person.getName

// isn't this invocation similar to default binding,
// this returns 'undefined' as the window object has no firstName
fn()
```

## Callbacks

There is a rule that says, this keyword points to whatever is on the left side of the method. Unfortunately, it doesn't work with callbacks. Here's an example:

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
// because again the cb() invocation follows the default binding rule and
// hence this keyword points again to window
displayFirstName(person.getName)
```

And this can even happen when we use a native method like setTimeout. So when it comes to passing methods, we should always give a thought about how the actual invocation will happen and how will it impact the value of the `this` keyword.

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

So that's the second way the value of the `this` keyword can have a different value. Now, let's look at the
next part which is [[explicit-binding-this-keyword|Explicit Binding]].
