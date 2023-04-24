import {
    useDispatch as useDispatchRedux, 
    TypedUseSelectorHook, 
    useSelector as useSelectorRedux
} from 'react-redux';
import { Action, ActionCreator } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';
import { AppDispatch, RootStore } from './store';

// const AUTH = 'updateInfoUser'
type tr = {
    type: 'fetchOrder'
};
type AppThunk<ReturnType = void> = ActionCreator <ThunkAction <ReturnType, Action, RootStore, tr>>;

export const useDispatch = () => useDispatchRedux<AppDispatch 
// | AppThunk
>();
export const useSelector: TypedUseSelectorHook<RootStore> = useSelectorRedux
