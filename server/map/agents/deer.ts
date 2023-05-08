enum DeerAction {
    WALK,
    FOLLOW,
    STAND,
    WAIT,
    SLEEP,
    POOP,
}

const deerMaxParams = (level) => {
    return {
        health: 100 + level * 20,
        tiredness: this.health,
        hunger: 100 + level * 20,
    }
}

interface MapItemDefault {
    id: 0
    x: 0
    y: 0
    type: ''
    level: 1
    items: []
    user: ''
}
class DeerAI implements MapItemDefault {

    id: 0
    x: 0
    y: 0
    type: ""
    level: 1
    items
    user: ""
    private action: DeerAction;
    private health: number;
    private tiredness: number; // tiredness > health => sleep
    private hunger: number;

    constructor() {
        this.action = DeerAction.STAND;
        this.health = deerMaxParams(this.level).health
        this.tiredness = 0
        this.hunger = 0
    }

    public update(deltaTime: number): void {
        this.chooseAction();
        this.performAction(deltaTime);
    }

    private chooseAction(): void {
        const randomNumber = Math.random();

        if (randomNumber < 0.2) {
            this.action = DeerAction.WALK;
        } else if (randomNumber < 0.4) {
            this.action = DeerAction.FOLLOW;
        } else if (randomNumber < 0.6) {
            this.action = DeerAction.STAND;
        } else if (randomNumber < 0.62) {
            this.action = DeerAction.POOP;
        } else if (randomNumber < 0.7) {
            this.action = DeerAction.WAIT;
        } else {
            this.action = DeerAction.SLEEP;
        }
    }

    private performAction(deltaTime: number): void {
        switch (this.action) {
            case DeerAction.WALK:
                this.walk(deltaTime);
                break;
            case DeerAction.FOLLOW:
                this.follow(deltaTime);
                break;
            case DeerAction.STAND:
                this.stand(deltaTime);
                break;
            case DeerAction.WAIT:
                this.wait(deltaTime);
                break;
            case DeerAction.SLEEP:
                this.sleep(deltaTime);
                break;
            case DeerAction.POOP:
                this.poop(deltaTime);
                break;
        }
    }

    private walk(deltaTime: number): void {
        // Set the target's position as the targetPosition and call walk method
        // this.targetPosition = this.target.position;
        this.walk(deltaTime);
    }
    private follow(deltaTime: number): void {
        // Set the target's position as the targetPosition and call walk method
        // this.targetPosition = this.target.position;
        this.walk(deltaTime);
    }

    private stand(deltaTime: number): void {
        // Do nothing while standing
    }

    private wait(deltaTime: number): void {
        // Similar to standing, but you can add some time-based conditions to change actions after a certain waiting time
    }

    private sleep(deltaTime: number): void {
        // Simulate sleep by staying still for a certain duration and then transitioning back to another action
        // You can implement a sleep timer and decrease it with deltaTime, then choose another action when it reaches 0
    }

    private poop(deltaTime: number): void {
        // Simulate sleep by staying still for a certain duration and then transitioning back to another action
        // You can implement a sleep timer and decrease it with deltaTime, then choose another action when it reaches 0
    }
}