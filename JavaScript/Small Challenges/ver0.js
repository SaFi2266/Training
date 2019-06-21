// Your code here.
let line1 = "# # # # \n";
let line2 = " # # # #\n"
for (let x = 1; x <= 8; x++) {
    if (x % 2 == 0) {
        console.log(line1);
        continue
    }
    console.log(line2);
}