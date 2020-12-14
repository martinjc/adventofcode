const fs = require('fs');

function Link(source, destination, distance) {
    this.source = source;
    this.destination = destination;
    this.distance = distance;
}

function perm(xs) {
    let ret = [];
  
    for (let i = 0; i < xs.length; i = i + 1) {
      let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));
  
      if(!rest.length) {
        ret.push([xs[i]])
      } else {
        for(let j = 0; j < rest.length; j = j + 1) {
          ret.push([xs[i]].concat(rest[j]))
        }
      }
    }
    return ret;
  }


fs.readFile('input', 'utf-8', (err, data) => {
    let lines = data.split(/\r?\n/);
    let links = [];
    let allCities = new Set();
    lines.forEach(l => {
        cities = l.split(' = ')[0];
        distance = +l.split(' = ')[1];
        source = cities.split(" to ")[0];
        destination = cities.split(" to ")[1];
        allCities.add(source);
        allCities.add(destination);
        let link = new Link(source, destination, distance);
        links.push(link);
    });
    console.log(links);
    let permutations = perm(Array.from(allCities));
    distances = [];
    permutations.forEach(p => {
        let totalDistance = 0;
        for(let i = 0; i < p.length - 1; i++) {
            let link = links.filter(l => {
                return((l.source === p[i] && l.destination === p[i+1]) || (l.source === p[i+1] && l.destination === p[i]));
            })[0].distance;
            totalDistance += link;
        }
        distances.push(totalDistance);
    });
    console.log(Math.min(...distances));

    


});