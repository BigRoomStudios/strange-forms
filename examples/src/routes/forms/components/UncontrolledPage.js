const { useState } = require('react');
const FormValuesLayout = require('./FormValuesLayout');
const UncontrolledForm = require('../../../components/Forms/Uncontrolled');

module.exports = function UncontrolledPage() {

    const [values, setValues] = useState(null);

    return <FormValuesLayout values={values}>
        <UncontrolledForm onSubmit={setValues} />
    </FormValuesLayout>;
};
