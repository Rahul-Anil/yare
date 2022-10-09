// Your code goes here

// The following code should help you start things off. Learn more
// in the Documentation

// ---------- ---------- ---------- ---------- ----------
// ---------- ---------- ---------- ---------- ----------

// Simple function for comparing distances
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

console.log("here");
for (let i = 0; i < 3; i++) {
  my_spirits[i].mark = "per_harvesters";
}

var per_harvesters = my_spirits.filter((s) => s.mark == "per_harvester");
console.log(`per_harvester length: ${per_harvesters.length}`);

for (spirit of my_spirits) {
  if (spirit.mark != "per_harvester") {
    spirit.mark = "fighters";
  }
  if (spirit.mark == "per_harvester") {
    console.log("Harvester");
    spirit.move(my_star.position);
  } else if (spirit.mark === "fighters") {
    console.log("fighters");
    spirit.move(my_base.position);
  }
  //spirit.move(half_way(my_base.position, my_star.position));
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
