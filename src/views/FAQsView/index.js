import React from 'react';
import {FlatList} from 'react-native';
import {SingleFAQsView} from './components';
import styles from './styles';
import {
  AileronRegular,
  AileronSemiBold,
  Container,
  CurvedView,
  TopView,
} from '../../components';
import {vh} from '../../assets/theme/dimension';

const FAQsView = ({faqsData, toggleAccordion, goBack}) => {
  const renderItem = ({item, index}) => {
    return (
      <SingleFAQsView
        ques={item?.ques}
        description={item?.description}
        isExpanded={item?.isOpen}
        index={index}
        toggleAccordion={toggleAccordion}
      />
    );
  };
  return (
    <Container>
      <TopView title={'Frequently Asked Questions'} />
      <CurvedView containerStyle={{paddingBottom: vh}}>
        <AileronRegular name={'Got Any question?'} style={styles.headertitle} />
        <AileronSemiBold
          name={'We’ve got answers.'}
          style={styles.faqsSubHeading}
        />
        <FlatList
          indicatorStyle="black"
          data={faqsData}
          keyExtractor={item => item?.id?.toString()}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingVertical: vh * 1.5,
          }}
          showsVerticalScrollIndicator={true}
        />
      </CurvedView>
    </Container>
  );
};

export default FAQsView;
