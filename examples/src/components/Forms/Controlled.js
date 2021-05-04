const { Component } = require('react');
const StrangeForms = require('strange-forms');
const { default: Grid } = require('@material-ui/core/Grid');
const { default: TextField } = require('@material-ui/core/TextField');
const { default: FormControlLabel } = require('@material-ui/core/FormControlLabel');
const { default: Checkbox } = require('@material-ui/core/Checkbox');

module.exports = class UncontrolledForm extends StrangeForms(Component) {

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
                // TODO sync down
                name: (props) => (props.name ?? UncontrolledForm.defaults.name),
                email: (props) => (props.email ?? UncontrolledForm.defaults.email),
                spam: (props) => (props.spam ?? UncontrolledForm.defaults.spam)
            },
            // TODO sync up
            act: (field, value) => this.props.onChange({ [field]: value }),
            getFormValue: {
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
