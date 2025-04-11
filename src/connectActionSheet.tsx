import hoistNonReactStatic from 'hoist-non-react-statics';
import * as React from 'react';

import { Consumer } from './context';
import { ActionSheetProps } from './types';

export default function connectActionSheet<OwnProps = any>(
  WrappedComponent: React.ComponentType<OwnProps & ActionSheetProps>
): React.FunctionComponent<OwnProps> {
  const ConnectedActionSheet = (props: OwnProps) => {
    return (
      <Consumer>
        {({ showActionSheetWithOptions, dismissActionSheet }) => {
          return (
            <WrappedComponent
              {...props}
              showActionSheetWithOptions={showActionSheetWithOptions}
              dismissActionSheet={dismissActionSheet}
            />
          );
        }}
      </Consumer>
    );
  };

  return hoistNonReactStatic(ConnectedActionSheet, WrappedComponent);
}
