import {
    useDispatch as useDispatchRedux, 
    TypedUseSelectorHook, 
    useSelector as useSelectorRedux
} from 'react-redux';
import { AppDispatch, RootStore } from './store';


export const useDispatch = () => useDispatchRedux<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootStore> = useSelectorRedux
