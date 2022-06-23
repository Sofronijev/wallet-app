import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { RootStateType, AppDispatchType } from './index'

// Use throughout app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector