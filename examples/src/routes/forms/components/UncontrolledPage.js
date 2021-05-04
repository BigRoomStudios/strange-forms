const { useState } = require('react');
const FormValuesLayout = require('./FormValuesLayout');
const UncontrolledForm = require('../../../components/Forms/Uncontrolled');

module.exports = function UncontrolledPage() {

    const [values, setValues] = useState({ ...UncontrolledForm.defaults, submitted: false });

    return <FormValuesLayout values={values}>
        <UncontrolledForm
            onSubmit={(result) => setValues({ ...result, submitted: true })}
        />
    </FormValuesLayout>;
};
