# Asynchronous Iterator

Asynchronous Iterator is used to iterate over a given array or range without blocking the event loop. It is helpful if you want to iterate over a large data set or range.


## Documentation

### Installation

```shell
$ npm install asynchronous-iterator
```

### Usage

### Iterate over an Array

```javascript
const AsyncIterator = require('asynchronous-iterator');

const array = new AsyncIterator([1, 2, 3, 4]);

array.each((value, index, array) => {
    console.log(value, index, array);
}).then(() => {
    console.log('Finished!');
}).catch(() => {
    console.log('Something went wrong!!');
});
```

### Iterate over a Range

Example 1:
```javascript
const AsyncIterator = require('asynchronous-iterator');

const range = new AsyncIterator(6);

range.each(index => {
    console.log(index); // 0 - 5;
}).then(() => {
    console.log('Finished!');
}).catch(() => {
    console.log('Something went wrong!!');
});
```

Example 2:

```javascript
const AsyncIterator = require('asynchronous-iterator');

const range = new AsyncIterator(3, 6);

range.each(index => {
    console.log(index); // 3 - 5;
}).then(() => {
    console.log('Finished!');
}).catch(() => {
    console.log('Something went wrong!!');
});
```