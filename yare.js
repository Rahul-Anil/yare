// Your code goes here

// The following code should help you start things off. Learn more
// in the Documentation

// ---------- ---------- ---------- ---------- ----------
// ---------- ---------- ---------- ---------- ----------

// Simple function for comparing distances
//
var my_alive_spirits = my_spirits.filter((s) => s.hp > 0);

function dist_sq(coor1, coor2) {
    let a = coor1[0] - coor2[0];
    let b = coor1[1] - coor2[1];
    return a * a + b * b;
}

function half_way(coor1, coor2) {
    let xh = Math.floor((coor1[0] + coor2[0]) / 2);
    let yh = Math.floor((coor1[1] + coor2[1]) / 2);
    return [xh, yh];
}

function slope(coor1, coor2) {
    let m = (coor1[1] - coor2[1]) / (coor1[0] - coor2[0]);
    return m;
}

function harvest_positioning(coor1, coor2) {
    let dist = Math.sqrt(dist_sq(coor1, coor2));
    let energize_max_dist = 200;
    let harvest_units_req = Math.ceil(dist / energize_max_dist) - 1;
    let harvest_points = new Array();
    let x = 0;
    let m = slope(coor1, coor2);
    if (coor1[0] > coor2[0]) {
        x = -1;
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

// Marking whether my base is at the top starting position or bottom
var my_base = base_zxq;
var enemy_base = base_a2c;
var my_star = star_zxq;
var enemy_star = star_a2c;

if (base_a2c.control == this_player_id) {
    enemy_base = base_zxq;
}

if (
    dist_sq(star_a2c.position, my_base.position) <
    dist_sq(star_zxq.position, my_base.position)
) {
    my_star = star_a2c;
    enemy_star = star_zxq;
}

console.log(`my_base position: ${my_base.position}`);
console.log(`my_star position: ${my_star.position}`);

var spirit_state = {
    harvest: 0,
    charge: 1,
    fight: 2,
    per_harvest: 3,
};

function per_harvester() {
    console.log("per_harvestor function");
    /* find the number of units requierd for line harvesting and get the position I
     * need to go to, to perform link harvestin */
    let { harvest_units_req, harvest_points } = harvest_positioning(
        my_base.position,
        my_star.position
    );

    for (let i = 0; i < harvest_units_req; i++) {
        my_alive_spirits[i].mark = spirit_state.per_harvest;
        my_alive_spirits[i].move(harvest_points[i]);
    }
}

per_harvester();

var per_harvesters = my_alive_spirits.filter(
    (s) => s.mark == spirit_state.per_harvest
);

for (spirit of my_spirits) {
    if (spirit.mark != spirit_state.per_harvest) {
        spirit.mark = spirit_state.fight;
    }
    if (spirit.mark === spirit_state.fight) {
        spirit.move(my_base.position);
    }
}

// Loop through all my spirits and making a state machine — if the
// spirit is empty, go harvest energy. If full, give it to the base
/*
for (let spirit of my_spirits) {
  if (spirit.energy == spirit.energy_capacity) spirit.set_mark("charging");
  if (spirit.energy == 0) spirit.set_mark("harvesting");

  if (spirit.mark == "charging") {
    spirit.move(my_base.position);
    spirit.energize(my_base);
  }
  if (spirit.mark == "harvesting") {
    spirit.move(my_star.position);
    spirit.energize(spirit);
  }

  // Rather bad code to deal with attackers. Improve it!
  if (my_base.sight.enemies.length > 0) {
    //spirit objects are accessed by spirits['id']
    let enemy = spirits[my_base.sight.enemies[0]];
    spirit.move(enemy.position);
    spirit.energize(enemy);
  }

  // the last action (move, energize, ...) will overwrite any previous ones
  // in the same tick
} */
