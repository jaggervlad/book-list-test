import { useLocalStorage } from '@/hooks/use-local-storage';
import { Book } from '@/types/books';
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';

interface ItemCart extends Book {
  count: number;
}

interface InitialState {
  cartItems: ItemCart[];
}

interface CartProviderState extends InitialState {
  addItem: (item: ItemCart) => void;
  removeItem: (id: ItemCart['ISBN']) => void;
  increaseItem: (id: ItemCart['ISBN']) => void;
  decreaseItem: (id: ItemCart['ISBN']) => void;
  isInCart: (id: ItemCart['ISBN']) => boolean;
  hasItems: boolean;
  total: number;
}

const ADD_ITEM_CART = 'ADD_ITEM_CART';
const REMOVE_ITEM_CART = 'REMOVE_ITEM_CART';
const INCREASE_ITEM = 'INCREASE_ITEM';
const DECREASE_ITEM = 'DECREASE_ITEM';

type Actions =
  | { type: typeof ADD_ITEM_CART; payload: ItemCart }
  | { type: typeof REMOVE_ITEM_CART; payload: ItemCart['ISBN'] }
  | { type: typeof INCREASE_ITEM; payload: ItemCart['ISBN'] }
  | { type: typeof DECREASE_ITEM; payload: ItemCart['ISBN'] };

export const CartContext = createContext<CartProviderState>(null);

const initialState: InitialState = {
  cartItems: [],
};

const reducer = (state: CartProviderState, { type, payload }: Actions) => {
  switch (type) {
    case ADD_ITEM_CART:
      return { ...state, cartItems: [...state.cartItems, payload] };

    case REMOVE_ITEM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((c) => c.ISBN !== payload),
      };

    case INCREASE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.map((c) => {
          if (c.ISBN === payload) {
            return { ...c, count: c.count + 1 };
          }

          return c;
        }),
      };
    case DECREASE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.map((c) => {
          if (c.ISBN === payload && c.count > 0) {
            return { ...c, count: c.count - 1 };
          }

          return c;
        }),
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useLocalStorage(
    'cart-items',
    JSON.stringify(initialState)
  );

  const [state, dispatch] = useReducer(reducer, JSON.parse(cartItems));

  useEffect(() => {
    setCartItems(JSON.stringify(state));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const addItem = useCallback(
    (item: ItemCart) => {
      if (!item.ISBN) return;

      const existing = state.cartItems.find((c) => c.ISBN === item.ISBN);

      if (existing) {
        return dispatch({ type: REMOVE_ITEM_CART, payload: existing.ISBN });
      }

      dispatch({ type: ADD_ITEM_CART, payload: item });
    },
    [state]
  );

  const removeItem = useCallback(
    (id: ItemCart['ISBN']) => {
      if (!id) return;

      const existing = state.cartItems.find((c) => c.ISBN === id);

      if (existing) {
        return dispatch({ type: REMOVE_ITEM_CART, payload: existing.ISBN });
      }
    },
    [state]
  );

  const increaseItem = useCallback(
    (id: ItemCart['ISBN']) => {
      if (!id) return;

      const existing = state.cartItems.find((c) => c.ISBN === id);

      if (existing) {
        dispatch({ type: INCREASE_ITEM, payload: id });
      }
    },
    [state]
  );
  const decreaseItem = useCallback(
    (id: ItemCart['ISBN']) => {
      if (!id) return;

      const existing = state.cartItems.find((c) => c.ISBN === id);

      if (existing && existing.count === 1) {
        return dispatch({ type: REMOVE_ITEM_CART, payload: id });
      }

      if (existing) {
        return dispatch({ type: DECREASE_ITEM, payload: id });
      }
    },
    [state]
  );

  const isInCart = useCallback(
    (id: Book['ISBN']) => {
      return state.cartItems.some((i: Book) => i.ISBN === id);
    },
    [state]
  );

  const hasItems = useMemo(() => state.cartItems.length > 0, [state.cartItems]);
  const total = useMemo(
    () => state.cartItems.reduce((acc, el) => (acc += el.count * 5), 0),
    [state.cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        hasItems,
        total,
        removeItem,
        increaseItem,
        decreaseItem,
        isInCart,
        addItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error('useCart debe ser usando dentro de CartContext');
  }

  return cartContext;
}
