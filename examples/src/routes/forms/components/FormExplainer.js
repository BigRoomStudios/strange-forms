const T = require('prop-types');
const { default: Styled } = require('styled-components');
const { default: Typography } = require('@material-ui/core/Typography');
const { default: Button } = require('@material-ui/core/Button');
const { default: Box } = require('@material-ui/core/Box');

const internals = {};

module.exports = function FormExplainer({ header, formUrl, pageUrl, children, ...others }) {

    const { ButtonContainer } = internals;

    return <Box {...others}>
        <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="h5">{header}</Typography>
            <ButtonContainer>
                <Button variant="outlined" size="small" as="a" href={formUrl} target="_blank">
                    Form
                </Button>
                <Button variant="outlined" size="small" as="a" href={pageUrl} target="_blank">
                    Page
                </Button>
            </ButtonContainer>
        </Box>
        {children}
    </Box>;
};

module.exports.propTypes = {
    header: T.any,
    formUrl: T.any,
    pageUrl: T.any,
    children: T.any
};

internals.ButtonContainer = Styled.div`
    > :first-child {
        margin-right ${({ theme }) => theme.spacing(1)}px;
    }
`;
