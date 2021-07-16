const { useState } = require('react');
const { Link } = require('react-router-dom');
const { default: Typography } = require('@material-ui/core/Typography');
const FormValuesLayout = require('./FormValuesLayout');
const NestedForm = require('../../../components/Forms/Nested');
const SubmitButtonRow = require('../../../components/Forms/SubmitButtonRow');
const FormExplainer = require('./FormExplainer');

const internals = {};

module.exports = function NestedFormPage() {

    const { Explainer } = internals;
    const [values, setValues] = useState({ ...NestedForm.defaults, submitted: false });

    return <FormValuesLayout values={values} explainer={<Explainer />}>
        <NestedForm
            {...values}
            component="form"
            onChange={(updated) => setValues({ ...values, ...updated, submitted: false })}
            onSubmit={(ev) => {

                ev.preventDefault();

                setValues({ ...values, submitted: true });
            }}
        >
            <SubmitButtonRow />
        </NestedForm>
    </FormValuesLayout>;
};

internals.Explainer = () => (

    <FormExplainer
        header="Nested"
        formUrl="https://github.com/BigRoomStudios/strange-forms/blob/master/examples/src/components/Forms/Nested.js"
        pageUrl="https://github.com/BigRoomStudios/strange-forms/blob/master/examples/src/routes/forms/components/NestedPage.js"
    >
        <Typography>
            This form utilizes the controlled form component from the <Link to="/controlled">Controlled</Link> example, and composes it alongside an additional form field "Preferred Temperature" to generate a new controlled form.  This demonstrates a major benefit of controlled forms.
        </Typography>
    </FormExplainer>
);
