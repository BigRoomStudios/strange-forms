const { Component } = require('react');
const StrangeForms = require('strange-forms');
const { default: Grid } = require('@material-ui/core/Grid');
const { default: TextField } = require('@material-ui/core/TextField');

module.exports = class ControlledForm extends StrangeForms(Component) {

    constructor(...args) {

        super(...args);

        this.strangeForm({
            fields: ['name', 'email', 'spam']
        });
    }

    render() {

        return <Grid container>
            <Grid item xs={4}>
                <TextField
                    label="Name"
                    variant="outlined"
                    value={this.fieldValue('name')}
                    onChange={this.proposeNew('name')}
                />
            </Grid>
            <Grid item xs={4}>
                <TextField
                    label="Email"
                    variant="outlined"
                    value={this.fieldValue('email')}
                    onChange={this.proposeNew('email')}
                />
            </Grid>
            <Grid item xs={4}>
                <FormControlLabel
                    label="Send me spam"
                    control={<Checkbox
                        checked={this.fieldValue('spam')}
                        onChange={this.proposeNew('spam')}
                    />}
                />
            </Grid>
        </Grid>;
    }
};
