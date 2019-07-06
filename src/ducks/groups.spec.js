import reducer, { GROUPS_ADD, GROUPS_REMOVE, GROUPS_UPDATE, addGroup, removeGroup, updateGroup, getGroupsAsArray } from './groups.duck';

jest.mock('uuid/v4', () => ({
  __esModule: true,
  default: () => 'uuid',
}));

describe('groups', () => {
  describe('actions', () => {
    describe(addGroup.name, () => {
      it('creates the action with GROUPS_ADD type', () => {
        const action = addGroup({});
        expect(action.type).toEqual(GROUPS_ADD);
      });

      it('assigns a random ID to the payload', () => {
        const action = addGroup({});
        expect(action.payload).toEqual(
          expect.objectContaining({
            id: 'uuid',
          })
        );
      });

      it('spreads the given group into the payload', () => {
        const group = { foo: 'bar' };
        const action = addGroup(group);
        expect(action.payload).toEqual(expect.objectContaining(group));
      });
    });

    describe(removeGroup.name, () => {
      it('creates the action with GROUPS_REMOVE type', () => {
        const action = removeGroup('foo');
        expect(action.type).toEqual(GROUPS_REMOVE);
      });

      it('creates the action with the given groupId as payload', () => {
        const action = removeGroup('foo');
        expect(action.payload).toEqual('foo');
      });
    });

    describe(updateGroup.name, () => {
      it('creates the action with GROUPS_UPDATE type', () => {
        const action = updateGroup({});
        expect(action.type).toEqual(GROUPS_UPDATE);
      });

      it('creates the action with the given group as payload', () => {
        const group = { foo: 'bar' };
        const action = updateGroup(group);
        expect(action.payload).toEqual(group);
      });
    });
  });

  describe(reducer.name, () => {
    describe(GROUPS_ADD, () => {
      it('adds the group to the state', () => {
        const group = { foo: 'bar' };
        const action = addGroup(group);
        const state = reducer({}, action);
        expect(state).toEqual({
          uuid: expect.objectContaining(group),
        });
      });
    });

    describe(GROUPS_REMOVE, () => {
      it('does nothing if the given group is not in the state', () => {
        const initialState = { bar: 'baz' };
        const action = removeGroup('foo');
        const state = reducer(initialState, action);
        expect(state).toEqual(initialState);
      });

      it('removes the group identified by the action group ID', () => {
        const initialState = { bar: 'baz' };
        const action = removeGroup('bar');
        const state = reducer(initialState, action);
        expect(state).toEqual({});
      });
    });

    describe(GROUPS_UPDATE, () => {
      it('sets the group to the state', () => {
        const group = { id: 'uuid', foo: 'bar' };
        const action = updateGroup(group);
        const state = reducer({}, action);
        expect(state).toEqual({
          uuid: group,
        });
      });
    });
  });

  describe('selectors', () => {
    describe(getGroupsAsArray.name, () => {
      it('returns an empty array if there are no groups in the state', () => {
        const groups = getGroupsAsArray({ groups: {} });
        expect(groups).toEqual([]);
      });

      it('returns the groups in the state as an array', () => {
        const state = {
          groups: {
            foo: {
              bar: 'baz',
            },
            bar: {
              baz: 'qux',
            },
          },
        };
        const groups = getGroupsAsArray(state);
        expect(groups).toEqual([{ bar: 'baz' }, { baz: 'qux' }]);
      });
    });
  });
});
