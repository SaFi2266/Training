let res = "";
let d = 2;

for (let i = 1; i <= 8; i++) {
    if (d % 2 == 0) {
        for (let j = 1; j <= 8; j++) {
            res += j % 2 == 0 ? "#" : " ";
        }
        console.log(res + "\n");
        res = "";
    } else {
        for (let j = 1; j <= 8; j++) {
            res += j % 2 == 0 ? " " : "#";
        }
        console.log(res);
    }
    res = "";
    d = d + 1;
}