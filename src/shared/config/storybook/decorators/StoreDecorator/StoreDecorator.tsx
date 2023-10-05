import { StoryFn } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

export const StoreDecorator = (
  initialState: DeepPartial<StateSchema>,
  asyncReducers?: ReducersList,
) => (Story: StoryFn) => (
  <StoreProvider
    initialState={initialState}
    asyncReducers={{ ...asyncReducers }}
  >
    <Story />
  </StoreProvider>
);
