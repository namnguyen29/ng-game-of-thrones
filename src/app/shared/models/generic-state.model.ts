export interface GenericState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}
