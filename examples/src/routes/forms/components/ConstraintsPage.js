const { useState } = require('react');
const FormValuesLayout = require('./FormValuesLayout');
const ConstraintsForm = require('../../../components/Forms/Constraints');

const internals = {};

module.exports = function ControlledPage() {

    const [values, setValues] = useState(ConstraintsForm.defaults);

    return <FormValuesLayout values={values}>
        <ConstraintsForm
            {...values}
            onChange={(updated) => setValues({ ...values, ...updated })}
        />
    </FormValuesLayout>;
};
