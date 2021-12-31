let side_length = 100;
let center;
let colors;
let min_gons = 3;
let max_gons = 200;
let filling = false;

function setup(){
    createCanvas(windowWidth, windowHeight);
    center = createVector(windowWidth / 2, windowHeight / 2);
    colors = [
        color(255, 0, 0),
        color(255, 128, 0),
        color(255, 255, 0),
        color(128, 255, 0),
        color(0, 255, 0),
        color(0, 255, 128),
        color(0, 255, 255),
        color(0, 128, 255),
        color(0, 0, 255),
        color(128, 0, 255),
        color(255, 0, 255),
        color(255, 0, 128)
    ];
    noLoop();
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    center = createVector(windowWidth / 2, windowHeight / 2);
    draw();
}

function draw(){
    background(0);
    for(let n = max_gons; n >= min_gons; n--){
        if(filling){
            fill(get_color(n - min_gons));
            stroke(0);
        }else{
            noFill();
            stroke(get_color(n - min_gons));
        }
        draw_polygon(
            n,
            PI / n + HALF_PI
        );
    }

}

function keyPressed(){
    switch(keyCode){
        case 32:
            filling = !filling;
            draw();
            break;
    }
}

function draw_polygon(
    sides,
    offset_angle = HALF_PI
){
    if(sides < 3)
        throw new Error('By definition a polygon must have at least 3 sides');
    let hypot = side_length / 2 / Math.cos((PI - TWO_PI / (sides)) / 2);
    beginShape();
    for(let i = 0; i < sides; i++){
        let theta = TWO_PI * i / sides + offset_angle;
        vertex(
            center.x + Math.cos(theta) * hypot,
            center.y + Math.sin(theta) * hypot
        );
    }
    endShape(CLOSE);
}

function get_color(index){
    return colors[index % colors.length];
}
