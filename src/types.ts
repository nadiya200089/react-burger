export interface IUserData {
    email: string;
    name: string;
}

export interface IRegisterData  extends IForgotPassword {
    name: string;
    password: string;
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
    __v: number;
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