const { useState } = require('react');
const FormValuesLayout = require('./FormValuesLayout');
const ConstraintsForm = require('../../../components/Forms/Constraints');
const { default: Typography } = require('@material-ui/core/Typography');
const FormExplainer = require('./FormExplainer');

const internals = {};

module.exports = function ConstraintsFormPage() {

    const { Explainer } = internals;
    const [values, setValues] = useState(ConstraintsForm.defaults);

    return <FormValuesLayout values={values} explainer={<Explainer />}>
        <ConstraintsForm
            {...values}
            onChange={(updated) => setValues({ ...values, ...updated })}
        />
    </FormValuesLayout>;
};

internals.Explainer = () => (

    <FormExplainer
        header="Constraints"
        formUrl="https://github.com/BigRoomStudios/strange-forms/blob/master/examples/src/components/Forms/Constraints.js"
        pageUrl="https://github.com/BigRoomStudios/strange-forms/blob/master/examples/src/routes/forms/components/ConstraintsPage.js"
    >
        <Typography gutterBottom>
            This form is controlled, and applies some constraints on the user's input.  The "Max Checked" field defines how how many checkboxes to its right may be checked at a given time.  When either "Max Checked" changes or any of the checkboxes become checked, some logic needs to run to enforce the constraint.
        </Typography>
        <Typography>
            This constraint logic is placed inside the form's <code>act()</code> configuration, which all updates to form state must go through.
        </Typography>
    </FormExplainer>
);
