const T = require('prop-types');
const { default: Grid } = require('@material-ui/core/Grid');
const { default: TextField } = require('@material-ui/core/TextField');
const { default: FormControlLabel } = require('@material-ui/core/FormControlLabel');
const { default: Checkbox } = require('@material-ui/core/Checkbox');
const { useField } = require('./useField');

module.exports = function ControlledHookForm({ name, email, spam, onChange, children, ...others }) {

    const syncToProp = (field) => {

        return (value) => onChange({ [field]: value });
    };

    const { defaults } = ControlledHookForm;

    const [fieldValueName, proposeNewName] = useField(name ?? defaults.name, {
        act: syncToProp('name')
    });

    const [fieldValueEmail, proposeNewEmail] = useField(email ?? defaults.email, {
        act: syncToProp('email')
    });

    const [fieldValueSpam, proposeNewSpam] = useField(spam ?? defaults.spam, {
        act: syncToProp('spam'),
        getFormValue: (ev) => ev.target.checked
    });

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
                value={fieldValueName}
                onChange={proposeNewName}
            />
        </Grid>
        <Grid item xs={4}>
            <TextField
                type="email"
                label="Email"
                fullWidth
                variant="outlined"
                value={fieldValueEmail}
                onChange={proposeNewEmail}
            />
        </Grid>
        <Grid item xs={4} container alignItems="center">
            <FormControlLabel
                label="Send me spam"
                control={<Checkbox
                    checked={fieldValueSpam}
                    onChange={proposeNewSpam}
                />}
            />
        </Grid>
        {children}
    </Grid>;
};

module.exports.propTypes = {
    name: T.string,
    email: T.string,
    spam: T.bool,
    onChange: T.func.isRequired,
    children: T.any
};

module.exports.defaults = {
    name: '',
    email: '',
    spam: true
};
