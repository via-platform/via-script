const {add, divide, avg} = require('./math');

function prop(series, property){
    return series.prop(property);
}

function open(series){
    return prop(series, 'price_open');
}

function close(series){
    return prop(series, 'price_close');
}

function high(series){
    return prop(series, 'price_high');
}

function low(series){
    return prop(series, 'price_low');
}

function volume(series){
    return prop(series, 'volume_traded');
}

function vwap(series){
    return prop(series, 'vwap');
}

function open_close_midpoint(series){
    return avg(prop(series, 'price_open'), prop(series, 'price_close'));
}

function high_low_midpoint(series){
    return avg(prop(series, 'price_high'), prop(series, 'price_low'));
}

function permute(series, keys){
    return series.permute(keys);
}

export {
    prop,
    open,
    close,
    high,
    low,
    volume,
    vwap,
    open_close_midpoint,
    high_low_midpoint,
    permute
};