import React from 'react';
import PropTypes from 'prop-types';
import { withState } from 'recompose';

import { Box, Flex } from '@rebass/grid';
import Container from './Container';
import StyledButton from './StyledButton';
import StyledCard from './StyledCard';
import StyledInput from './StyledInput';
import { H5, P, Span } from './Text';
import { FormattedMessage } from 'react-intl';

/**
 * Component for handing user sign-in or redirecting to sign-up
 */
const SignIn = withState('state', 'setState', { error: null, showError: false })(
  ({ state, setState, onSubmit, onSecondaryAction, loading, unknownEmail, email, onEmailChange }) => (
    <StyledCard maxWidth={480} width={1}>
      <Box py={4} px={[3, 4]}>
        <H5 as="label" fontWeight="bold" htmlFor="email" mb={3} textAlign="left" display="block">
          <FormattedMessage id="signin.usingEmail" defaultMessage="Sign in using your email address:" />
        </H5>
        <Flex
          as="form"
          method="POST"
          noValidate
          onSubmit={event => {
            event.preventDefault();
            onSubmit(email);
          }}
        >
          <StyledInput
            error={!!state.error}
            fontSize="Paragraph"
            id="email"
            name="email"
            onChange={({ target }) => {
              onEmailChange(target.value);
              setState({ error: target.validationMessage, showError: false });
            }}
            onBlur={() => setState({ ...state, showError: true })}
            onInvalid={event => {
              event.preventDefault();
              setState({ ...state, error: event.target.validationMessage });
            }}
            placeholder="i.e. yourname@yourhost.com"
            required
            value={email}
            type="email"
            width={1}
          />
          <StyledButton
            buttonStyle="primary"
            fontWeight="600"
            disabled={!email || state.error}
            loading={loading}
            minWidth={100}
            ml={3}
            type="submit"
          >
            Sign In
          </StyledButton>
        </Flex>
        {state.error && state.showError && (
          <Span display="block" color="red.500" pt={2} fontSize="Tiny" lineHeight="Tiny" aria-live="assertive">
            {state.error}
          </Span>
        )}
        {unknownEmail && (
          <Span display="block" color="black.600" pt={2} fontSize="Tiny" lineHeight="Tiny" aria-live="assertive">
            <FormattedMessage id="signin.unknownEmail" defaultMessage="There is no user with this email address." />{' '}
            <StyledButton asLink onClick={onSecondaryAction}>
              <FormattedMessage id="signin.joinForFree" defaultMessage="Join for free!" />
            </StyledButton>
          </Span>
        )}
      </Box>

      <Container alignItems="center" bg="black.50" px={[3, 4]} py={3} display="flex" justifyContent="space-between">
        <P color="black.700">
          <FormattedMessage id="signin.noAccount" defaultMessage="Don't have an account?" />
        </P>
        <StyledButton asLink fontSize="Paragraph" fontWeight="bold" onClick={onSecondaryAction} disabled={loading}>
          <FormattedMessage id="signin.joinFree" defaultMessage="Join Free" />
        </StyledButton>
      </Container>
    </StyledCard>
  ),
);

SignIn.propTypes = {
  /** handles the email input submission, a.k.a Sign In */
  onSubmit: PropTypes.func.isRequired,
  /** handles the redirect from sign-in, a.k.a Join Free */
  onSecondaryAction: PropTypes.func.isRequired,
  /** When set to true, will show a spinner in Sign In button and will disable all actions */
  loading: PropTypes.bool,
  /** Set this to true to display the unknown email message */
  unknownEmail: PropTypes.bool,
  /** Set the value of email input */
  email: PropTypes.string.isRequired,
  /** handles changes in the email input */
  onEmailChange: PropTypes.func.isRequired,
};

export default SignIn;
