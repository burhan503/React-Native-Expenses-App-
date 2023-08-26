const images = {
    1: require('./1.jpg'),
    2: require('./2.jpg'),
    3: require('./3.jpg'),
    4: require('./4.jpg'),
    9: require('./9.png'),
    10: require('./12.png'),
    11: require('./12.png'),
    12: require('./12.png'),
    2222: require('./2222.png'),
    4444: require('./4444.png'),
    1111: require('./11111.png'),
}

export default function randomImage(){
    let min = 1;
    let max = 12;
    let random = Math.floor(Math.random()*(max-min + 1)) + min;
    return images[random];
}