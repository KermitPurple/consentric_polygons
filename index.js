let side_length = 100;
let center;
let colors;
let min_gons = 3;
let max_gons = 200;
let stroke_weight_slider = document.querySelector("#stroke-weight-slider");
let filling_checkbox = document.querySelector("#filling-checkbox");

function setup(){
    createCanvas(windowWidth, windowHeight);
    document.getElementsByTagName('canvas')[0].addEventListener('click', toggle_filling);
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
    strokeWeight(stroke_weight_slider.value);
    stroke_weight_slider.addEventListener('change', update_stroke_weight);
    filling_checkbox.addEventListener('change', redraw);
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
        if(filling_checkbox.checked){
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
            filling_checkbox.checked = !filling_checkbox.checked;
            redraw();
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

function toggle_filling(){
    filling_checkbox.checked = !filling_checkbox.checked;
    redraw();
}

function update_stroke_weight(){
    strokeWeight(stroke_weight_slider.value);
    redraw();
}
