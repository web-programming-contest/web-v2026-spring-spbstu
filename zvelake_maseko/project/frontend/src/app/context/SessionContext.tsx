import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { sessionInterface } from '../data/session';

interface SessionContextType {
    user: sessionInterface | undefined;
    cartId: string | null;
    setCartId: (cartId: string) => void;
    setUser: (data: sessionInterface) => void,
    removeUser: () => void,
    removeCartId: () => void
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: {children: ReactNode}){
    const [user, setUser] = useState<sessionInterface|undefined>(undefined);
    const [cartId, setCartId] = useState<string | null>(sessionStorage.getItem('user:cart_id'))

    useEffect(()=>{
        const stored = sessionStorage.getItem('user');
        if(stored){
            setUser(JSON.parse(stored) as sessionInterface)
        }
    }, []);

    const removeUser = () => {
        setUser(undefined);
    }

    const removeCartId = () => {
        setCartId(null);
    }
    
    return (<SessionContext.Provider
        value={{
            user,
            cartId,
            setCartId,
            setUser,
            removeUser,
            removeCartId
        }}
        >
        {children}
    </SessionContext.Provider>)
}

export function useSession(){
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
}