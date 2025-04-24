import React, { useState, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StyleProp, ViewStyle, FlatList } from 'react-native';
import CurvedView from '../CurvedView';
import TopView from '../TopView';
import { vh, vw } from '../../assets/theme/dimension';
import AileronSemiBold from '../AileronSemiBold';
import { COLORS } from '../../assets/theme/colors';
import AileronRegular from '../AileronRegular';
import LinearGradient from 'react-native-linear-gradient';

type Step = {
  label: string | number;
  componentList: ReactNode;
};

type StepperProps = {
  steps: Step[];
  containerStyle?: StyleProp<ViewStyle>;
};

const Stepper: React.FC<StepperProps> = ({ steps, containerStyle,title,componentList }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const renderStep = (stepIndex: number) => {
    const stepNumber = stepIndex + 1;
    const isActive = activeStep >= stepNumber;

    return (
        <View key={stepNumber} style={styles.stepWrapper}>
          {stepIndex !== 0 && <View style={[styles.line, isActive && styles.activeLine]} />}
          <TouchableOpacity onPress={() => setActiveStep(stepNumber)}>
            <View style={[styles.outerCircle, isActive && styles.outerActiveCircle]}>
            <View style={[styles.circle, isActive && styles.activeCircle]}>
              <AileronSemiBold style={[styles.label, isActive && styles.activeLabel]} name={stepNumber} />
            </View>
            </View>
          </TouchableOpacity>
          </View>
   
    );
  };

  const headerComponent = () => {
    return (
      <>
    <TopView title={title}/>
    <CurvedView>
    <View>
      <View style={styles.stepContainer}>
        {steps.map((_, index) => renderStep(index))}
      </View>
      <View style={styles.textContainer}>
      {steps.map((_,index)=>(<AileronSemiBold key={index} style={styles.labelBelow} name={steps[index].label}/>))}</View>
      <View style={styles.contentContainer}>
        {componentList[steps[activeStep - 1]?.key]}
      </View>
    </View>
    </CurvedView>
    </>
    );
  }

  const footerComponent = () => {
    return(
    <LinearGradient
                            colors={COLORS.PriorGradient}
                            style={styles.priorGradient}
                        >
                            <TouchableOpacity style={styles.priorTouchable}>
                                <AileronSemiBold style={styles.priorNext} name={'Next'} />
                            </TouchableOpacity>
                        </LinearGradient>)
  }

  return (
   <FlatList contentContainerStyle={styles.flatListContainer} ListHeaderComponent={headerComponent} ListFooterComponentStyle={styles.footerStyle} ListFooterComponent={footerComponent}/>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent:'center',
    alignItems: 'center',
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
  outerCircle:{
    width: vw*10,
    height: vw*10,
    borderRadius: vw*50,
    backgroundColor: COLORS.white,
    padding:vw,
    borderColor:COLORS.black +44,
    borderWidth: vw*0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerActiveCircle:{
    borderColor:COLORS.activeTab,
  },
  circle: {
    width: '100%',
    height: "100%",
    borderRadius: vw*50,
    backgroundColor: COLORS.black + 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCircle: {
    backgroundColor: COLORS.activeTab,
  },
  label: {
    color:COLORS.black,
    fontWeight: 'bold',
    fontSize: vw*4,
  },
  activeLabel: {
    color: 'white',
  },
  line: {
    width: vw*22,
    height: vh*0.4,
    backgroundColor: COLORS.black + 44,
  },
  activeLine: {
    backgroundColor: COLORS.activeTab,
  },
  contentContainer: {
    alignItems: 'center',
  },
  textContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  labelBelow: {
    width: vw*27,
    color: COLORS.black,
    fontSize: vw*3.25,
    textAlign: 'center',
  },
  flatListContainer:{
    backgroundColor: COLORS.white,
  },
  priorGradient: {
    marginTop: vh * 1,
    borderRadius: vh * 1.5,
    padding: vh * 2,
  },
  priorNext: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: vh * 2,
  },
  footerStyle:{
    padding:vw*4
  }
});


export default Stepper;
