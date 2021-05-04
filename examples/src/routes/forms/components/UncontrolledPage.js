const { useState } = require('react');
const FormValuesLayout = require('./FormValuesLayout');
const UncontrolledForm = require('../../../components/Forms/Uncontrolled');
const { default: Grid } = require('@material-ui/core/Grid');
const { default: Select } = require('@material-ui/core/Select');
const { default: MenuItem } = require('@material-ui/core/MenuItem');

const internals = {};

module.exports = function UncontrolledPage() {

    const { users } = internals;
    const [edit, setEdit] = useState('');
    const [values, setValues] = useState({ ...UncontrolledForm.defaults, submitted: false });

    return <FormValuesLayout values={values}>
        <Grid container spacing={3}>
            <Grid item>
                <Select
                    displayEmpty
                    value={edit}
                    onChange={(ev) => {

                        const id = ev.target.value;
                        const user = users[id] || UncontrolledForm.defaults;

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
        <UncontrolledForm
            {...values}
            onSubmit={(result) => setValues({ ...result, submitted: true })}
        />
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
