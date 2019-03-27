
class Point {
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
    }

    static distance(a, b) {
        return Math.hypot(a.x - b.x, a.y - b.y);
    }
}