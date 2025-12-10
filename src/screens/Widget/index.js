import React from 'react';
import WidgetView from '../../views/WidgetView';
import useWidgetViewModel from '../../viewmodels/useWidgetViewModel';

const Widget = () => {
  const {states} = useWidgetViewModel();
  const {generateTokenLoading, showWidget, token, widgetUrl} = states;
  return (
    <WidgetView
      showWidget={showWidget}
      token={token}
      widgetUrl={widgetUrl}
      generateTokenLoading={generateTokenLoading}
    />
  );
};
export default Widget;
