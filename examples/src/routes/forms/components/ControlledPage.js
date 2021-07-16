const { useState } = require('react');
const { Link } = require('react-router-dom');
const FormValuesLayout = require('./FormValuesLayout');
const ControlledForm = require('../../../components/Forms/Controlled'); // Could also be ControlledHook
const SubmitButtonRow = require('../../../components/Forms/SubmitButtonRow');
const { default: Grid } = require('@material-ui/core/Grid');
const { default: Select } = require('@material-ui/core/Select');
const { default: MenuItem } = require('@material-ui/core/MenuItem');
const { default: Typography } = require('@material-ui/core/Typography');
const FormExplainer = require('./FormExplainer');

const internals = {};

module.exports = function ControlledFormPage() {

    const { Explainer, users } = internals;
    const [edit, setEdit] = useState('');
    const [values, setValues] = useState({ ...ControlledForm.defaults, submitted: false });

    return <FormValuesLayout values={values} explainer={<Explainer />}>
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
                    <MenuItem value=""><em>Select User</em></MenuItem>
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

internals.Explainer = () => (

    <FormExplainer
        header="Controlled"
        formUrl="https://github.com/BigRoomStudios/strange-forms/blob/master/examples/src/components/Forms/Controlled.js"
        pageUrl="https://github.com/BigRoomStudios/strange-forms/blob/master/examples/src/routes/forms/components/ControlledPage.js"
    >
        <Typography gutterBottom>
            This form is controlled, meaning that the form values are synced to the page's state via props.  Notice that as you type in the form, the page state is updated in realtime even before the form has been submitted.  Select a user using the dropdown in the upper-left and see their information sync down to the form values.
        </Typography>
        <Typography>
            Controlled forms are great because they are very flexible and can be composed with other forms, as in the <Link to="/nested">Nested</Link> example.
        </Typography>
    </FormExplainer>
);
