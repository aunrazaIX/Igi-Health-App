import React from 'react';
import WidgetView from '../../views/WidgetView';
import useWidgetViewModel from '../../viewmodels/useWidgetViewModel';

const Widget = ({route}) => {
  const {states, functions} = useWidgetViewModel({route});
  const {token, widgetUrl, isErrorOcuured, isLoading, incValue} = states;
  const {handleLoadError, setLoadingState, handleNavigation} = functions;
  return (
    <WidgetView
      handleLoadError={handleLoadError}
      setLoadingState={setLoadingState}
      handleNavigation={handleNavigation}
      token={token}
      incValue={incValue}
      isErrorOcuured={isErrorOcuured}
      isLoading={isLoading}
      widgetUrl={widgetUrl}
    />
  );
};
export default Widget;
