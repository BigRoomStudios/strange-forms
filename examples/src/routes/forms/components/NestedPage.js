const { useState } = require('react');
const FormValuesLayout = require('./FormValuesLayout');
const NestedForm = require('../../../components/Forms/Nested');
const SubmitButtonRow = require('../../../components/Forms/SubmitButtonRow');

module.exports = function NestedFormPage() {

    const [values, setValues] = useState({ ...NestedForm.defaults, submitted: false });

    return <FormValuesLayout values={values}>
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
