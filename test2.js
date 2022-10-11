function dist_sq(coor1, coor2) {
    let a = coor1[0] - coor2[0];
    let b = coor1[1] - coor2[1];
    return a * a + b * b;
}

function energy_bridge_positions(coor1, coor2) {
    // Part 1: finding number of bots required to bridge positions
    let dist = Math.sqrt(dist_sq(coor1, coor2));
    let energize_max_dist = 200;
    let harvest_units_req = Math.ceil(dist / energize_max_dist) - 1;

    // Part 2: postiion bots 200units away from each other locaitons
    let bridge_positions = new Array();
    let m1 = 1;
    let m2 = harvest_units_req;
    for (let i = 0; i < harvest_units_req; ++i) {
        let x_pos = Math.floor((m1 * coor2[0] + m2 * coor1[0]) / (m1 + m2));
        let y_pos = Math.floor((m1 * coor2[1] + m2 * coor1[1]) / (m1 + m2));
        bridge_positions.push([x_pos, y_pos]);
        m1++;
        m2--;
    }
    return { harvest_units_req, bridge_positions };
}

coor1 = [-650, -480];
coor2 = [-1200, -340];
let { harvest_units_req, bridge_positions } = energy_bridge_positions(
    coor1,
    coor2
);

console.log("harvest_units_req");
console.log(harvest_units_req);
console.log("\nbridge positions");
console.log(bridge_positions);
