import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { TRootState, TAppDispatch } from 'store';

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
