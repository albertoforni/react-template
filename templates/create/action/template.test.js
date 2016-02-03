/*eslint-env mocha */
import { expect } from 'chai';
// ||| MyComponent -> componentName
import Actions from './MyComponent';
// ||| MyComponent -> componentName
import Constants from '../constants/MyComponent';
import sinon from 'sinon';
// ||| MyComponent -> componentName
import * as API from '../api/MyComponent';

// ||| MyComponent -> componentName
describe('MyComponent', () => {
  describe('.fetching', () => {
    it('creates an action when fetching', () => {
      let expectedAction = {
        type: Constants.FETCHING,
      };

      expect(Actions.fetching()).to.deep.equal(expectedAction);
    });
  });

  describe('.receive', () => {
    it('creates an action when receive', () => {
      let res = [
        { name: 'Alberto' },
      ];

      let expectedAction = {
        type: Constants.RECEIVED,
        res,
      };

      expect(Actions.receive(res)).to.deep.equal(expectedAction);
    });
  });

  describe('.error', () => {
    it('creates an action when there are errors in request', () => {
      let err = 'This is a really bad error';

      let expectedAction = {
        type: Constants.ERROR,
        err,
      };

      expect(Actions.error(err)).to.deep.equal(expectedAction);
    });
  });

  describe('.fetch', () => {
    describe('sync calls', () => {
      beforeEach(() => {
        sinon.stub(API, 'fetch').returns(Promise.resolve());
      });

      afterEach(() => {
        API.fetch.restore();
      });

      it('calls fetching action', () => {
        let dispatch = sinon.spy();
        let expectedAction = {
          type: Constants.FETCHING,
        };

        Actions.fetch()(dispatch);

        expect(dispatch.calledWith(expectedAction)).to.true;
      });

      it('calls receive with the returned response', () => {
        let dispatch = () => {};

        Actions.fetch()(dispatch);
        expect(API.fetch.calledOnce).to.true;
      });
    });

    describe('API call returns with success', () => {
      beforeEach(() => {
        sinon.stub(API, 'fetch').returns(Promise.resolve([
          { name: 'Alberto' },
        ]));
        sinon.spy(Actions, 'receive');
      });

      afterEach(() => {
        Actions.receive.restore();
        API.fetch.restore();
      });

      it('dispatches receive', () => {
        let dispatch = sinon.spy();

        let asyncAction = Actions.fetch();

        return asyncAction(dispatch)
        .then(() => {
          expect(Actions.receive.calledWith([
            { name: 'Alberto' },
          ])).to.true;
        });
      });
    });

    describe('API call returns with error', () => {
      beforeEach(() => {
        sinon.stub(API, 'fetch').returns(Promise.reject([
          { message: 'really bad error' },
        ]));
        sinon.spy(Actions, 'error');
      });

      afterEach(() => {
        Actions.error.restore();
        API.fetch.restore();
      });

      it('dispatches receive', () => {
        let dispatch = sinon.spy();

        let asyncAction = Actions.fetch();

        return asyncAction(dispatch)
        .then(() => {
          expect(Actions.error.calledWith([
            { message: 'really bad error' },
          ])).to.true;
        });
      });
    });
  });
});
