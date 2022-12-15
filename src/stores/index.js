import React, {useState, useEffect, Fragment} from 'react';
import {Provider} from 'mobx-react';

import RootStore from './rootStore';

async function createRootStore(setRootStore) {
  const rootStore = await RootStore.create({});
  setRootStore(rootStore);
}
const StoreProvider = ({children}) => {
  const [rootStore, setRootStore] = useState(null);
  useEffect(() => {
    if (rootStore === null) {
      createRootStore(setRootStore);
    }
  }, [rootStore]);
  return (
    !!rootStore && (
      <Provider rootStore={rootStore} {...rootStore}>
        {children}
      </Provider>
    )
  );
};
export default StoreProvider;
