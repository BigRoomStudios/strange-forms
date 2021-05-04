const { useState } = require('react');
const FormValuesLayout = require('./FormValuesLayout');
const ControlledForm = require('../../../components/Forms/Controlled');
const SubmitButtonRow = require('../../../components/Forms/SubmitButtonRow');

module.exports = function UncontrolledPage() {

    const [values, setValues] = useState({ ...ControlledForm.defaults, submitted: false });

    return <FormValuesLayout values={values}>
        <ControlledForm
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
