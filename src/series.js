module.exports = class Series extends Array {
    set(key, value){
        //I could use a more clever search algorithm to insert items into the set.
        //However, we have one huge advantage: We know that the vast majority of the time
        //data that is being set is presorted, whether it's because it comes out of Postgres that way,
        //or because we received a WS message to update the lastest candle in this series. Therefore, it
        //really makes sense just to do a linear search starting from the end of the array, as we will
        //99% of the time, hit our result very quickly.

        if(key instanceof Date){
            for(let i = this.length - 1; i >= 0; i--){
                if(this[i][0].getTime() === key.getTime()){
                    return this[i][1] = value;
                }else if(this[i][0] < key){
                    return void super.splice(i + 1, 0, [key, value]);
                }
            }
        }else{
            for(let i = this.length; i >= 0; i--){
                if(this[i][0] === key){
                    return this[i][1] = value;
                }else if(this[i][0] < key){
                    return void super.splice(i + 1, 0, [key, value]);
                }
            }
        }

        return void super.splice(0, 0, [key, value]);
    }

    available(start, end, increment){

    }

    map(fn){
        return super.map(([k, o], index) => ([k, fn(o, index)]));
    }

    entries(){
        return super.map(([k, o]) => ([k, [k, o]]));
    }

    prop(prop){
        return this.map(o => o[prop]);
    }

    preceding(index, length){
        return this.slice(Math.max(index - length + 1, 0), index + 1);
    }

    before(index, offset = 1){
        return this.get[index - offset];
    }

    after(index, offset = 1){
        return this.get[index + offset];
    }

    get(index){
        return this[index][1];
    }

    first(){
        return this.length ? this.get(0) : undefined;
    }

    last(){
        return this.length ? this.get(this.length - 1) : undefined;
    }

    keys(){
        return Array.from(this, ([k]) => k);
    }

    values(){
        return Array.from(this, ([k, v]) => v);
    }

    min(){
        return Math.min(...super.map(([k, v]) => v));
    }

    max(){
        return Math.max(...super.map(([k, v]) => v));
    }

    range(start, end, threshold = 0){
        return super.filter(([k]) => threshold >= start - k && -threshold <= end - k);
    }

    domain(){
        return [this.min(), this.max()];
    }

    reduce(fn, def){
        return super.reduce((accumulator, [k, v], index, source) => fn(accumulator, v, index, source), def);
    }

    flatten(){
        return this.reduce((accumulator, value) => {
            if(Array.isArray(value)){
                accumulator.push(...value);
            }else{
                accumulator.push(value);
            }

            return accumulator;
        }, []);
    }

    array(){
        return Array.from(this);
    }

    clone(){
        return this.slice();
    }

    permute(keys = []){
        return this.map(value => keys.map(key => value[key]));
    }

    each(callback){
        this.forEach(([k, v], index, series) => callback(v, index, series));
    }
}