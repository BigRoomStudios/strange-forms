const { useState, useEffect } = require('react');

const internals = {};

// This is a hookified version of strange-forms, just to demonstrate its internals succinctly.

exports.useField = function useField(
    get,
    {
        act = internals.defaultAct,
        getFormValue = internals.defaultGetFormValue
    } = {},
    deps
) {

    const [fieldValue, setFieldValue] = useState(get);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setFieldValue(get), deps || [get]);

    const proposeNew = (event) => {

        const val = getFormValue(event);

        act(val);
        setFieldValue(val);
    };

    return [fieldValue, proposeNew];
};

internals.defaultGetFormValue = (ev) => ev.target.value;

internals.defaultAct = () => null;
