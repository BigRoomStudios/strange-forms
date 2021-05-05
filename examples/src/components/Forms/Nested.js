const { Component } = require('react');
const StrangeForms = require('strange-forms');
const { default: Grid } = require('@material-ui/core/Grid');
const { default: Typography } = require('@material-ui/core/Typography');
const { default: Slider } = require('@material-ui/core/Slider');
const ControlledForm = require('./Controlled'); // Could also be ControlledHook

// In this example we compose ControlledForm into a new controlled form with an additional field.

module.exports = class NestedForm extends StrangeForms(Component) {

    static defaults = {
        // Inherit ControlledForm's defaults, then add additional fields on top.
        ...ControlledForm.defaults,
        temperature: 20
    }

    constructor(...args) {

        super(...args);

        this.strangeForm({
            fields: ['name', 'email', 'spam', 'temperature'],
            get: {
                // Map all the fields of the sub-form, plus our additional field `temperature`.
                name: (props) => props.name ?? NestedForm.defaults.name,
                email: (props) => props.email ?? NestedForm.defaults.email,
                spam: (props) => props.spam ?? NestedForm.defaults.spam,
                temperature: (props) => props.temperature ?? NestedForm.defaults.temperature
            },
            // A act() syncing to props using the consumer's onChange() indicates this is a controlled form.
            act: (field, value) => this.props.onChange({ [field]: value }),
            getFormValue: {
                name: (val) => val,
                email: (val) => val,
                spam: (val) => val,
                temperature: (ev, val) => val
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
            <ControlledForm
                item
                name={this.fieldValue('name')}
                email={this.fieldValue('email')}
                spam={this.fieldValue('spam')}
                onChange={(update) => {
                    // Different field updates may be updated through ControlledForm's onChange(),
                    // so we need to pull out the field dynamically then pass it to proposeNew().

                    //     [field, value]    Object.entries({ [field]: value })
                    const [[field, value]] = Object.entries(update);

                    // Here's the call to proposeNew() with a dynamic field.
                    this.proposeNew(field)(value);
                }}
            />
            <Grid item xs={12} spacing={3}>
                <Typography gutterBottom>
                    Preferred Temperature
                </Typography>
                <Slider
                    min={0}
                    max={100}
                    step={10}
                    marks
                    valueLabelDisplay="auto"
                    value={this.fieldValue('temperature')}
                    onChange={this.proposeNew('temperature')}
                />
            </Grid>
            {children}
        </Grid>;
    }
};
