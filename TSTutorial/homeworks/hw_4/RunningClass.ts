
import { Coffee, Pizza } from "./Meals";
import {CupSizeEnum, DoughTexturePizzaEnum, PaymentMethodEnum, PizzaSizeEnum} from "./Enums";
import Order from "./Order";
import Pizzeria from "./Pizzeria";

const coffee = new Coffee(CupSizeEnum.MEDIUM, 1)
const pizzaD = new Pizza(DoughTexturePizzaEnum.Crispy, ["ananas", "cheese", "cucumber"], PizzaSizeEnum.MEDIUM)
const order = new Order()
order.makeOrder("Daniil", [coffee, pizzaD], PaymentMethodEnum.CASH)

const pizzaM = new Pizza(DoughTexturePizzaEnum.Tough, ["vegetables"], PizzaSizeEnum.LARGE)
order.makeOrder("Maxim", pizzaM, PaymentMethodEnum.CREDIT_CARD)

const pizzerie = new Pizzeria('U Mateje', 'Prague', "08:00 - 20:00")
pizzerie.addOrders(order.getAllOrders())
//Order for Daniil
pizzerie.prepareOrder()
pizzerie.takeTheOrder()

// Order for Maxim
pizzerie.prepareOrder()
pizzerie.takeTheOrder()