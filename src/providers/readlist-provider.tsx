import { useLocalStorage } from '@/hooks/use-local-storage';
import { Book } from '@/types/books';
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

interface InitialState {
  items: Book[];
}

interface ReadListProviderState extends InitialState {
  addItem: (item: Book) => void;
  removeItem: (id: Book['ISBN']) => void;
  isSaved: (id: Book['ISBN']) => boolean;
  hasItems: boolean;
}

const ADD_PRODUCT = 'ADD_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

type Actions =
  | { type: typeof ADD_PRODUCT; payload: Book }
  | { type: typeof REMOVE_PRODUCT; payload: Book['ISBN'] };

export const ReadListStateContext = createContext<ReadListProviderState>(null);

const initialState: InitialState = {
  items: [],
};

const reducer = (state: ReadListProviderState, { type, payload }: Actions) => {
  switch (type) {
    case ADD_PRODUCT:
      return { ...state, items: [...state.items, payload] };
    case REMOVE_PRODUCT:
      return {
        ...state,
        items: state.items.filter((i: Book) => i.ISBN !== payload),
      };
    default:
      throw new Error(`Invalid type ${type}`);
  }
};

export const ReadListProvider = ({ children }: PropsWithChildren) => {
  const [savedReadList, setReadList] = useLocalStorage(
    'items-readList',
    JSON.stringify(initialState)
  );
  const [state, dispatch] = useReducer(reducer, JSON.parse(savedReadList));

  useEffect(() => {
    setReadList(JSON.stringify(state));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const addItem = useCallback(
    (item: Book) => {
      if (!item.ISBN) return;

      const existing = state.items.find((i: Book) => i.ISBN === item.ISBN);

      if (existing)
        return dispatch({ type: REMOVE_PRODUCT, payload: item.ISBN });

      dispatch({ type: ADD_PRODUCT, payload: item });
    },
    [state]
  );

  const removeItem = useCallback((id: Book['ISBN']) => {
    if (!id) return;

    dispatch({ type: REMOVE_PRODUCT, payload: id });
  }, []);

  const isSaved = useCallback(
    (id: Book['ISBN']) => {
      return state.items.some((i: Book) => i.ISBN === id);
    },
    [state]
  );

  const hasItems = useMemo(() => state.items.length > 0, [state.items]);

  return (
    <ReadListStateContext.Provider
      value={{ items: state.items, isSaved, hasItems, addItem, removeItem }}
    >
      {children}
    </ReadListStateContext.Provider>
  );
};

export function useReadListState() {
  const context = useContext(ReadListStateContext);

  if (!context)
    throw new Error('useReadListState must be used within a ReadListProvider');

  return context;
}
