const { useState, useEffect } = require('react');

const internals = {};

// This is a hookified version of strange-forms, just to demonstrate its internals succinctly.

exports.useField = function useField(
    get,
    {
        act = internals.defaultAct,
        getFormValue = internals.defaultGetFormValue
    } = {}
) {

    // Setup local form state based on some external state.
    const [fieldValue, setFieldValue] = useState(get);

    // When external state changes, sync it to local form state.
    useEffect(() => setFieldValue(get), [get]);

    // When updating a field...
    const proposeNew = (event) => {

        // ...map the component/DOM event to a value...
        const val = getFormValue(event);

        // ...then attempt to sync that value to external state (e.g. props), and sync it to local form state.
        act(val);
        setFieldValue(val);
    };

    // Return local form state, and a handler to propose a new value.
    return [fieldValue, proposeNew];
};

// A note on the above 👆
// Notice that if the external state doesn't accept the value, it will still be reflected in local form state.
// The term "propose" is used due to this fact that it may not be accepted. This can be useful to allow the
// user to input disallowed values temporarily, e.g. when you type an email the first character isn't going to
// generate a valid email address. The external state also may not update at all while changing field values,
// as in any uncontrolled form!

internals.defaultAct = () => null;

internals.defaultGetFormValue = (ev) => ev.target.value;
