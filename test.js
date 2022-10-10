/*function test() {
    let a = [];
    a.push([1, 2]);
    a.push([3, 4]);
    console.log(a);
    return [1, a];
}

function test2() {
    let b = [];
    b.push([1, 2]);
    b.push([3, 4]);
    console.log(b);
    let a = 1;
    return { a, b };
}

let z = test();
console.log(z);
let { a, b } = test2();
console.log("a:" + a);
console.log("b:" + b);
console.log(b);
console.log(typeof b);
console.log(Array.isArray(b));
*/

function dist_sq(coor1, coor2) {
    let a = coor1[0] - coor2[0];
    let b = coor1[1] - coor2[1];
    return a * a + b * b;
}

function slope(coor1, coor2) {
    let m = (coor1[1] - coor2[1]) / (coor1[0] - coor2[0]);
    return Math.abs(m);
}

function harvest_positioning(coor1, coor2) {
    let dist = Math.sqrt(dist_sq(coor1, coor2));
    let energize_max_dist = 200;
    let harvest_units_req = Math.ceil(dist / energize_max_dist) - 1;
    let harvest_points = new Array();
    let x = 0;
    let y = 0;
    let m = slope(coor1, coor2);
    if (coor1[0] > coor2[0]) {
        x = -1;
    }
    if (coor1[1] > coor2[1]) {
        y = -1;
    }
    for (
        let i = 0, init_x = coor1[0] + 200 * x;
        i < harvest_units_req;
        ++i, init_x = init_x + 200 * x
    ) {
        console.log(`x: ${init_x}`);
        console.log(`y: ${init_x * m}`);
        console.log("\n");
        harvest_points.push([init_x, m * init_x]);
    }

    return { harvest_units_req, harvest_points };
}

coor1 = [-650, -480];
coor2 = [-1200, -340];

console.log(slope(coor1, coor2));
harvest_positioning(coor1, coor2);
