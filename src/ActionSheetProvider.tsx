import * as React from 'react';

// NativeActionSheet will always be custom when on Android/web
import NativeActionSheet from './ActionSheet';
import CustomActionSheet from './ActionSheet/CustomActionSheet';
import { Provider } from './context';
import { ActionSheetOptions, ActionSheetProviderRef } from './types';

interface Props {
  children: React.ReactNode;
  useNativeDriver?: boolean;
  useCustomActionSheet?: boolean;
}

export default React.forwardRef<ActionSheetProviderRef, Props>(function ActionSheetProvider(
  { children, useNativeDriver, useCustomActionSheet = false },
  ref
) {
  const actionSheetRef = React.useRef<NativeActionSheet>(null);

  const context = React.useMemo(
    () => ({
      showActionSheetWithOptions: (options: ActionSheetOptions, callback: (i: number) => void) => {
        if (actionSheetRef.current) {
          actionSheetRef.current.showActionSheetWithOptions(options, callback);
        }
      },
      dismissActionSheet: () => {
        if (actionSheetRef.current) {
          actionSheetRef.current.dismissActionSheet();
        }
      },
    }),
    [actionSheetRef]
  );

  React.useImperativeHandle(
    ref,
    () => ({
      // backwards compatible with 13.x before context was being passed right on the ref
      getContext: () => context,
      showActionSheetWithOptions: context.showActionSheetWithOptions,
      dismissActionSheet: context.dismissActionSheet,
    }),
    [context]
  );

  const ActionSheet = React.useMemo(
    () => (useCustomActionSheet ? CustomActionSheet : NativeActionSheet),
    [useCustomActionSheet]
  );

  return (
    <Provider value={context}>
      <ActionSheet ref={actionSheetRef} useNativeDriver={useNativeDriver}>
        {React.Children.only(children)}
      </ActionSheet>
    </Provider>
  );
});
