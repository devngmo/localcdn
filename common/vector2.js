class Vector2 {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    clone() {
        return new Vector2(this.x, this.y);
    }

    rotate(angle) {
        var rad = angle * (Math.PI/180); // rotate counter clockwise
        var cos = Math.cos(rad);
        var sin = Math.sin(rad);
        var newX = Math.round(10000*(this.x * cos + this.y * sin))/10000;
        var newY = Math.round(10000*(this.y * cos - this.x * sin))/10000;
        this.x = newX;
        this.y = newY;
        return this;
    }
}