import React, {JSX} from 'react';
import {
  CreateNewPassword,
  EnterEmailView,
  OtpView,
} from './components';
import {icons} from '../../assets';
import {
  AileronBold,
  AileronRegular,
  Button,
  Container,
  CurvedView,
  TopView,
} from '../../components';
import styles from './styles';
import {ImageSourcePropType} from 'react-native';

const ForgotPasswordView = ({
  step,
  handleStep,
  onPressBack
}: {
  step: number;
  onPressBack:()=>void,
  handleStep: (step: number) => void;
}) => {
  const returnComponent: Record<number, JSX.Element> = {
    1: <EnterEmailView />,
    2: <OtpView />,
    3: <CreateNewPassword />,
  };
  const returnTitle: Record<number, string> = {
    1: 'Forgot Password',
    2: 'OTP Verification',
    3: 'Create New Password',
  };
  const returnDescription: Record<number, string> = {
    1: 'Enter your email address to recover your password.',
    2: 'An authentication code has been sent to imran-naveed-8852@gmail.com',
    3: 'At least 8 characters, with uppercase and lowercase letters.',
  };
  const returnButtonName: Record<number, string> = {
    1: 'Forgot Password',
    2: 'Next',
    3: 'Submit',
  };
  const returnHeaderName: Record<number, string> = {
    1: 'Forgot Password',
    2: 'OTP Verification',
    3: 'Create New Password',
  };
  const returnHeaderIcon: Record<number, ImageSourcePropType | null> = {
    1: icons.forgotPassword,
    2: icons.resetPassword,
    3: null,
  };

  return (
    <Container>
      <TopView onPressBack={onPressBack} icon={returnHeaderIcon[step]} title={returnHeaderName[step]} />
      <CurvedView>
        <AileronBold style={styles.titleText} name={returnTitle[step]} />
        <AileronRegular
          style={styles.description}
          name={returnDescription[step]}
        />
        {returnComponent[step]}
        <Button
          onPress={() => handleStep(step)}
          name={returnButtonName[step]}
          containerStyle={styles.button}
        />
      </CurvedView>
    </Container>
  );
};
export default ForgotPasswordView;
