/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  AppState,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {setErrorModal} from '../../redux/generalSlice';
import {logout} from '../../redux/authSlice';
import {COLORS} from '../../assets/theme/colors';
import AileronBold from '../AileronBold';
import {vh, vw} from '../../assets/theme/dimension';

const InactivityHandler = ({children, timeout, warningBefore}) => {
  const dispatch = useDispatch();
  const [showWarning, setShowWarning] = useState(false);

  const warningTimerRef = useRef(null);
  const logoutTimerRef = useRef(null);
  const lastBackgroundTimeRef = useRef(null);
  const hasLoggedOutRef = useRef(false);

  const clearTimers = () => {
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
  };

  const resetTimer = () => {
    clearTimers();

    warningTimerRef.current = setTimeout(() => {
      setShowWarning(true);
    }, timeout - warningBefore);

    logoutTimerRef.current = setTimeout(() => {
      userLogout();
    }, timeout);
  };

  const userLogout = () => {
    if (hasLoggedOutRef.current) return;
    hasLoggedOutRef.current = true;

    setShowWarning(false);
    dispatch(logout());
    dispatch(
      setErrorModal({
        message: 'Session Expired',
        show: true,
        detail:
          'Your session has timed out due to inactivity. Please log in again to continue.',
      }),
    );
  };

  const extendSession = () => {
    setShowWarning(false);
    resetTimer();
  };

  useEffect(() => {
    resetTimer();

    const subscription = AppState.addEventListener('change', state => {
      if (state === 'background') {
        lastBackgroundTimeRef.current = Date.now();
      }
      if (state === 'active') {
        const now = Date.now();
        if (
          lastBackgroundTimeRef.current &&
          now - lastBackgroundTimeRef.current > timeout
        ) {
          userLogout();
        } else {
          resetTimer();
        }
      }
    });

    return () => {
      clearTimers();
      subscription.remove();
    };
  }, []);

  return (
    <View
      style={{flex: 1}}
      onStartShouldSetResponderCapture={() => {
        resetTimer();
        return false;
      }}>
      {children}

      <Modal visible={showWarning} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <AileronBold
              name="You are about to be signed out due to inactivity."
              style={styles.label}
            />

            <View style={styles.buttonsView}>
              <TouchableOpacity
                onPress={userLogout}
                style={[styles.buttonContainer, styles.signoutButton]}>
                <AileronBold name="Sign Out Now" style={styles.buttonText} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={extendSession}
                style={[styles.buttonContainer, styles.stayinButton]}>
                <AileronBold style={styles.buttonText} name="Stay Signed In" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default InactivityHandler;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.black + '66',
  },
  modalContainer: {
    padding: vw * 5,
    backgroundColor: 'white',
    borderRadius: vw * 6,
    width: '80%',
  },
  label: {
    fontSize: vw * 3.5,
    marginBottom: vh * 2,
  },
  buttonContainer: {
    height: vh * 4,
    width: vw * 30,
    borderRadius: vw * 50,
    justifyContent: 'center',
  },
  signoutButton: {
    backgroundColor: COLORS.cardBackgroundRed,
  },
  stayinButton: {
    backgroundColor: COLORS.cardBackgroundLightBlue,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: vw * 3,
  },
  buttonsView: {flexDirection: 'row', justifyContent: 'space-between'},
});
