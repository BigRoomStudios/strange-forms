const { useState } = require('react');
const FormValuesLayout = require('./FormValuesLayout');
const ControlledForm = require('../../../components/Forms/Controlled');
const SubmitButtonRow = require('../../../components/Forms/SubmitButtonRow');
const { default: Grid } = require('@material-ui/core/Grid');
const { default: Select } = require('@material-ui/core/Select');
const { default: MenuItem } = require('@material-ui/core/MenuItem');

const internals = {};

module.exports = function ControlledPage() {

    const { users } = internals;
    const [edit, setEdit] = useState('');
    const [values, setValues] = useState({ ...ControlledForm.defaults, submitted: false });

    return <FormValuesLayout values={values}>
        <Grid container spacing={3}>
            <Grid item>
                <Select
                    displayEmpty
                    value={edit}
                    onChange={(ev) => {

                        const id = ev.target.value;
                        const user = users[id] || ControlledForm.defaults;

                        setEdit(id);
                        setValues({ ...user, submitted: false });
                    }}
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="devin">{users.devin.name}</MenuItem>
                    <MenuItem value="cal">{users.cal.name}</MenuItem>
                </Select>
            </Grid>
        </Grid>
        <ControlledForm
            {...values}
            component="form"
            onChange={(updated) => setValues({ ...values, ...updated, submitted: false })}
            onSubmit={(ev) => {

                ev.preventDefault();

                setValues({ ...values, submitted: true });
            }}
        >
            <SubmitButtonRow />
        </ControlledForm>
    </FormValuesLayout>;
};

internals.users = {
    devin: {
        name: 'Devin',
        email: 'd@evin.com',
        spam: true
    },
    cal: {
        name: 'Cal',
        email: 'c@al.com',
        spam: false
    }
};
