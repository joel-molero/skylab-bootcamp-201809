function find (array, callback) {
    var result;
    for(let i=0; i<array.length; i++){
        if(callback(array[i])){
            return array[i];
        }
    }
}