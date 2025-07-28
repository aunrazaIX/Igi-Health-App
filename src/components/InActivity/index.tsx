import React, {useEffect, useRef} from 'react';
import {View, AppState} from 'react-native';

import {useDispatch} from 'react-redux';

import {setErrorModal} from '../../redux/generalSlice';
import {logout} from '../../redux/authSlice';

const InactivityHandler = ({children, timeout}) => {
  const dispatch = useDispatch();

  //useRef
  const timeoutRef = useRef(null);
  const lastBackgroundTimeRef = useRef(null);

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      userLogout();
    }, timeout);
  };

  const userLogout = () => {
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
        }
      }
    });

    return () => {
      clearTimeout(timeoutRef.current);
      subscription.remove();
    };
  }, []);

  return (
    <View style={{flex: 1}} onTouchStart={resetTimer}>
      {children}
    </View>
  );
};

export default InactivityHandler;
