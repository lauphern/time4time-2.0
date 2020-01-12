import React from 'react';
    import Proptypes from 'prop-types';

    // TODO borrar este component
    const Dialog = props => {
      const { userId, handleInput, connectToChatkit} = props;

      return (
        <div>
          <div>
            <form onSubmit={connectToChatkit}>
              <label htmlFor="username">
                Enter your username
              </label>
              <input
                id="username"
                autoFocus
                type="text"
                name="userId"
                value={userId}
                onChange={handleInput}
                placeholder="Enter your username"
              />
              <button type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      );
    };

    Dialog.propTypes = {
      userId: Proptypes.string.isRequired,
      handleInput: Proptypes.func.isRequired,
      connectToChatkit: Proptypes.func.isRequired,
    };

    export default Dialog;