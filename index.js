let side_length = 100;
let perimeter = 300;
let center;
let colors;
let min_gons = 3;
let max_gons = 500;
let stroke_weight_slider = document.querySelector('#stroke-weight-slider');
let side_length_slider = document.querySelector('#side-length-slider');
let translation_slider = document.querySelector('#translation-slider');
let relative_scale_slider = document.querySelector('#scale-slider');
let filling_checkbox = document.querySelector('#filling-checkbox');
let scale_type_select = document.querySelector('#scale-type');

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
    side_length_slider.addEventListener('change', event=>{
        side_length = parseInt(side_length_slider.value);
        perimeter = side_length * 3;
        redraw();
    });
    translation_slider.addEventListener('change', redraw);
    relative_scale_slider.addEventListener('change', redraw);
    filling_checkbox.addEventListener('change', redraw);
    scale_type_select.addEventListener('change', redraw);
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
    let w = parseFloat(relative_scale_slider.value);
    beginShape();
    for(let i = 0; i < sides; i++){
        let theta = TWO_PI * i / sides + offset_angle;
        let len;
        if(scale_type_select.value === 'arithmatic')
            len = side_length * (1 - w) + (perimeter / sides) * w; // Arithmetic
        else if(scale_type_select.value === 'geometric')
            len = side_length ** (1 - w) * (perimeter / sides) ** w; // Geometric
        else if(scale_type_select.value === 'harmonic')
            len = ((1 - w) / side_length + w / (perimeter / sides)) ** -1; // Harmonic
        else
            len = sides_length
        let hypot = len / 2 / Math.cos((PI - TWO_PI / (sides)) / 2);
        vertex(
            center.x + Math.cos(theta) * hypot,
            center.y + Math.sin(theta) * hypot - translation_slider.value * (sides - 3)
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
