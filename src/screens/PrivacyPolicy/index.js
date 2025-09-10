import usePrivacyPolicyModel from '../../viewmodels/usePrivacyPolicyViewModel';
import PrivacyPolicyView from '../../views/PrivacyPolicyView';

const PrivacyPolicy = () => {
  const {states, functions} = usePrivacyPolicyModel();
  const {loading, webKey} = states;
  const {onLoadEnd} = functions;
  return (
    <PrivacyPolicyView
      webKey={webKey}
      onLoadEnd={onLoadEnd}
      loading={loading}
    />
  );
};

export default PrivacyPolicy;
