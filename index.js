/**
 * Asynchronous Iterator is used to iterate over a given array or range without blocking 
 * the event loop.
 * 
 * ******************
 * EXAMPLE 1 (Array):
 * ******************
 * 
 * const array = new AsyncIterator([1, 2, 3, 4]);
 * 
 * array.each((value, index, array) => {
 *      console.log(value, index, array);
 * }).then(() => {
 *      // After completion
 * }).catch(() => {
 *      // Something went wrong!!
 * });
 * 
 * ******************
 * EXAMPLE 2 (Range):
 * *****************
 * 
 * const range = new AsyncIterator(0, 10);
 * 
 * range.each(index => {
 *      console.log(index);
 * }).then(() => {
 *      // After completion
 * }).catch(() => {
 *      // Something went wrong!!
 * });
 */
class AsyncIterator {
    /**
     * AsyncLoop()
     * 
     * @param {array | number} x 
     * @param {number} y 
     */
    constructor(x, y = null) {
        this._range = null;
        this._array = null;

        if (typeof x == 'number') {
            // Set Range =>
            if (y != null && typeof y == 'number') {
                if (x <= y) {
                    this._range = {
                        from: x, 
                        to: y
                    }
                }
            } else {
                this._range = {
                    from: 0,
                    to: x
                }
            }
        } else if (Array.isArray(x)) {
            // Set Array => 
            this._array = x;
        }
    }

    /**
     * each() is used to iterate over a given array of range.
     * 
     * @param {function} cb 
     * @returns {Promise}
     */
    each(cb) {
        return new Promise((resolve, reject) => {
            this._recursion(cb, resolve, reject);
        });
    }

    /**
     * _recursion() is used to asychronous call the callback (cb) function.
     * 
     * @param {function} cb 
     * @param {function} resolve 
     * @param {function} reject 
     * @param {number} index  
     */
    async _recursion(cb, resolve, reject, index = 0) {
        if (this._array != null) {
            if (this._array.length == index) {
                resolve();
            } else {
                cb(this._array[index], index, this._array);

                setImmediate(() => {
                    this._recursion(cb, resolve, reject, ++index);
                });
            }
        } else if (this._range != null) {
            const { from, to } = this._range;
            if (index < from) {
                index = from;
            } 
            
            if (index == to) {
                resolve();
            } else {
                cb(index);

                setImmediate(() => {
                    this._recursion(cb, resolve, reject, ++index);
                });
            }
        } else {
            reject();
        }
    }
}

module.exports = AsyncIterator;