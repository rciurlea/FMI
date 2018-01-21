var App = App || {};

App.Solver = {
  convexHull(points) {
    let steps = [];
    points.sort((a, b) => a.x - b.x);
    let Lupper = [points[0], points[1]];
    steps.push(Lupper.slice());
    for (let i = 2; i < points.length; i++) {
      Lupper.push(points[i]);
      steps.push(Lupper.slice());
      while (Lupper.length > 2 && !this.isRightTurn(Lupper[Lupper.length - 3], Lupper[Lupper.length - 2], Lupper[Lupper.length - 1])) {
        Lupper.splice(Lupper.length - 2, 1);
        steps.push(Lupper.slice());
      }
    }
    let Llower = [points[points.length - 1], points[points.length - 2]];
    steps.push(_.concat(Lupper, Llower.slice(1)));
    for (let i = points.length - 3; i >= 0; i--) {
      Llower.push(points[i]);
      steps.push(_.concat(Lupper, Llower.slice(1)));
      while (Llower.length > 2 && !this.isRightTurn(Llower[Llower.length - 3], Llower[Llower.length - 2], Llower[Llower.length - 1])) {
        Llower.splice(Llower.length - 2, 1);
        steps.push(_.concat(Lupper, Llower.slice(1)));
      }
    }
    return steps;
  },

  isLeftTurn(p, q, r) {
    return (q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x) < 0
  },

  isRightTurn(p, q, r) {
    return (q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x) > 0
  },

};
