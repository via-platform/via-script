const {map, nz, merge} = require('./core');
const {prop} = require('./properties');
const {min, max, sign, subtract, multiply, divide, mean, abs, total, pow, sqrt} = require('./math');

function change(series, length = 1){
    return series.map((value, index) => (index - length > 0) ? value - series.get(index - length) : 0);
}

function rma(series, length, last = 1){
    return series.map((value, index) => last = index ? value / Math.min(index, length) + (1 - (1 / Math.min(index, length))) * last : value);
}

function rsi(series, length){
    const open = prop(series, 'price_open');
    const close = prop(series, 'price_close');
    const avg_ups = rma(max(subtract(close, open), 0), length);
    const avg_downs = rma(max(subtract(open, close), 0), length);

    return map(nz(divide(avg_ups, avg_downs), 100), value => 100 - 100 / (1 + value));
}

function mfm(series){
    const high = prop(series, 'price_high');
    const low = prop(series, 'price_low');
    const close = prop(series, 'price_close');

    return divide(
        subtract(subtract(close, low), subtract(high, close)),
        subtract(high, low)
    );
}

function adl(series, last = 0){
    return map(multiply(mfm(series), prop(series, 'volume_traded')), (value, index) => last += value);
}

function alma(series, length, offset, sigma){
    return series.map((value, index) => {
        const preceding = series.preceding(index, length);
        const m = Math.floor(offset * (preceding.length - 1));
        const s = preceding.length / sigma;

        let normal = 0;
        let sum = 0;

        for(let i = 0; i < preceding.length; i++){
            const weight = Math.exp(-1 * Math.pow(i - m, 2) / (2 * Math.pow(s, 2)));
            normal += weight;
            sum += preceding.get(i) * weight;
        }

        return sum / normal;
    });
}

function atr(series, length){
    return rma(tr(series), length);
}

function sma(series, length){
    return series.map((value, index) => mean(series.preceding(index, length)));
}

function ema(series, length, last = 0){
    return series.map((value, index) => last = index ? (value - last) * (2 / (Math.min(index, length) + 1)) + last : value);
}

function tr(series){
    return series.map((value, index) => {
        if(index){
            return Math.max(
                value.price_high - value.price_low,
                Math.abs(value.price_high - series.get(index - 1).price_close),
                Math.abs(value.price_low - series.get(index - 1).price_close)
            );
        }else{
            return value.price_high - value.price_low;
        }
    });
}

function since(series, condition){
    //Returns a new series with the length (for each bar) since the condition was true
    let since = NaN;

    return series.map(value => {
        if(condition(value)){
            since = 0;
        }else if(isFinite(since)){
            since += 1;
        }

        return since;
    });
}

function cci(){

}

function cog(){

}

function condition(series, condition){

}

function correlation(){

}

function cross(a, b){
    //Returns a new series of booleans, true if the series have crossed, false if not
    return merge(a, b, (x, y, index) => {
        if(x === y){
            return true;
        }else if(index){
            const previous_x = a.before(index);
            const previous_y = b.before(index);

            return (x > y && previous_x < previous_y || x < y && previous_x > previous_y);
        }else{
            return false;
        }
    });
}

function crossover(a, b){
    //Returns a new series of booleans, true if a has crossed over b, false if not
}

function crossunder(a, b){
    //Returns a new series of booleans, true if a has crossed under b, false if not
}

function rising(series, length){
    //True if current x is greater than any previous x for y bars back, false otherwise
}

function falling(series, length){
    //True if current x is less than any previous x for y bars back, false otherwise
}

function highest(series, length){
    //Highest value for a given number of bars back
    return series.map((value, index) => Math.max(...series.preceding(index, length).values()));
}

function lowest(series, length){
    //Lowest value for a given number of bars back
    return series.map((value, index) => Math.min(...series.preceding(index, length).values()));
}

function highest_bars(series, length){
    //Offset to the highest value for a given number of bars back
    return series.map((value, index) => {
        const preceding = series.preceding(index, length);

        let highest_value = -Infinity;
        let highest_index = 0;

        preceding.each((value, index) => {
            if(value.price_high >= highest_value){
                highest_value = value.price_high;
                highest_index = index;
            }
        });

        return preceding.length - highest_index;
    });
}

function lowest_bars(series, length){
    //Offset to the lowest value for a given number of bars back
    return series.map((value, index) => {
        const preceding = series.preceding(index, length);

        let lowest_value = Infinity;
        let lowest_index = 0;

        preceding.each((value, index) => {
            if(value.price_low <= lowest_value){
                lowest_value = value.price_low;
                lowest_index = index;
            }
        });

        return preceding.length - lowest_index;
    });
}

function linreg(series, length){
    return series.map((value, index) => series.preceding(index, length).linreg()(Math.min(length, index + 1) - 1));
}

function momentum(series, length = 1){

}

function percentile_linear_interpolation(){

}

function percentile_nearest_rank(){

}

function percent_rank(){

}

function pivot_high(){

}

function pivot_low(){

}

function roc(){

}

function sar(series, acceleration, acceleration_increment, max_acceleration){
    let trend_direction = 'up';
    let trend_length = 0;
    let trend_maximum = 0;

    let current_acceleration = acceleration;
    let current_sar = 0;

    return series.map((value, index) => {
        const preceding = series.slice(Math.max(Math.min(2, trend_length) - 3, 0), index);

        if(trend_direction === 'up'){
            if(value.price_high > trend_maximum){
                trend_maximum = value.price_high;
                current_acceleration = Math.min(max_acceleration, current_acceleration + acceleration_increment);
            }

            current_sar += current_acceleration * (trend_maximum - current_sar);

            if(current_sar > value.price_low){
                trend_direction = 'down';
                current_sar = trend_maximum;
                current_acceleration = acceleration;
                trend_length = 0;
            }else if(direction.length){
                current_sar = Math.min(current_sar, ...preceding.prop('price_low'));
            }
        }else{

        }

        trend_length += 1;
        return current_sar;
    });
}

function deviation(series, length){
    return sqrt(variance(series, length));
}

function stochastic(series, length){
    const highest_high = highest(prop(series, 'price_high'), length);
    const lowest_low = lowest(prop(series, 'price_low'), length);
    const current_close = prop(series, 'price_close');

    return multiply(divide(subtract(current_close, lowest_low), subtract(highest_high, lowest_low)), 100);
}

function tsi(){

}

function when(condition, series, value){

}

function variance(series, length){
    return series.map((value, index) => {
        const preceding = series.preceding(index, length);
        const difference = total(pow(subtract(preceding, mean(preceding)), 2));
        return difference / preceding.length;
    });
}

function vwap(series){
    return prop(series, 'vwap');
}

function vwma(series, property, length){
    const volume = prop(series, 'volume_traded');
    return divide(sma(multiply(prop(series, property), volume), length), sma(volume, length));
}

function swma(series){
    return series.map((value, index) => {
        const preceding = series.preceding(index, 4);

        if(preceding.length === 1){
            //The first item will have an average of itself
            return preceding.get(0);
        }else if(preceding.length === 2){
            //The second will be an average between itself and the preceding
            return (preceding.get(0) + preceding.get(1)) / 2;
        }else if(preceding.length === 3){
            //The third will be a symmetric average with weights [1/4, 2/4, 1/4]
            return (preceding.get(0) + preceding.get(1) * 2 + preceding.get(2)) / 4;
        }else{
            //All others will be a symmetric average with weights [1/6, 2/6, 2/6, 1/6]
            return (preceding.get(0) + preceding.get(1) * 2 + preceding.get(2) * 2 + preceding.get(3)) / 6;
        }
    });
}

function wma(series, length){
    return series.map((value, index) => {
        const preceding = series.preceding(index, length);
        const total_weight = preceding.length * (preceding.length + 1) / 2;

        return preceding.reduce((accumulator, current_value, current_index) => accumulator + current_value * (current_index + 1), 0) / total_weight;
    });
}

module.exports = {
    adl,
    change,
    rma,
    rsi,
    alma,
    atr,
    sma,
    ema,
    tr,
    since,
    cci,
    cog,
    condition,
    correlation,
    cross,
    crossover,
    crossunder,
    rising,
    falling,
    highest,
    lowest,
    highest_bars,
    lowest_bars,
    linreg,
    mfm,
    momentum,
    percentile_linear_interpolation,
    percentile_nearest_rank,
    percent_rank,
    pivot_high,
    pivot_low,
    roc,
    sar,
    deviation,
    stochastic,
    swma,
    tsi,
    when,
    variance,
    vwap,
    vwma,
    wma
};