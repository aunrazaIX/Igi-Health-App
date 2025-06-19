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
      ques: 'What benefits are covered under this plan?',
      description:
        'This plan covers a wide range of hospitalization benefits including:\n\n• Room rent\n• ICU charges\n• Day care surgeries\n• Hospital and surgical expenses\n• Services of licensed physicians or surgeons\n• Operation theatre charges and anesthesia\n• Oxygen, blood or blood derivatives (and their administration)\n• Ventilator and allied services\n• Licensed ambulance services\n• Services of a registered nurse (non-relative, non-residing, and medically necessary only)',
    },
    {
      id: 2,
      ques: 'Who is covered under the plan?',
      description:
        'The plan covers eligible insured individuals. Coverage is limited to medical expenses incurred within Pakistan.',
    },
    {
      id: 3,
      ques: 'What is the coverage limit?',
      description:
        'Coverage is provided as outlined in the Schedule of Benefits.',
    },
    {
      id: 4,
      ques: 'What is a pre-existing condition?',
      description:
        'A pre-existing condition refers to any illness, disease, or medical condition that existed before the start date of the insurance coverage.',
    },
    {
      id: 5,
      ques: 'At which hospitals can I avail plan benefits?',
      description:
        'The plan provides access to 300+ panel hospitals across Pakistan. You can avail the cashless facility by presenting your health card. The hospital list is available on the IGI Life website. For assistance, call the 24/7 approval center at 042-34503333.',
    },
    {
      id: 6,
      ques: 'Is cashless facility available at panel hospitals?',
      description:
        'Yes, cashless hospitalization is available at all panel hospitals in the network.',
    },
    {
      id: 7,
      ques: 'What specialized investigations are covered?',
      description:
        'The plan covers a variety of specialized investigations including but not limited to:\n\n• MRI\n• CT Scan\n• Thallium Scan\n• Perfusion Scan\n• Endoscopy\n• Gastroscopy\n• Colonoscopy\n• Angiography',
    },
    {
      id: 8,
      ques: 'How can I make a claim (for non-panel hospitals)?',
      description:
        'Submit the following within 90 days of hospital discharge:\n\n• Completed claim form\n• Original bills, receipts, and discharge certificate\n• Laboratory and radiology reports (if any)\n• Referral letter from a medical practitioner\n• Any additional documents as required by the insurer',
    },
    {
      id: 9,
      ques: 'Where do I call for more information?',
      description:
        'For plan benefits and coverage details, contact:\n\nCall: 111-111-711 or +92 300-8208489\nWhatsApp: +92 300-8208489 (Responses within 24 hours)',
    },
    {
      id: 10,
      ques: 'What does plan limit mean?',
      description:
        'It refers to the maximum amount you can claim under the specific benefit(s) offered.',
    },
    {
      id: 11,
      ques: 'What cases require prior approval?',
      description:
        'Non-emergency hospital admissions or daycare procedures require prior approval from the insurer.',
    },
    {
      id: 12,
      ques: 'What are the procedures for admission?',
      description:
        'Emergency: No prior approval is needed. Present your health card at any panel hospital for direct admission.\n\nNon-Emergency: Prior approval is required before admission.',
    },
    {
      id: 13,
      ques: 'How long does it take to process a reimbursement claim?',
      description:
        'Claim reimbursement is processed within 15 working days from the receipt of complete documents. Delays may occur if additional information is requested.',
    },
    {
      id: 14,
      ques: 'What is Accidental Enhancement?',
      description:
        'In case of an accidental injury, you may be eligible for double the standard hospitalization limit under this benefit. Please refer to the Schedule of Benefits to confirm if this feature is included in your policy.',
    },
    {
      id: 15,
      ques: 'What are Pre & Post Hospitalization Expenses?',
      description:
        'Pre-Hospitalization: Diagnostic tests ordered by a physician, done within 30 days before admission, at the same hospital.\n\nPost-Hospitalization: Medically necessary expenses within 30 days after discharge, related to the same condition, are covered at 100%.',
    },
    {
      id: 16,
      ques: 'How can I check my remaining entitlement limit?',
      description:
        'You can:\n• Use the IGI Life Health App, or\n• WhatsApp your health card image to +92 300-8208489. You will receive a response within 24 hours.',
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
