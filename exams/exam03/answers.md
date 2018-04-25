# Questions and Answers for Exam 3

## Question:  Why do I say that JS does not actually have 'classes'?  What is the distinction between a language with (real) classes and a language without?

### Answer:
 
1. JS class is actually a 'syntactic sugar', wrapping fucntions that returns desired object with properties and methods.
2. Distinction : In 'a language with (real) classes', classes and their instances are different things: classes being the blueprints, instances being occurrences of them. In a language without 'real classes' like JS, the OO part is achieved by a different system: there is no blueprint, while one object is both a blueprint and an instance - or a prototype.

## Question:  Why is it a bad idea to directly modify the DOM when using React?

### Answer:
 
1. Seperation of concerns: when using a framework, the framework take care of DOM and encapsulate these manipulation so that programmers focus on logic. Bypassing them while using them violates that role assumption, makes code much harder to maintain.
2. React render and updates DOM with its virtual DOM and algorithm. Modifying DOM directly may cause page not updated properly.

## Question:  What is composition, and why is it often favored over inheritance?

### Answer:
 
1. Composition is one of the ways that a piece of code couples/depends with another. A simple way to describe composition: one piece of code 'have' another piece as part of it. For example a car has an engine, a torch has a bulb.
2. Why favored: a. flexibility, a system is easier to break down and extend/modify to consider consisting of parts with different functions, rather than to creat a hierarchy of layers of inheritance. b.stability, in composition components are loosely coupled themselves outside business logics, thus less prone to common errors.

## Question:  Why can code using 'import' not be run directly by NodeJS?  

### Answer:
 
1. 'import' is the syntax of ES6 standard, while NodeJS follows CommonJS standard and hs its own 'require'. The two keywords that both link files/packages/modules actually have quite different machanism inside, and they are not interchangable.


## Question:  Why can code using 'import' or 'require' not be run directly in most browsers?

### Answer:
 
1. Browser environment have no module support, that's why there are transpilers like Babel and bundlers like Browserify.

## Question:  What is a 'side-effect'?  Why do we want to minimize them?

### Answer:
 
1. A 'side-effect' is a functions effect other than taking and returning a value, such as altering data or state outside its scope.
2. Why: Although 'side-effect' is a way the code interacts with outside world, it also brings unexplicit problems and errors, and makes code less readable for involving context. 

