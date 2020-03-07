function time(){
    return series.keys();
}

function format_time(series, format){
    return '';
    //TODO Have to make this work without Moment.js
    // return series.keys().map(value => moment(value).format(format));
}

function day_of_month(series){
    return format_time(series, 'D');
}

function day_of_week(series){
    return format_time(series, 'd');
}

function hour(series){
    return format_time(series, 'H');
}

function minute(series){
    return format_time(series, 'mm');
}

function second(series){
    return format_time(series, 'ss');
}

function am_pm(series){
    return format_time(series, 'A');
}

function week_of_year(series){
    return format_time(series, 'W');
}

function year(series){
    return format_time(series, 'YYYY');
}

export {
    time,
    format_time,
    day_of_month,
    day_of_week,
    hour,
    minute,
    second,
    am_pm,
    week_of_year,
    year
};
