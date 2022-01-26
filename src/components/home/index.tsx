import React from "react";
import { Link } from 'react-router-dom'
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Stack, IStackStyles, IStackTokens, IStackItemStyles } from '@fluentui/react/lib/Stack';
import { DefaultPalette } from '@fluentui/react/lib/Styling';
import * as ROUTES from '../../constants/routes';

const logo = require("../../svlogo.PNG");

// Styles definition
const stackStyles = {
  root: {
    marginTop: 130,
    height: 250,
  },
};
const stackItemStyles = {
  root: {
    alignItems: 'center',

    display: 'flex',
    justifyContent: 'center',
  },
};

const outerStackTokens = { childrenGap: 5 };
const innerStackTokens = {
  childrenGap: 5,
  padding: 10,
};

export interface IButtonExampleProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  disabled?: boolean;
  checked?: boolean;
}

function _alertClicked(): void {
  // alert('Clicked');
}

export const LoginBtn: React.FunctionComponent<IButtonExampleProps> = props => {
  const { disabled, checked } = props;

  return (
    <DefaultButton style={{
      backgroundColor: '#2766cc',
      color: 'white', marginTop: '1rem', borderRadius: 25
    }} text="Login" onClick={_alertClicked} />
  );
};
export const SignupBtn: React.FunctionComponent<IButtonExampleProps> = props => {
  const { disabled, checked } = props;

  return (
    <DefaultButton style={{
      backgroundColor: 'white',
      color: '#2766cc', marginTop: '1rem', borderRadius: 25
    }} text="Register" onClick={_alertClicked} disabled={true} />
  );
};
const HomePage = () => {

  return (
    <div>
      <Stack tokens={outerStackTokens}>
        <Stack styles={stackStyles} tokens={innerStackTokens}>
          <Stack.Item styles={stackItemStyles}>
            <img src={logo} style={{width: 180,
      height: 180,}} />

          </Stack.Item>
          <Stack.Item styles={stackItemStyles}>
            <Link to={ROUTES.AUTH} >
              <LoginBtn></LoginBtn>
            </Link>
          </Stack.Item>
          <Stack.Item styles={stackItemStyles}>
            <Link to={ROUTES.SIGNUP}>
              <SignupBtn></SignupBtn>
            </Link>
          </Stack.Item>
        </Stack>
      </Stack>
      <Stack styles={stackStyles}>
        <Stack.Item align="center" styles={stackItemStyles}>

        </Stack.Item>

        <Stack.Item align="center" styles={stackItemStyles}>

        </Stack.Item>
      </Stack>






    </div>
  )
}

export default HomePage;