---
title: Introduction to JavaScript
excerpt: A short story about the language of the web
publishedTime: '2023-07-15T23:14:27'
modifiedTime: '2023-12-18T14:24:16'
author: Meher Howji
tags: javascript
draft: 'false'
order: 0
publishTo: meherhowji.com
---

Brendon Eich created JavaScript in May 1995 in just a few weeks, some even say, in just 10 days. He was working with Netscape and was creating this for their browser Netscape Navigator. Codenamed Mocha and internally in Netscape it was called 'LiveScript' but due to Java's popularity and for making an impact at release, it was named JavaScript.

Java mildly influences JavaScript's syntax as much as you can find some similarities between C++ and Java. [Self](https://en.wikipedia.org/wiki/Self_(programming_language)) language influenced the prototype-based inheritance and [Scheme](https://en.wikipedia.org/wiki/Scheme_(programming_language)) language influenced the functional programming elements. Because of such interesting influences, you can do both object-oriented and functional-style programming with JS. Great versatility!

## ECMAScript
Netscape submitted the language for standardisation to ECMA (European Computer Manufacturer's Association) and the first edition was published in 1997. Because Oracle owns the trademark for the name JavaScript, the standardisation name was picked as ECMAScript. ECMA later changed their name to Ecma International where the acronym(ECMA) was now used as a noun(Ecma).

In essence, JavaScript refers to the programming language itself and its execution, while ECMAScript refers to the standardised specifications and different versions of the language.

## TC39 - Ecma Technical Committee 39
TC39 is a committee with members from companies that have deeply invested in web technologies, like Google, Mozilla and Apple as they have their browsers etc. Apart from them, there are more than dozens more from various organisations as well.

TC39's key job is to is to develop, maintain, and evolve the ECMAScript standard. They meet every other month and vote on proposals and review work. TC39 proposals go through [5 stages](https://tc39.es/process-document/), starting from Stage 0 to Stage 4. Stage 0 is majorly well-formed ideas/plans whereas Stage 4 means the feature will be available as part of the next release. All [proposals are open source](https://github.com/tc39/proposals) and can be viewed by anyone and everyone is welcome to submit their ideas.

## Compatibility
JS evolves rapidly yet it is always ensured to be completely backwards compatible i.e. old features are never removed and only new features are added. However, there can be issues when your program uses the latest feature but the user's browser is quite older. So this forwards-compatibility problem is solved by using transpilers like Babel. Assuming that you are using the 'const' keyword, Babel will generate a version of your program that uses 'var' to ensure that everything works as expected. Although a very simplified example, this holds for all such new features that aren't available widely yet, e.g. Optional Chaining.

In contrast, HTML and CSS are forwards-compatible, which means if you use a vintage HTML code and run it today, it might or might not work well. As HTML/CSS are formatting languages, the broken parts are just skipped by the browsers and continue to render the rest of the parts.
