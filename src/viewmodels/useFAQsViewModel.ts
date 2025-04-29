import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

type UseFaqsViewModelReturnType = {
  states: {
    faqsData: Data[];
  };
  functions: {
    toggleAccordion: (index: number, isClose: boolean) => void;
    goBack: () => void;
  };
};
export type Data = {
  id: number;
  ques: string;
  description: string;
  isOpen?: boolean;
};
const useFAQsViewModel = (): UseFaqsViewModelReturnType => {
  const navigation = useNavigation();

  const [faqsData, setFaqsData] = useState<Data[]>([
    {
      id: 1,
      ques: 'How I can claim an insurance policy?',
      description:
        'To claim an insurance policy, contact your insurance provider promptly. Report the incident, providing detailed information such as date, time, and nature of the loss.',
    },
    {
      id: 2,
      ques: 'How does the claims process work?',
      description:
        'The claims process involves submitting a form with supporting documents, followed by review and assessment. After evaluation, a decision is made.',
    },
    {
      id: 3,
      ques: 'How much life insurance coverage do I need?',
      description:
        'Your life insurance coverage should depend on your income, debts, expenses, and dependents needs.A common guideline is 10-15 times your annual income.',
    },
    {
      id: 4,
      ques: 'What factors affect life insurance premiums?',
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusa tium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis quasi',
    },
    {
      id: 5,
      ques: 'Can I buy life insurance for someone else?',
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusa tium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.',
    },
    {
      id: 6,
      ques: 'Can I have multiple life insurance policies?',
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusa tium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis',
    },
    {
      id: 7,
      ques: 'Is life insurance taxable?',
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusa tium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis ',
    },
  ]);

  const goBack = () => {
    navigation.goBack();
  };

  const toggleAccordion = (index: number, isClose: boolean): void => {
    let temp = [...faqsData];
    if (isClose) {
      temp[index].isOpen = false;
    } else {
      temp[index].isOpen = !temp[index].isOpen;
    }
    setFaqsData(temp);
  };

  return {
    states: {
      faqsData,
    },
    functions: {
      toggleAccordion,
      goBack,
    },
  };
};

export default useFAQsViewModel;
