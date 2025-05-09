import React, {useState, ReactNode} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  ScrollView,
} from 'react-native';

import {vh, vw} from '../../assets/theme/dimension';
import AileronSemiBold from '../AileronSemiBold';
import {COLORS} from '../../assets/theme/colors';
import LinearGradient from 'react-native-linear-gradient';

type Step = {
  key: string; // ← Add this
  label: string;
};

type StepperProps = {
  steps: Step[];
  containerStyle?: StyleProp<ViewStyle>;
  componentList: Record<string, ReactNode>;
};

const Stepper: React.FC<StepperProps> = ({steps, componentList}) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const renderStep = (stepIndex: number) => {
    const stepNumber = stepIndex + 1;
    const isActive = activeStep >= stepNumber;

    return (
      <View key={stepNumber} style={styles.stepWrapper}>
        {stepIndex !== 0 && (
          <View style={[styles.line, isActive && styles.activeLine]} />
        )}
        <TouchableOpacity onPress={() => setActiveStep(stepNumber)}>
          <View
            style={[styles.outerCircle, isActive && styles.outerActiveCircle]}>
            <View style={[styles.circle, isActive && styles.activeCircle]}>
              <AileronSemiBold
                style={[styles.label, isActive && styles.activeLabel]}
                name={`${stepNumber}`}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.stepContainer}>
          {steps?.map((_, index) => renderStep(index))}
        </View>
        <View style={styles.textContainer}>
          {steps?.map((_, index) => (
            <AileronSemiBold
              key={_.key}
              style={styles.labelBelow}
              name={steps[index]?.label}
            />
          ))}
        </View>

        <View style={styles.contentContainer}>
          {componentList[steps[activeStep - 1]?.key]}
        </View>
      </View>
      <LinearGradient
        colors={COLORS.PriorGradient}
        style={styles.priorGradient}>
        <TouchableOpacity
          style={styles.wrapper}
          onPress={() => setActiveStep(activeStep + 1)}>
          <AileronSemiBold style={styles.priorNext} name={'Next'} />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: vh * 11,
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: vh,
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  outerCircle: {
    width: vw * 10,
    height: vw * 10,
    borderRadius: vw * 50,
    backgroundColor: COLORS.white,
    padding: vw,
    borderColor: COLORS.black + 44,
    borderWidth: vw * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerActiveCircle: {
    borderColor: COLORS.activeTab,
  },
  circle: {
    width: '100%',
    height: '100%',
    borderRadius: vw * 50,
    backgroundColor: COLORS.black + 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCircle: {
    backgroundColor: COLORS.activeTab,
  },
  label: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: vw * 4,
  },
  activeLabel: {
    color: 'white',
  },
  line: {
    width: vw * 22,
    height: vh * 0.4,
    backgroundColor: COLORS.black + 44,
  },
  activeLine: {
    backgroundColor: COLORS.activeTab,
  },
  contentContainer: {
    flex: 1,
    marginBottom: vh * 1,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: vh * 2,
  },
  labelBelow: {
    width: vw * 27,
    color: COLORS.black,
    fontSize: vw * 3.25,
    textAlign: 'center',
  },
  flatListContainer: {
    height: '100%',
    backgroundColor: COLORS.white,
  },
  footerStyle: {
    padding: vw * 4,
  },
  priorGradient: {
    width: '100%',
    borderRadius: vh * 1.5,
  },
  wrapper: {padding: vh * 2},
  priorNext: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: vh * 2,
  },
});

export default Stepper;
