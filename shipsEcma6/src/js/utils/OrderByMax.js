export default class OrderByMax {
    static Order(max) {
        max.sort(function(a, b){return b-a});
        return max; 
    }
}
    