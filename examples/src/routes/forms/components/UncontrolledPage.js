const { useState } = require('react');
const FormValuesLayout = require('./FormValuesLayout');
const UncontrolledForm = require('../../../components/Forms/Uncontrolled');
const { default: Grid } = require('@material-ui/core/Grid');
const { default: Select } = require('@material-ui/core/Select');
const { default: MenuItem } = require('@material-ui/core/MenuItem');
const { default: Typography } = require('@material-ui/core/Typography');
const FormExplainer = require('./FormExplainer');

const internals = {};

module.exports = function UncontrolledPage() {

    const { Explainer, users } = internals;
    const [edit, setEdit] = useState('');
    const [values, setValues] = useState({ ...UncontrolledForm.defaults, submitted: false });

    return <FormValuesLayout values={values} explainer={<Explainer />}>
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

internals.Explainer = () => (

    <FormExplainer
        header="Uncontrolled"
        formUrl="/"
        pageUrl="/"
    >
        <Typography gutterBottom>
            This form is uncontrolled, meaning that the form values are not known to the form's parent until submission is complete.  Notice that as you type in the form, the external form state on the right does not update.  Once you click "Submit," all the form values appear.
        </Typography>
        <Typography>
            This form can take initial values— select a user from the dropdown in the upper-left.  A common pitfall of uncontrolled components is that they do not react to changes in their props after their initial mount.  Strange-forms helps to protect from this issue: as you switch users, the form comes up to date even if you've already started editing the form.
        </Typography>
    </FormExplainer>
);
