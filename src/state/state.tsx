import React, {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  Reducer,
  ReactElement,
} from "react";
import { Patient, Gender, Diagnosis, Action } from "../types";
export type State = {
  patients: { [id: string]: Patient };
  patient: Patient;
  diagnosis: Diagnosis[];
};

const initialState: State = {
  patients: {},
  patient: {
    id: "",
    name: "",
    ssn: "",
    occupation: "",
    dateOfBirth: "",
    gender: Gender.Other,
    entries: [],
  },
  diagnosis: [],
};

export const StateContext = createContext<[State, Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  reducer: Reducer<State, Action>;
  children: ReactElement;
};

export const StateProvider = ({ reducer, children }: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
