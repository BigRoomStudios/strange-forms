const { Component } = require('react');
const StrangeForms = require('strange-forms');
const { default: Grid } = require('@material-ui/core/Grid');
const { default: Typography } = require('@material-ui/core/Typography');
const { default: Slider } = require('@material-ui/core/Slider');
const ControlledForm = require('./Controlled');

module.exports = class NestedForm extends StrangeForms(Component) {

    static defaults = {
        ...ControlledForm.defaults,
        temperature: 20
    }

    constructor(...args) {

        super(...args);

        this.strangeForm({
            fields: ['name', 'email', 'spam', 'temperature'],
            get: {
                // TODO sync down
                name: (props) => (props.name ?? NestedForm.defaults.name),
                email: (props) => (props.email ?? NestedForm.defaults.email),
                spam: (props) => (props.spam ?? NestedForm.defaults.spam),
                temperature: (props) => (props.temperature ?? NestedForm.defaults.temperature)
            },
            // TODO sync up
            act: (field, value) => this.props.onChange({ [field]: value }),
            getFormValue: {
                name: (val) => val,
                email: (val) => val,
                spam: (val) => val,
                temperature: (_, val) => val
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

                    const [[field, value]] = Object.entries(update);

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
