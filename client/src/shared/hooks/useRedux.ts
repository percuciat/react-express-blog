import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { TypeRootState, TypeAppDispatch } from 'shared/config';

export const useAppDispatch = () => useDispatch<TypeAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TypeRootState> = useSelector;
