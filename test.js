function half_way(coor1, coor2) {
  let xh = Math.floor((coor1[0] + coor2[0]) / 2);
  let m = Math.abs((coor1[1] - coor2[1]) / (coor1[0] - coor2[0]));
  let yh = Math.floor(xh * m);
  return [xh, yh];
}

let p1 = [-650, -480];
let p2 = [-1200, -340];

console.log(half_way(p1, p2));
