import {IMeal} from "./Types"
import {CupSizeEnum, DoughTexturePizzaEnum, PizzaSizeEnum} from "./Enums";

export abstract class Meal implements IMeal{
    abstract calculatePrice(): number
    getMealInfo() {
        return {
            meal: this.constructor.name,
            details: this,
        }
    }
}

export class Coffee extends Meal {
    constructor(private cup: CupSizeEnum, private quantity: number) {
        super();
    }

    calculatePrice(): number {
        switch (this.cup) {
            case CupSizeEnum.SMALL:
                return 10 * this.quantity;
            case CupSizeEnum.LARGE:
                return 20 * this.quantity;
            default:
                return 15 * this.quantity;
        }
    }
}

export class Pizza extends Meal {
    constructor(private doughType: DoughTexturePizzaEnum, private toppings: string[] = [], private size: PizzaSizeEnum) {
        super()
    }

    calculatePrice(): number {
        let basePrice = 100;

        switch (this.doughType) {
          case DoughTexturePizzaEnum.Crispy: 
            basePrice += 10;
            break;
          case DoughTexturePizzaEnum.Chewy:
            basePrice += 5;
            break;
          case DoughTexturePizzaEnum.Tough:
            basePrice -= 5;
            break;
        }
      
        switch (this.size) {
          case PizzaSizeEnum.MEDIUM:
            basePrice *= 1.5;
            break;
          case PizzaSizeEnum.LARGE:
            basePrice *= 2;
            break;
        }
      
        return basePrice + this.toppings.length * 3;
    }
}


