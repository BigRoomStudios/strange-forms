const { default: Grid } = require('@material-ui/core/Grid');
const { default: Button } = require('@material-ui/core/Button');

module.exports = function SubmitButtonRow(props) {

    return <Grid item xs={12} container justify="center">
        <Button type="submit" variant="outlined" color="primary" {...props}>Submit</Button>
    </Grid>;
};
