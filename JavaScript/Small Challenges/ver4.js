
/*jshint esversion: 7 */

// Closure
function area(shape) {
    let u = ' square unit';
    return function(r) {
        if (shape === 'circle') {
            let a = Math.round((Math.PI * r ** 2) * 100) / 100;
            return a + u;
        } else if (shape === 'square') {
            return (r ** 2) + u;
        } else {
            console.log('Unknown shape type !!!');
        }
    };
}

let squareArea = area('square')(5);
console.log(squareArea);
