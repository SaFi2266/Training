/*jshint esversion: 6 */

let menuPrice = [150, 200, 90, 250, 170, 210, 100];
let x = [];
menuPrice.forEach(element => {
    if (element <= 90) {
        return x.push(element * 0.2);
    } else if (90 < element < 150) {
        return x.push(element * 0.15);
    } else {
        return x.push(element * 0.1);
    }
});
for (let i = 0; i < x.length; i++) {
    var result = `The tip of $${menuPrice[i]} 
    will be $${x[i]}, so you will pay
    TOTAL = $${menuPrice[i]+x[i]}
    ---------------------------------------------`;
    console.log(result);
}