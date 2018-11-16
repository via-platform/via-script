const Series = require('./series');

function is_function(x){
    return typeof x === 'function';
}

function is_number(x){
    return !isNaN(parseFloat(x)) && isFinite(x);
}

function is_series(x){
    return x instanceof Series;
}

function is_date(x){
    return x instanceof Date;
}

function is_array(x){
    return Array.isArray(x);
}

function is_boolean(x){
    return typeof x === 'boolean';
}

function is_nan(x){
    return isNaN(x);
}

function merge(a, b, fn){
    return a.map((value, index) => fn(value, b.get(index), index));
}

function iff(series, affirmative, negative){
    return series.map((value, index) => {
        const result = value ? affirmative : negative;

        if(is_series(result)){
            return result.get(index);
        }else{
            return result;
        }
    });
}

function offset(series, length){
    return series.map((value, index) => (index - length) >= 0 ? series.get(index - length) : 0);
}

function map(series, callback){
    return is_function(callback) ? series.map(callback) : series.map(() => callback);
}

function nz(series, replacement = 0){
    return series.map(value => is_nan(value) ? replacement : value);
}

function trim(series){
    return series.filter(value => !is_nan(value));
}

module.exports = {
    is_function,
    is_number,
    is_series,
    is_date,
    is_nan,
    is_array,
    is_boolean,
    merge,
    iff,
    offset,
    map,
    nz,
    trim
};
