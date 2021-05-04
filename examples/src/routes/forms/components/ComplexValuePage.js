const { useState } = require('react');
const FormValuesLayout = require('./FormValuesLayout');
const ComplexValueForm = require('../../../components/Forms/ComplexValue');

module.exports = function ComplexValueFormPage() {

    const [update, setUpdate] = useState(0);
    const [values, setValues] = useState({ ...ComplexValueForm.defaults, submitted: false });

    return <FormValuesLayout values={values}>
        <ComplexValueForm
            {...values}
            onSubmit={(result) => setValues({ ...result, submitted: true })}
            onClickRerender={() => setUpdate(update + 1)}
        />
    </FormValuesLayout>;
};
