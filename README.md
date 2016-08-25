# strange-forms

Redux/React toolkit for forms

[![Build Status](https://travis-ci.org/BigRoomStudios/strange-forms.svg?branch=master)](https://travis-ci.org/BigRoomStudios/strange-forms)
[![Coverage Status](https://coveralls.io/repos/BigRoomStudios/strange-forms/badge.svg?branch=master&service=github)](https://coveralls.io/github/BigRoomStudios/strange-forms?branch=master)

## Usage
This is a toolkit for using forms with React and Redux.  Specifically, this is meant to help create components containing forms that attempt to update and reflect application state.  The special thing about this library is that it assumes the value displayed in a form may deviate from the current value in state, and this library does not rely on any special coordination with actions/reducers as in [react-redux-form](https://github.com/davidkpiano/react-redux-form).  When there's a discrepancy between a value in the form and a value in state, it can be recognized an invalid field in the form– this simple fact allows validation to occur solely in the reducer if desired (where it belongs!).

### Example
```js
const React = require('react');
const StrangeForms = require('strange-forms');

module.exports = class extends StrangeForms(React.Component) {

    constructor(props) {

        // In this example assume props have shape,
        // { person: { name, age }, occupation: { position, seasonal }}

        // Make sure to pass props to super().
        super(props);

        // This must be called in the constructor
        this.strangeForm({
            // Declare the interesting fields.
            fields: ['name', 'age', 'position', 'seasonal'],
            // Obtain a form field value from props.
            // Can also be a single string, single function, or null (see API docs).
            get: {
                name: (someProps) => someProps.person.firstName,
                age: 'person.age', // Stringified someProps.person.age
                '*': (someProps, field) => someProps.occupation[field] // Catch-all for other fields
            },
            // Also takes per-field format similar to get.
            act: this.act.bind(this),
            // Defaults to (e) => e.target.value.  Also takes per-field format similar to get.
            getFormValue: this.getFormValue.bind(this)
        });
    }

    getFormValue(e) {

        // Just an example of a custom handler that applies a default.
        return e.target.value || '';
    }

    act(field, value) {

        // You'll probably end-up calling an action
        // here to try to update a field with a value.
        // The value comes from getFormValue when the
        // proposeNew()-generated handler is called.
        this.props.updateFieldAction(field, value);
    }

    invalid() {

        return ['name', 'age', 'position', 'seasonal'].some((field) => {

            // By default returns true if the field is invalid.
            return this.fieldError(field);
        });
    }

    render() {

        return <div>

            {this.invalid() && <span>Bad value somewhere!</span>}

            Name:
            <input
                type="text"
                // Reflects in local component state.
                value={this.fieldValue('name')}
                // Updates local component state and calls act, all using getFormValue option.
                onChange={this.proposeNew('name')}
            />

            Age:
            <input
                type="text"
                value={this.fieldValue('age')}
                onChange={this.proposeNew('age')}
            />

            Position:
            <input
                type="text"
                value={this.fieldValue('position')}
                onChange={this.proposeNew('position')}
            />

            Seasonal:
            <input
                type="checkbox"
                checked={this.fieldValue('seasonal')}
                onChange={this.proposeNew('seasonal')}
            />

        </div>;
    }
};
```

## API
### `StrangeForms(superclass)`
Returns a new class extending `superclass` (which should be an instance of `React.Component`) endowed with the following methods,

#### `component.strangeForm(options)`
This must be called in the component's constructor, and that constructor must have access to component props by calling `super(props)`.  These `options` define the behavior of the component as a strange-form,
 - `fields` - an array of form field names.  Defaults to an empty array.
 - `get` - defines how fields values are mapped from component properties.  Should be specified as either,
   - a function with signature `function(props, field)` that returns a form field value.
   - a string (e.g. `'user.store'`) that defines a path into component properties where there's an object mapping field names to values.  In this case the result will be stringified.
   - `null`, which specifies that field values live directly on props.  In this case the result will be stringified.
   - an object whose keys are field names and whose values are field-specific functions or strings as defined above.  Note, if a string is specified it needs to provide the _complete_ path to the value within component props.  A key `'*'` may be used to define a catch-all.
 - `act` - defines how application-wide updates are made to state given a field and a new form value for that field.  Should be specified as either,
   - a function with signature `function(field, value, ...args)`, where `args` are additional arguments passed to a [`component.proposeNew()`](#componentproposenewfield-getformvalue)-generated handler.
   - an object whose keys are field names and whose values are field-specific functions as defined above.  A key `'*'` may be used to define a catch-all.
 - `getFormValue` - defines a default `getFormValue` to be used by [`component.proposeNew()`](#componentproposenewfield-getformvalue).  It should be a function or object specifying functions per field, similar to `act` and `get`.  Defaults to `(e) => e.target.value`.  See [`component.proposeNew()`](#componentproposenewfield-getformvalue) for further description of its usage.

#### `component.fieldValue(field)`
Returns the field value that should display in the component.

#### `component.fieldError(field, [error])`
Returns `error` if the current value displaying in the component does not match (`===`) the value found in component props.  The `error` parameter defaults to `true`.  If `error` is specified as a function `function(displayValue, propValue)` the result of that function will be returned.

#### `component.proposeNew(field, [getFormValue])`
Returns a function `function(...anyArgs)` that uses the latest form value for `field` to update local component state and perform `act(field, value, ...anyArgs)`.  The latest form value will be determined by `getFormValue(...anyArgs)`, where `getFormValue` defaults to the value specified in [`component.strangeForm(options)`](#componentstrangeformoptions).  If `getFormValue` is an object, it may specify the function to use on a per-field basis, where the key `'*'` may be used as a catch-all.

When not using the `getFormValue` argument, the result of this function is cached on a per-field basis.  The reason for that is to allow usage of `proposeNew()` inside a component's `render()` (similar to the [example](#example)) without concern about creating new function references.

#### `component.componentWillReceiveProps(nextProps)`
This is a lifecycle method used by React, and is not meant to be called manually.  Internally strange-forms extends the method in order to update the displayed form values (which live in local component state) when new props are incoming.
