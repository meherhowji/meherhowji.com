---
title: Default Binding - THIS Keyword
excerpt: The default binding of the "this" keyword in JavaScript refers to the global object when used in a standalone function.
publishedTime: '2022-01-22T00:00:00'
modifiedTime: '2023-12-18T20:55:29'
coverImage: /featuredImages/articles/default-binding-this-keyword-part-2.jpg
coverCredit: Photo by Marek Szturc on Unsplash
author: Meher Howji
tags: javascript
draft: 'false'
order: 3
publishTo: meherhowji.com
---

https://www.youtube.com/watch?v=e08ERlmpdqQ

Think of default binding as the rule that applies when none of the other binding rules apply. Let's take a look at the most common way to invoke a function.

```js
function name() {
  console.log(this)
}

name()
```

When you load such code in your browser window through the developer console or an HTML document,
the function name gets added to the global object. In the case of a browser (the other being the
Node environment), the global object is the window object.

The window object contains numerous functions, namespaces, objects, and constructors, all of which
are globally available throughout your codebase. Therefore, when we inquire about `this` within a
function like this, we receive the window object as the result. These are some methods and
properties in the window object, you can enter `window` in the developer console and see something like
this:

```js
console.log(window)

Window {
  alert: ƒ alert()
  atob: ƒ atob()
  blur: ƒ blur()
  btoa: ƒ btoa()
  caches: CacheStorage {}
  cancelAnimationFrame: ƒ cancelAnimationFrame()
  cancelIdleCallback: ƒ cancelIdleCallback()
  captureEvents: ƒ captureEvents()
  chrome: {loadTimes: ƒ, csi: ƒ}
  clearInterval: ƒ clearInterval()
  clearTimeout: ƒ clearTimeout()
  // ... so on
}
```

## But Why?

When an identifier like the function name is declared in the global scope, the identifier is added
to the global object.

And when we are invoking the `name` function, what JavaScript is doing behind the scenes
is:

```js
window.name()
```

And it should be clear why this keyword is pointing to the window object because our

<b>invocation-site</b>(window.name) clearly shows that the `name` function should be invoked from the
perspective of the window. And that's why `this` in a function in global scope points to the
`window` object.

## Strict Mode

In strict mode, it's quite simple, you will get `undefined`, which is an appropriate response and
avoids all the confusion.

```js
'use strict'

function name() {
  console.log(this) // > undefined
}

name()
```

Even if `use strict` is used in function scope, `this` keyword points to `undefined`

```js
function name() {
  'use strict'
  console.log(this) // > undefined
}

name()
```

So that's one other way the value of the `this` keyword can have a different value.

Now, let's look at the next part which is [[implicit-binding-this-keyword|Implicit Binding]].
