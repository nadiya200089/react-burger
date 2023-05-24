import { IIngredientsData, IWebsocketOrders } from '../types';
import moment from 'moment';


export const parseOrdersToClient = (orders: IWebsocketOrders[], ingredients: IIngredientsData[]) => {

    return orders.map((order: IWebsocketOrders) => {
        const arrIdsIngredients = order.ingredients;
        const usedIngredients = ingredients.filter((ingredient: IIngredientsData) => arrIdsIngredients.includes(ingredient._id));


        const total = usedIngredients.reduce((sumPrice: number, currentItem: IIngredientsData) => {
            return sumPrice + currentItem.price;
        }, 0);

        const arrImgsUri = usedIngredients.map((ingredients: IIngredientsData) => ingredients.image_mobile);
        const ingredientName = usedIngredients.map((ingredients: IIngredientsData) => ingredients.name);

        return Object.assign({}, order, { total: total, arrImgsUri: arrImgsUri, ingredientName: ingredientName });
    })
}

export const parseOrderToClient = (order: IWebsocketOrders, ingredients: IIngredientsData[]) => {
    const arrIdsIngredients = order.ingredients;
    const usedIngredients = ingredients.filter((ingredient: IIngredientsData) => arrIdsIngredients.includes(ingredient._id));


    const total = usedIngredients.reduce((sumPrice: number, currentItem: IIngredientsData) => {
        return sumPrice + currentItem.price;
    }, 0);

    const arrImgsUri = usedIngredients.map((ingredients: IIngredientsData) => ingredients.image_mobile);
    const ingredientName = usedIngredients.map((ingredients: IIngredientsData) => ingredients.name);

    const ingredientPrice = usedIngredients.map((ingredients: IIngredientsData) => ingredients.price);

    return Object.assign({}, order, { total: total, arrImgsUri: arrImgsUri, ingredientName: ingredientName, ingredientPrice: ingredientPrice });

}

export const getTimeFromTimestamp = (orderTimeISO: string | undefined): string => {
    const orderDay = moment(orderTimeISO).format('DD');
    const orderTime = moment(orderTimeISO).format('HH:mm');
    const todayDay = moment().format('DD');

    const yesterdayMessageFromOrder = moment(orderTimeISO).fromNow();

    if (orderDay === todayDay) {
        return `сегодня, ${orderTime}`;
    } else if (yesterdayMessageFromOrder === 'день назад') {
        return `вчера, ${orderTime}`;
    } else {
        return `${yesterdayMessageFromOrder}, ${orderTime}`;
    }
};