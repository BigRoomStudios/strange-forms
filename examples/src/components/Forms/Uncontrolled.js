const { Component } = require('react');
const StrangeForms = require('strange-forms');
const { default: Grid } = require('@material-ui/core/Grid');
const { default: TextField } = require('@material-ui/core/TextField');
const { default: Button } = require('@material-ui/core/Button');
const { default: FormControlLabel } = require('@material-ui/core/FormControlLabel');
const { default: Checkbox } = require('@material-ui/core/Checkbox');

module.exports = class UncontrolledForm extends StrangeForms(Component) {

    constructor(...args) {

        super(...args);

        this.strangeForm({
            fields: ['name', 'email', 'spam'],
            get: {
                // These returned values never change, so this
                // simply sets a default value for each field.
                name: () => '',
                email: () => '',
                spam: () => true
            },
            // This act() is a no-op because this form is uncontrolled,
            // and we don't need to sync form state anywhere (e.g. not up to props).
            act: () => null,
            getFormValue: {
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

    render(props) {

        return <Grid
            container
            spacing={3}
            {...props}
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
            <Grid item xs={12} container justify="center">
                <Button type="submit" variant="outlined" color="primary">Submit</Button>
            </Grid>
        </Grid>;
    }
};
