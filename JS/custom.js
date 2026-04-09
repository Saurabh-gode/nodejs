
Array.prototype.customMethod = function ()
{
    console.log("This is a custom method.")
}

// [].customMethod() // instance method
// console.log(Array.customMethod()) // this fails because it is invoking custom method on constructor

// Interview One-Liner
// Static methods belong to the constructor, instance methods belong to the prototype — instances cannot access static methods unless explicitly linked.


// custom implementation of Array.concat();
Array.prototype.myConcat = function ()
{
    // get arguments
    const argumentsArr = arguments;
    let inputArray = this;

    for (let i = 0; i < argumentsArr.length; i++) {

        if (Array.isArray(argumentsArr[i])) {
            let theArray = argumentsArr[i];
            for (let index = 0; index < theArray.length; index++) {
                const element = theArray[index];
                inputArray[inputArray.length] = element;
            }
        } else {
            inputArray[inputArray.length] = argumentsArr[i];
        }

    }

    return inputArray;
}

// console.log([4, 5, 6].myConcat([7, 8, [9]], "x", 10))



// flatten array 
Array.prototype.flatMyArray = function (degree = 1)
{
    const inputArray = this;
    const newArr = [];

    function flattenArray(arr, degree)
    {
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];

            if (element instanceof Array && degree > 0) {
                flattenArray(element, degree - 1);
            } else {
                newArr[newArr.length] = element
            }
        }
    }

    flattenArray(inputArray, degree);
    return newArr;
}


// console.log([1, 2, [3, 4, [5, [6]]]].flatMyArray(Infinity));


// custom map
Array.prototype.myMap = function (cb)
{
    const inputArray = this;
    const newArr = [];

    for (let i = 0; i < inputArray.length; i++) {
        const element = inputArray[i];

        newArr[i] = cb(element, i, this)
    }
    return newArr;
}

// console.log([4, 5, 6].myMap((elem) => { return elem * elem }))


// custom reduce
Array.prototype.myReduce = function (cb, initAccumulator)
{

    for (let i = 0; i < this.length; i++) {
        const element = this[i];

        initAccumulator = cb(initAccumulator, element, i, this);
    }
    return initAccumulator;
}

// console.log([4, 5, 6].myReduce((acc, elem) => { return acc *= elem }, 1))
// console.log([
//     { key1: 4 },
//     { key1: 5 },
//     { key1: 6 },
// ].myReduce((acc, elem) => { acc["key1"] = (acc["key1"] || 1) * elem.key1; return acc; }, {}))


// custom filter
Array.prototype.myFilter = function (cb)
{
    let newtArr = [];
    for (let i = 0; i < this.length; i++) {
        const element = this[i];

        if (cb(element, i, this)) {
            newtArr[newtArr.length] = element;
        }
    }
    return newtArr;
}

// console.log([4, 5, 6].myFilter((elem) => { return elem > 4 }));

