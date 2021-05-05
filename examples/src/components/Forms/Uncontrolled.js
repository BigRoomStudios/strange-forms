const { Component } = require('react');
const StrangeForms = require('strange-forms');
const { default: Grid } = require('@material-ui/core/Grid');
const { default: TextField } = require('@material-ui/core/TextField');
const { default: FormControlLabel } = require('@material-ui/core/FormControlLabel');
const { default: Checkbox } = require('@material-ui/core/Checkbox');
const SubmitButtonRow = require('./SubmitButtonRow');

module.exports = class UncontrolledForm extends StrangeForms(Component) {

    // These are exported for the benefit of consumers of this form, e.g. to initialize their state prior to form submission.
    static defaults = {
        name: '',
        email: '',
        spam: true
    }

    constructor(...args) {

        super(...args);

        this.strangeForm({
            fields: ['name', 'email', 'spam'],
            get: {
                // Whenever the result of any of these changes, it's synced into local form state.
                // This most notably happens when a new user is selected from the page's dropdown.
                name: (props) => props.name ?? UncontrolledForm.defaults.name,
                email: (props) => props.email ?? UncontrolledForm.defaults.email,
                spam: (props) => props.spam ?? UncontrolledForm.defaults.spam
            },
            // This act() is a no-op because this form is uncontrolled,
            // and we don't need to sync form state to anywhere (e.g. not up to props).
            act: () => null,
            getFormValue: {
                // These pull the form value out of the args passed to proposeNew()
                '*': (ev) => ev.target.value,
                spam: (ev) => ev.target.checked
            }
        });
    }

    handleSubmit = (ev) => {

        ev.preventDefault();

        this.props.onSubmit({
            name: this.fieldValue('name'),
            email: this.fieldValue('email'),
            spam: this.fieldValue('spam')
        });
    }

    render() {

        return <Grid
            container
            spacing={3}
            {...this.props}
            component="form"
            onSubmit={this.handleSubmit}
        >
            <Grid item xs={4}>
                <TextField
                    label="Name"
                    fullWidth
                    variant="outlined"
                    value={this.fieldValue('name')}
                    onChange={this.proposeNew('name')}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    type="email"
                    label="Email"
                    fullWidth
                    variant="outlined"
                    value={this.fieldValue('email')}
                    onChange={this.proposeNew('email')}
                />
            </Grid>
            <Grid item xs={4} container alignItems="center">
                <FormControlLabel
                    label="Send me spam"
                    control={<Checkbox
                        checked={this.fieldValue('spam')}
                        onChange={this.proposeNew('spam')}
                    />}
                />
            </Grid>
            <SubmitButtonRow />
        </Grid>;
    }
};
