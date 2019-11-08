class objectSpeed {
    
    updateMovement() {
        if (rightPressed) {
            criminal.x += criminal.xSpeed;
    
        } else if (leftPressed) {
            criminal.x -= criminal.xSpeed;
        }
    
        if (policeRightPressed) {
            police.x += police.xSpeed;
        }
    
        if (policeLeftPressed) {
            police.x -= police.xSpeed;
        }
    
        if (policeSpacePressed) {
            bullet.color = 'yellow';
            bullet.x = bullet.x + 20;
            bullet.y = police.y;    
        }
    
        //Players speed decreases as they jump, hence enabling a gravity like effect
        if (upPressed) {
            criminal.y -= criminal.gravity;
            criminal.gravity -= criminal.ySpeed
    
            if (Math.ceil(criminal.y) >= 300) {
                upPressed = false;
                criminal.gravity = criminal.originalGravity;
                return;
            }

            if (Math.ceil(criminal.y) >= building.height + 105 && (criminal.x >= building.x && criminal.x <= building.x + 100)) {
                upPressed = false;
                criminal.gravity = criminal.originalGravity;

                return;
            }
    
        }
    }
}