# Via Script

Via Script is a superset of functions build with normal JavaScript to allow for easier manipulation of time series data. Data is stored in an array-like structure called a `Series` that abstracts away some of the more annoying aspects of working with date-value pairs.

## Series

A series is an array-like data structure that contains date-value pairs. In fact, the `Series` class extends the Javascript `Array` object. Within the series object, data is stored as a list of ordered pairs.

``` javascript
[
    [Date, Value],
    [Date, Value],
    [Date, Value],
    ...
]
```

As the Series is just an extension of an Array, it contains all of the Array methods. However, many methods have been overridden to allow for easier manipulation of the data within the series. It is much more common to manipulate data (y-values) than it is to manipulate the underlying dates themselves.

Series can be manipulated functionally using the built in functions of Via Script. Most of these functions will only accept a series as their primary argument. For example, to add a constant to every value in the series:

``` javascript
const series_plus_seven = add(series, 7);
```

In this case, the function `add` will return a new series with the constant added to each of the original items.

``` javascript
const sum_of_two_series = add(series_one, series_two);
```

This will add two series together, one value at a time. Obviously, series must be of the same length to be manipulated in this way.

## Series Methods

### Create a Series

``` javascript
const series = new Series();
```

### Insert a Value

*Returns Undefined*

Add a value to the Series. Date must be a JavaScript date object. Values can be anything, Via Script is unopinionated about this. However, you may need a Series with a certain value type in order to use certain functions (e.g. you must have a Series of numbers in order to use `add`).

``` javascript
series.set(date, value);
```

### Get a Value

*Returns A Value*

You can certainly use bracket notation (as with any JS array), but this provides a simpler alias for retrieving values at a certain index.

``` javascript
//Simple alias
series.get(index);

//Other method for retrieving values
//Note that series[index][0] is the Date that corresponds to this value
series[index][1];
```

### Availability of a Date Range

*Returns Boolean*

**This function is not implemented yet.**

Check to see if a Series contains values for all dates within a certain range, with a certain granularity. For example, does the Series contain values for all days between 1 Jan 2018 and 31 Jan 2018?

``` javascript
const available = series.available(start_date, end_date, granularity_in_milliseconds);
```

### Map

*Returns Series*

This function is an override of the JS `Array.map` function. It will map all values to a new value, without transforming the keys (dates). It will return a new series and not modify the original series.

``` javascript
const new_series = series.map((value, index) => transform(value));
```

### Entries

*Returns Series*

This function is similar to the `Object.entries` function. It will map all values to a array containing both the key and value. It will return a new series and not modify the original series. Please note, this does not return an `Array` like `Object.entries` does. It returns a new `Series`, like other functions do.

``` javascript
//Entries is a Series of arrays, each containing [original_key, original_value]
const entries = series.entries((value, index) => transform(value));
```

## Via Script Functions

...To Be Continued.
