import { createContext } from "react";
import { shoes } from './shoes.data';

const CollectionContext = createContext(shoes);

export default CollectionContext;