import { GetHalfArrayFunc, LoadableComment } from '../../../types/types';

export const getHalfArray:GetHalfArrayFunc<LoadableComment> = (arr:LoadableComment[]) => (
  Math.round(arr.length / 2) - 1
);
