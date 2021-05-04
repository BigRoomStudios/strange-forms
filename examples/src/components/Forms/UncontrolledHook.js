const T = require('prop-types');
const { default: Grid } = require('@material-ui/core/Grid');
const { default: TextField } = require('@material-ui/core/TextField');
const { default: FormControlLabel } = require('@material-ui/core/FormControlLabel');
const { default: Checkbox } = require('@material-ui/core/Checkbox');
const { useField } = require('./useField');
const SubmitButtonRow = require('./SubmitButtonRow');

module.exports = function UncontrolledHookForm({ name, email, spam, onSubmit, children, ...others }) {

    const { defaults } = UncontrolledHookForm;

    const [fieldValueName, proposeNewName] = useField(name ?? defaults.name);

    const [fieldValueEmail, proposeNewEmail] = useField(email ?? defaults.email);

    const [fieldValueSpam, proposeNewSpam] = useField(spam ?? defaults.spam, {
        getFormValue: (ev) => ev.target.checked
    });

    return <Grid
        container
        spacing={3}
        {...others}
        component="form"
        onSubmit={(ev) => {

            ev.preventDefault();

            onSubmit({
                name: fieldValueName,
                email: fieldValueEmail,
                spam: fieldValueSpam
            });
        }}
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
        <SubmitButtonRow />
    </Grid>;
};

module.exports.propTypes = {
    name: T.string,
    email: T.string,
    spam: T.bool,
    onSubmit: T.func.isRequired,
    children: T.any
};

module.exports.defaults = {
    name: '',
    email: '',
    spam: true
};
