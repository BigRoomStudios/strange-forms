'use strict';

const internals = {};

// eslint-disable-next-line hapi/hapi-scope-start
module.exports = (superclass) => class extends superclass {

    // Must be called in constructor
    strangeForm({ act, get, fields, getFormValue }) {

        fields = fields || [];
        getFormValue = getFormValue || internals.defaultGetFormValue;

        this._sfOpts = { act, get, getFormValue };

        // For quick field-exists lookups

        this._sfOpts.fieldsMap = fields.reduce((collect, field) => {

            collect[field] = true;
            return collect;
        }, {});

        // Uniquified
        this._sfOpts.fields = Object.keys(this._sfOpts.fieldsMap);

        // Cached proposers
        this._sfProposers = {};

        this.state = this.state || {};

        if (typeof this.props === 'undefined') {
            throw new Error('You gotta pass props in constructor with super(props) when using strange-forms.');
        }

        // Sync current props to state pre-mount, etc.
        Object.assign(this.state, this._sfStatePatch(this.props));
    }

    _sfGet(props, field) {

        let getter = this._sfOpts.get;

        if (typeof getter === 'string') {
            return internals.maybeString(internals.getDeep(props, `${getter}.${field}`));
        }

        if (getter === null) {
            return internals.maybeString(props[field]);
        }

        // Object provides per-field getter (string/func)

        if (typeof getter === 'object') {
            getter = getter[field] || getter['*'];
            if (typeof getter === 'string') {
                // If using the default, append the field to the getter
                const usingDefault = !this._sfOpts.get[field];
                const getterProp = usingDefault ? `${getter}.${field}` : getter;
                return internals.maybeString(internals.getDeep(props, getterProp));
            }
        }

        // If it wasn't a string, it better be a function
        return getter(props, field);
    }

    _sfAct(field, value, ...args) {

        let actor = this._sfOpts.act;

        // Object provides per-field actor (func)

        if (typeof actor === 'object') {
            actor = actor[field] || actor['*'];
        }

        return actor(field, value, ...args);
    }

    // Sync these props to state
    _sfStatePatch(props) {

        return this._sfOpts.fields.reduce((collector, field) => {

            const value = this._sfGet(props, field);

            if (value !== this.fieldValue(field)) {
                collector[internals.prefixed(field)] = value;
            }

            return collector;
        }, {});
    }

    _sfUpdateState(props) {

        this.setState(this._sfStatePatch(props));
    }

    // Sync prop to state when prop changes
    componentWillReceiveProps(nextProps) {

        const hasSuperMethod = !!super.componentWillReceiveProps;

        if (hasSuperMethod) {
            super.componentWillReceiveProps(nextProps);
        }

        this._sfUpdateState(nextProps);
    }

    _sfAssertField(field) {

        if (!this._sfOpts.fieldsMap[field]) {
            throw new Error(`Field "${field}" does not exist in this form.`);
        }
    }

    proposeNew(field, getValue) {

        this._sfAssertField(field);

        // Can we use a cached value?  Only when we use the default getFormValue.

        const cacheable = (typeof getValue === 'undefined');

        if (cacheable && this._sfProposers[field]) {
            return this._sfProposers[field];
        }

        // Okay, we couldn't provide a cached function, carry on...

        getValue = getValue || this._sfOpts.getFormValue;

        // Per-field getFormValue

        if (typeof getValue === 'object') {
            getValue = getValue[field] || getValue['*'];
        }

        const resultFn = (...args) => {

            const value = getValue(...args);

            const state = {};
            state[internals.prefixed(field)] = value;
            this.setState(state);

            this._sfAct(field, value, ...args);
        };

        // Cache result if this is cacheable
        if (cacheable) {
            this._sfProposers[field] = resultFn;
        }

        return resultFn;
    }

    fieldValue(field) {

        this._sfAssertField(field);

        return this.state[internals.prefixed(field)];
    }

    fieldError(field, error) {

        this._sfAssertField(field);

        if (typeof error === 'undefined') {
            error = true; // Default true
        }

        // Props match state, no error

        const propValue = this._sfGet(this.props, field);
        const stateValue = this.fieldValue(field);

        if (propValue === stateValue) {
            return null;
        }

        return (typeof error === 'function') ? error(propValue, stateValue) : error;
    }
};

// To be used for field-props of this.state
internals.prefixed = (field) => `_sf_${field}`;

// Ex.
// getDeep({ a: { b: null } }, 'a.b') === null
// getDeep({ a: { b: 'c' } }, 'a.b') === 'c'
// getDeep({ a: { b: 'c' } }, 'a.b.c') === undefined
internals.getDeep = (obj, deepProp) => {

    return deepProp.split('.').reduce((lastObj, prop) => {

        if (typeof lastObj !== 'object' || lastObj === null) {
            return undefined;
        }

        return lastObj[prop];
    }, obj);
};

internals.defaultGetFormValue = (e) => e.target.value;

internals.maybeString = (val) => {

    if (typeof val === 'undefined' || val === null) {
        return val;
    }

    return String(val);
};
