const {is_number, merge} = require('./core');
const {prop} = require('./properties');

function add(a, b){
    return is_number(b) ? a.map(value => value + b) : merge(a, b, (x, y) => x + y);
}

function subtract(a, b){
    return is_number(b) ? a.map(value => value - b) : merge(a, b, (x, y) => x - y);
}

function multiply(a, b){
    return is_number(b) ? a.map(value => value * b) : merge(a, b, (x, y) => x * y);
}

function divide(a, b){
    return is_number(b) ? a.map(value => value / b) : merge(a, b, (x, y) => x / y);
}

function max(a, b){
    return is_number(b) ? a.map(value => Math.max(value, b)) : merge(a, b, (x, y) => Math.max(x, y));
}

function min(a, b){
    return is_number(b) ? a.map(value => Math.min(value, b)) : merge(a, b, (x, y) => Math.min(x, y));
}

function gt(a, b){
    return is_number(b) ? a.map(value => value > b) : merge(a, b, (x, y) => x > y);
}

function lt(a, b){
    return is_number(b) ? a.map(value => value < b) : merge(a, b, (x, y) => x < y);
}

function gte(a, b){
    return is_number(b) ? a.map(value => value >= b) : merge(a, b, (x, y) => x >= y);
}

function lte(a, b){
    return is_number(b) ? a.map(value => value <= b) : merge(a, b, (x, y) => x <= y);
}

function mod(series, x){
    return series.map(value => value % x);
}

function abs(series){
    return series.map(value => Math.abs(value));
}

function acos(series){
    return series.map(value => Math.acos(value));
}

function asin(series){
    return series.map(value => Math.asin(value));
}

function atan(series){
    return series.map(value => Math.atan(value));
}

function cos(series){
    return series.map(value => Math.cos(value));
}

function sin(series){
    return series.map(value => Math.sin(value));
}

function tan(series){
    return series.map(value => Math.tan(value));
}

function sqrt(series){
    return series.map(value => Math.sqrt(value));
}

function ceil(series){
    return series.map(value => Math.series(value));
}

function floor(series){
    return series.map(value => Math.floor(value));
}

function round(series){
    return series.map(value => Math.round(value));
}

function total(series){
    return series.reduce((accumulator, value) => accumulator + value, 0);
}

function exp(series){
    return series.map(value => Math.exp(value));
}

function log(series, base = Math.E){
    return series.map(value => Math.log(value) / Math.log(base));
}

function pow(series, power){
    return series.map(value => Math.pow(value, power));
}

function avg(a, b){
    return divide(add(a, b), 2);
}

function mean(series){
    return series.length ? series.reduce((a, v) => a + v, 0) / series.length : 0;
}

function sign(series){
    return series.map(value => {
        if(value > 0){
            return 1;
        }else if(value < 0){
            return -1;
        }else{
            return 0;
        }
    });
}

function sum(series, length){
    return series.map((value, index) => total(series.preceding(index, length)));
}

module.exports = {
    add,
    subtract,
    multiply,
    divide,
    mod,
    min,
    max,
    gt,
    lt,
    abs,
    acos,
    asin,
    atan,
    cos,
    sin,
    tan,
    sqrt,
    floor,
    ceil,
    round,
    total,
    exp,
    log,
    pow,
    sign,
    mean,
    avg,
    sum
};