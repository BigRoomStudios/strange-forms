const { useState } = require('react');
const FormValuesLayout = require('./FormValuesLayout');
const ListForm = require('../../../components/Forms/List');
const SubmitButtonRow = require('../../../components/Forms/SubmitButtonRow');

module.exports = function ListFormPage() {

    const [values, setValues] = useState({ ...ListForm.defaults, submitted: false });

    return <FormValuesLayout values={values}>
        <ListForm
            {...values}
            component="form"
            onChange={(users) => setValues({ users, submitted: false })}
            onSubmit={(ev) => {

                ev.preventDefault();

                setValues({ ...values, submitted: true });
            }}
        >
            <SubmitButtonRow />
        </ListForm>
    </FormValuesLayout>;
};
