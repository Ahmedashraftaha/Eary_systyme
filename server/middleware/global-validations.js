const isNumber = (num) => {
    num = "" + num; 
    return !isNaN(num) && !isNaN(parseFloat(num));
}
module.exports = {
    isNumber
}