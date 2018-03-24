# Questions and Answers for Exam 2

## Question: Why will the below code not work as intended (unrelated to the url or error handling)?  Include a description on how to fix it (code to help your answer is okay but not required.  A non-code description of how to fix it is required).  Be sure to say _why_ it will not work as the author expected.

```
const data = fetch('example.com/test')
.then( response => response.json() )
.then( json => { 
  return data;
});

console.log(data.cats);
```
### Answer:
 
Why : variable name 'data' in the anonymous function inside is already assigned to the const of promise outside, it's a promise to return itself as a dead loop.
How to fix: in order to log the fetch result, in the anonymous of 2nd then(), console.log(json.cat) instead of return data.

## Question: What is the scope of a variable in JS?  How does it relate to closures? 

### Answer: 
 
Scope: variable declared inside a function is only accessable in the function; variable declared outside a function is accessable anywhere/globally.
Relation to closures: a function in JS is a closure, so it creates a scope that is one-way accessible (only inside sees outside, not the other way around).

## Question: What is a polyfill, and how would a polyfill for a new Array function relate to the concept of prototypes? 

### Answer:

A polyfill is some codes used to implement some functions/features that is not supported natively by some browser.
Since all arrays are derived from the array of prototype (JS inheritance chain of prototypes), after a pollyfill adding functions to the array prototype, all arrays would inherite the added feature.

## Question: What is CORS and why is it only in browsers?  How does it relate to Same Origin Policy (SOP) ?

### Answer: 

CORS: cross-origin resource sharing, a mechanism that allows a browser to access certain resources of a server on a different origin (which would be otherwise forbidden due to SOP ). By adding headers that tells the server where the request came from, the server would have its logic to decide if the access is allowed.
Why is it only in browsers: a browser is a environment that have access to critical information of the user, while open to run scripts as a "public" place.
Same Origin Policy: since JS can run anywhere, and browser environment have access to some critical information for the user, SOP is applied to protect user safety and privacy by declining access from different origin. And CORS is used to enable some safe resource sharing under SOP.

## Question: What is the difference between a bundler and a transpiler?

### Answer:

A bundler is a tool that "assembles" different pieces of code into a single file;
A transpiler is another tool that "translates" code written in one language into another.

