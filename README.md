# NODE SCHOOL by Red Hat Mobile

This repository should serve as resource for series of courses organized by team at Red Hat Mobile.

*THIS IS A WORK IN PROGRESS*

## Resources:

In general, these would have been our main reference materials, through out the course.

* General JavaScript reference
  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
* You don't know js
  * more in-depth explanations of the core mechanisms of javascript
  * https://github.com/getify/You-Dont-Know-JS
* Nodejs API reference
  * https://nodejs.org/dist/latest-v6.x/docs/api/
* Javascript feature support
  * http://node.green/

## End Goal

After taking this course, you should be able to create a small but usefull http service in NodeJS.

## Syllabus

1. Walkthrough JavaScript essentials, learn about NPM package manager and get familiar with Node.js ecosystem
2. Understand asynchronous approach, events, emitters, listeners, callbacks, deferred execution and handling errors, core of Node.js programming model
3. Building your own HTTP server, operations over files, streams, sockets and processes, overview of Express.js framework
4. Tools and test frameworks, automation, debugging, unit and functional testing, quick look at debugger capabilities
5. Working with databases and persistent storage, MongoDB, Mongoose and Redis
6. Scaling an application, handling concurrency, clustered module and workers

Currently, we are aiming to have a 4 hour workshop that would cover this.

## Excercises from nodeschool.io

These workshops from nodeschool seem to be complementary to the course.
They have been chosen based on their description only, further review might be required.
We might use some of them whole-sale, or create our own workshop.
Some of them might be left jus as an 'excercise for the reader'.

Beware, thet nodeschool workshops are mostly just a set of excercises,
paired with a test-runer.

### Core Javascript
* https://github.com/jesstelford/scope-chains-closures
* https://github.com/sporto/planetproto
* https://github.com/timoxley/functional-javascript-workshop
* https://github.com/kishorsharma/currying-workshopper

### Asynchronous programming
* https://github.com/workshopper/learnyounode
* https://github.com/workshopper/stream-adventure
* https://github.com/bulkan/async-you
* https://github.com/stevekane/promise-it-wont-hurt
* https://github.com/isRuslan/learn-generators

### Maintainance
* https://github.com/excellalabs/js-best-practices-workshopper
* https://github.com/joyent/node-debug-school
* https://github.com/othiym23/bug-clinic
* https://github.com/finnp/test-anything
* https://github.com/bevacqua/perfschool

### Libraries
* https://github.com/evanlucas/learnyoumongo
* https://github.com/azat-co/expressworks
* 

### Advanced
* https://github.com/workshopper/goingnative

## Slides/scratchpad

We have provided a dockerfile that contains ijs configured for node 6 against jupyter notebook.
This is for quickly presenting the trickier parts of Java Script, with environment that is nicer,
than the usuall nodejs repl.

```
cd notebooks
docker build -t ijs-0 .
docker run -v `pwd`:/home/jovyan/work -it --rm -p 8888:8888 ijs-0
```
