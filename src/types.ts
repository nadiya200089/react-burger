export interface IUserData {
    email: string;
    name: string;
}

export interface IRegisterData {
    name: string;
    password: string;
    email: string;
}

export interface IIngredientsData {
    calories: number;
    carbohydrates: number;
    fat: number;
    proteins: number;
    image: string;
    price: number;
    image_large: string;
    image_mobile: string;
    name: string;
    _id: string;
    type: string;
    uuid: string;
    __v: number;
}



export interface IIngredientsDto {
    calories: number;
    carbohydrates: number;
    fat: number;
    proteins: number;
    image: string;
    price: number;
    image_large: string;
    image_mobile: string;
    name: string;
    _id: string;
    type: string;
    __v: number;
    uuid?: string;
}

export interface ILogout {
    token: string;
}

export interface IUpdateToken extends ILogout {}

export interface IForgotPassword {
    email: string;  
}

export interface IResetPassword {
    password: string;
    token: string
}

 export interface orders {
    createdAt: string;
    ingredients: orderIngredients[];
 }

 export interface orderIngredients {
    name: string;
    number: number;
    status: string;
    updatedAt: string;
    _id: string;


 }

 export interface IWebsocketOrders {
    _id: string;
    ingredients: string[];
    status: 'done' | 'pending' | 'created';
    name: 'string';
    number: number;
    createdAt?: string;
    updateAt?: string;
}

export interface IFeedOrders extends IWebsocketOrders {
    arrImgsUri: string[];
    totalPrice: number;
}

export interface IFeedCard {
    _id: string;
    key: string,
    name: 'string';
    number: number;
    createdAt?: string;
    updateAt?: string;
    arrImgsUri: string[];
    totalPrice: number;
    onClick: ()=> void;
    ingredientName: string;
    status?: string;
    path: string;
}
