const { Component } = require('react');
const StrangeForms = require('strange-forms');
const { default: Grid } = require('@material-ui/core/Grid');
const { default: Checkbox } = require('@material-ui/core/Checkbox');
const { default: TextField } = require('@material-ui/core/TextField');

module.exports = class ConstraintsForm extends StrangeForms(Component) {

    static defaults = {
        maxChecked: 3,
        checkA: false,
        checkB: false,
        checkC: false,
        checkD: false,
        checkE: false,
        checkF: false
    }

    constructor(...args) {

        super(...args);

        const checkFields = ['checkA', 'checkB', 'checkC', 'checkD', 'checkE', 'checkF'].reverse();

        const getFieldValue = (f) => this.fieldValue(f);
        const sum = (a, b) => a + b;
        const totalChecked = () => checkFields.map(getFieldValue).map(Number).reduce(sum, 0);
        const constrainChecks = (diff) => {

            const update = {};

            for (let i = 0; i < checkFields.length && diff > 0; ++i) {
                const checkField = checkFields[i];
                if (getFieldValue(checkField)) {
                    diff--;
                    update[checkField] = false;
                }
            }

            return update;
        };

        this.strangeForm({
            fields: ['maxChecked', ...checkFields],
            get: (props, field) => props[field] ?? ConstraintsForm.defaults[field],
            act: {
                '*': (field, value) => {

                    const diff = totalChecked() - getFieldValue('maxChecked');

                    this.props.onChange({
                        [field]: value,
                        ...constrainChecks(diff + (value ? 1 : 0))
                    });
                },
                maxChecked: (_, maxChecked) => {

                    const diff = totalChecked() - maxChecked;

                    this.props.onChange({
                        maxChecked,
                        ...constrainChecks(diff)
                    });
                }
            },
            getFormValue: {
                '*': (ev) => ev.target.checked,
                maxChecked: (ev) => ev.target.value
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
                    type="number"
                    label="Max Checked"
                    fullWidth
                    variant="outlined"
                    inputProps={{ min: 1, max: 5 }}
                    value={this.fieldValue('maxChecked')}
                    onChange={this.proposeNew('maxChecked')}
                />
            </Grid>
            <Grid item xs={2} />
            <Grid item xs={1} container justify="center">
                <Checkbox
                    checked={this.fieldValue('checkA')}
                    onChange={this.proposeNew('checkA')}
                />
            </Grid>
            <Grid item xs={1} container justify="center">
                <Checkbox
                    checked={this.fieldValue('checkB')}
                    onChange={this.proposeNew('checkB')}
                />
            </Grid>
            <Grid item xs={1} container justify="center">
                <Checkbox
                    checked={this.fieldValue('checkC')}
                    onChange={this.proposeNew('checkC')}
                />
            </Grid>
            <Grid item xs={1} container justify="center">
                <Checkbox
                    checked={this.fieldValue('checkD')}
                    onChange={this.proposeNew('checkD')}
                />
            </Grid>
            <Grid item xs={1} container justify="center">
                <Checkbox
                    checked={this.fieldValue('checkE')}
                    onChange={this.proposeNew('checkE')}
                />
            </Grid>
            <Grid item xs={1} container justify="center">
                <Checkbox
                    checked={this.fieldValue('checkF')}
                    onChange={this.proposeNew('checkF')}
                />
            </Grid>
            {children}
        </Grid>;
    }
};
