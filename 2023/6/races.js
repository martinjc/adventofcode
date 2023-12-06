let fs = require('fs')

let input = fs.readFileSync('input', 'utf-8').split('\n');

let times = input[0].replace('Time: ', '').match(/\d+/g).map(v => +v);
let distance = input[1].replace('Distance: ', '').match(/\d+/g).map(v => +v);

console.log(times, distance);

let results = [];

// works but not quite - fine for the test and 3 of 4 input, and works for part 2, but is 2 out for first test in part 1 so an off by one somewhere
// times.forEach((t, i) => {
//     for(let j = 0; j <= Math.ceil(t/2); j++) {
//         if((t-j) * j >= distance[i]) {
//             let result = (t % 2) === 0 ? ((Math.ceil(t/2)-j)*2)-1 : (Math.ceil(t/2)-j)*2;
//             console.log(t, distance[i], j, result);
//             results.push(result);
//             break;
//         }
//     }
// });

times.forEach((t, i) => {   
    let r1 = Math.floor((t + Math.sqrt(t*t - 4*distance[i]))/2);
    let r2 = Math.floor((t - Math.sqrt(t*t - 4*distance[i]))/2);
    console.log(t, distance[i], r1, r2, r1-r2);
    results.push(r1-r2);
});

console.log(results.reduce((a, b) => a * b, 1));