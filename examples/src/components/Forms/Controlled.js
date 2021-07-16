const { Component } = require('react');
const StrangeForms = require('strange-forms');
const { default: Grid } = require('@material-ui/core/Grid');
const { default: TextField } = require('@material-ui/core/TextField');
const { default: FormControlLabel } = require('@material-ui/core/FormControlLabel');
const { default: Checkbox } = require('@material-ui/core/Checkbox');

module.exports = class ControlledForm extends StrangeForms(Component) {

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
                // This most notably happens when a prop is updated via act(), e.g. on each keystroke.
                name: (props) => props.name ?? ControlledForm.defaults.name,
                email: (props) => props.email ?? ControlledForm.defaults.email,
                spam: (props) => props.spam ?? ControlledForm.defaults.spam
            },
            // This act() syncs field value changes to props through onChange() provided by the consumer.
            act: (field, value) => this.props.onChange({ [field]: value }),
            getFormValue: {
                // These pull the form value out of the args passed to proposeNew()
                '*': (ev) => ev.target.value,
                spam: (ev) => ev.target.checked
            }
        });
    }

    render() {

        const { children, ...others } = this.props;

        return <Grid
            container
            spacing={3}
            {...others}
            onChange={null}
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
            {children}
        </Grid>;
    }
};
