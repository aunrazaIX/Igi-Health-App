import React from 'react';
import {FlatList} from 'react-native';
import {SingleFAQsView} from './components';
import styles from './styles';
import {Data} from '../../viewmodels/useFAQsViewModel';
import {
  AileronRegular,
  AileronSemiBold,
  Container,
  CurvedView,
  TopView,
} from '../../components';
import {vh} from '../../assets/theme/dimension';

const FAQsView = ({
  faqsData,
  toggleAccordion,
  goBack,
}: {
  faqsData: Data[];
  goBack: () => void;
  toggleAccordion: (index: number, isClose: boolean) => void;
}) => {
  const renderItem = ({item, index}: {item: Data; index: number}) => {
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
      <CurvedView>
        <AileronRegular name={'Got Any question?'} style={styles.headertitle} />
        <AileronSemiBold
          name={'We’ve got answers.'}
          style={styles.faqsSubHeading}
        />
        <FlatList
          data={faqsData}
          keyExtractor={item => item?.id?.toString()}
          renderItem={renderItem}
          contentContainerStyle={{paddingVertical: vh * 1.5}}
        />
      </CurvedView>
    </Container>
  );
};

export default FAQsView;
