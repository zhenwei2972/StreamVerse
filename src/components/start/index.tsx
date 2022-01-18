import { FluentThemeProvider, DEFAULT_COMPONENT_ICONS } from '@azure/communication-react';
import { registerIcons } from '@fluentui/react';
import { CallingComponents } from './callingcomponents';
import React from 'react';

function StartPage(): JSX.Element {
  // If you don't want to provide custom icons, you can register the default ones included with the library.
  // This will ensure that all the icons are rendered correctly.

  registerIcons({ icons: DEFAULT_COMPONENT_ICONS });

  return (
    <FluentThemeProvider>
      <CallingComponents />
    </FluentThemeProvider>
  );
}
export default StartPage;