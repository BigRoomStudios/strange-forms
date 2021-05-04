const { Component } = require('react');
const T = require('prop-types');
const { default: Grid } = require('@material-ui/core/Grid');
const { default: Fab } = require('@material-ui/core/Fab');
const { default: AddIcon } = require('@material-ui/icons/Add');
const ControlledForm = require('./Controlled');

const internals = {};

module.exports = class ListForm extends Component {

    static defaults = {
        users: [ControlledForm.defaults]
    }

    handleChange = ({ index, item }) => {

        const { users, onChange } = this.props;

        const updated = [...users];
        updated[index] = item;

        onChange(updated);
    }


    handleAdd = () => {

        const { users, onChange } = this.props;

        onChange([...users, ControlledForm.defaults]);
    }

    render() {

        const { ControlledFormItem } = internals;
        const { children, users, ...others } = this.props;

        return <Grid
            container
            spacing={3}
            {...others}
            onChange={null}
        >
            {users.map((user, i) => (

                <ControlledFormItem
                    key={i}
                    item
                    index={i}
                    onChange={this.handleChange}
                    {...user}
                />
            ))}
            <Grid container item justify="center">
                <Fab size="small" color="secondary" onClick={this.handleAdd}>
                    <AddIcon />
                </Fab>
            </Grid>
            {children}
        </Grid>;
    }
};

module.exports.propTypes = {
    users: T.arrayOf(T.object).isRequired,
    onChange: T.func.isRequired,
    children: T.any
};

internals.ControlledFormItem = ({ index, onChange, ...others }) => {

    return <ControlledForm
        {...others}
        onChange={(update) => {

            onChange({
                index,
                item: {
                    ...Object.keys(ControlledForm.defaults)
                        .reduce((collect, field) => ({
                            ...collect,
                            [field]: others[field]
                        }), {}),
                    ...update
                }
            });
        }}
    />;
};

internals.ControlledFormItem.propTypes = {
    index: T.number.isRequired,
    onChange: T.func.isRequired
};
