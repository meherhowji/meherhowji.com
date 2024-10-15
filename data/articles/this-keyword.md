---
title: THIS Keyword in JavaScript
excerpt: The "this" keyword in JavaScript refers to the current object or context in which the code is being executed
publishedTime: '2022-01-20T10:00:00'
modifiedTime: '2023-12-19T06:43:35'
coverImage: /featuredImages/articles/this-keyword-part-1.jpg
coverCredit: 
author: Meher Howji
tags: javascript
draft: 'false'
order: 2
publishTo: meherhowji.com
---

In this tutorial, we will look at `this` keyword and break it down into five parts so that each part
is bite-sized and easy to comprehend. By the end of this series, you will have a super solid
intuitive mental model that will stay with you for the longest time.

## Background
The language Scheme quite inspires the JavaScript language. The Scheme is the language that has
inspired functional programming languages like Haskell and Closure.

But in later stages, the makers of JavaScript noticed a rise in the popularity of Java and decided
to make JavaScript look like Java for easier adoption. And that choice brought many features from
the object-oriented world into JS. And we know that a functional programming language doesn't have
`this` keyword, but object-oriented programming does.

Even though JS decided to mimic the look and feel of Java, from within, JS is very much like Scheme.
It does not implement a true class-oriented system, but JS achieves inheritance by leveraging the
prototype model. Although you might say that ES6 has classes, it is nothing but a syntactic sugar
over the prototype system.

> ES6 classes are just syntactic sugar over the Prototype Model.

With all that being said, `this` keyword is a straightforward concept to understand, and let me show you how.

## Why Do We Need THIS

One way you can see this keyword is as a way to do a 2-dimensional look up in the scope. When you
define a variable, the lookup in your scope chain happens from inner to outer functions until you
reach the global scope. Now, what if you want one of your variables to look up for data/or-its-value
in other parts of your scope? `this` keyword gives us a way to solve it. And there is much more to
`this` which we will see in the next part of the series.

Now, you could say that I could write a function and receive an argument as my data. And you
wouldn't be wrong, but that's just another way to solve it.

## Call Site

Call site refers to the location of the function invocation, and it is an important step in
determining what the value of `this` keyword is going to be. In some cases, the call site can get
hidden away by libraries and native APIs, e.g., setTimeout, but those cases are limited and
predictable.

An informal rule says that is on the left is what this keyword points to. It's a
good conclusion to some extent, but how we reach that conclusion is important too.

> 'this' is a run-time binding and not an author-time binding.

## Rules for Call Site

The value of this keyword depends on _how_ the function is invoked. We should now ask ourselves,
**how many ways** can a function be invoked in JavaScript? The answer to that question is, there are
five ways to invoke a function:

- [[default-binding-this-keyword|Default Binding]]
- [[implicit-binding-this-keyword|Implicit Binding]]
- [[explicit-binding-this-keyword|Explicit Binding]]
- new Operator Binding
- **Arrow Functions**

In the next part, we will see how [[default-binding-this-keyword|Default Binding]] works. By the way, I have covered these posts on my YouTube channel as well.

https://youtu.be/e08ERlmpdqQ

https://youtu.be/zoz_Ih9-y_0

https://youtu.be/ht9jxw8G0AE

https://youtu.be/g2XWyfHvjCk

https://youtu.be/zBdpnVIfQVc
