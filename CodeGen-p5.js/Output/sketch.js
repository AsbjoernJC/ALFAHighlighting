const shapesToDraw = [];

class Shape {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        shapesToDraw.push(this);
    }

    move(offsetX, offsetY, duration) {
        let start = Date.now();

        let originalX = this.x;
        let originalY = this.y;

        let animate = (resolve) => {
            let now = Date.now();
            let progress = (now - start) / duration;

            if (progress >= 1) {
                this.x = originalX + offsetX;
                this.y = originalY + offsetY;
                resolve(); // Resolving the Promise here
                return;
            }

            let dx = progress * offsetX;
            let dy = progress * offsetY;

            this.x = originalX + dx;
            this.y = originalY + dy;

            requestAnimationFrame(() => animate(resolve)); // Passing `resolve` to the next frame
        }

        return new Promise((resolve, reject) => {
            animate(resolve); // Passing `resolve` to the `animate` function
        });
    }
}

class Rect extends Shape {
    constructor(x, y, w, h) {
        super(x, y);
        this.w = w;
        this.h = h;
    }

    draw() {
        rect(this.x, this.y, this.w, this.h);
    }
}

function wait(duration) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, duration)
    });
}

async function moveParal(animations) {
    const promises = animations.map(animation => animation());
    return Promise.all(promises);
}


async function main() {
	let var_len=40
	let var_xPos=0
	let var_myRect1=new Rect(var_xPos,0,var_len,var_len)
	let var_myRect2=new Rect(var_xPos,50,var_len,var_len)
	let var_offset1=500
	let var_offset2=500
	let var_duration=500

	for (let var_i=0
; var_i <= 20; var_i++){
		
		await moveParal([			
			() => var_myRect1.move(var_offset1 / 2,0,var_duration),
			() => var_myRect2.move(var_offset2,0,var_duration),		
		]);


		await moveParal([			
			() => var_myRect1.move(var_offset1 / 2,0,var_duration),
			() => var_myRect2.move(0,var_offset2,var_duration),		
		]);


		await moveParal([			
			() => var_myRect1.move( -var_offset1 / 2,0,var_duration),
			() => var_myRect2.move( -var_offset2,0,var_duration),		
		]);


		await moveParal([			
			() => var_myRect1.move( -var_offset1 / 2,0,var_duration),
			() => var_myRect2.move(0, -var_offset2,var_duration),		
		]);

	}
}

function setup() {
	createCanvas(1000, 1000)
	main();
}

function draw() {
	background(255)

	for (const shape of shapesToDraw) {
		shape.draw()
	}
}