type UseBenefitsViewModel = {
  states: {
    data: CoverageBenefit[];
  };
};

type CoverageBenefit = {
  title: string;
  price: string;
};

const useBenefitsViewModel = (): UseBenefitsViewModel => {
  const data: CoverageBenefit[] = [
    {
      title: 'Per insured per disability',
      price: 'Rs. 550,000/-',
    },
    {
      title: 'Per insured per disability',
      price: 'Rs. 550,000/-',
    },
    {
      title: 'Per insured per disability',
      price: 'Rs. 550,000/-',
    },
    {
      title: 'Per insured per disability',
      price: 'Rs. 550,000/-',
    },
    {
      title: 'Per insured per disability',
      price: 'Rs. 550,000/-',
    },
    {
      title: 'Per insured per disability',
      price: 'Rs. 550,000/-',
    },
    {
      title: 'Per insured per disability',
      price: 'Rs. 550,000/-',
    },
    {
      title: 'Per insured per disability',
      price: 'Rs. 550,000/-',
    },
    {
      title: 'Per insured per disability',
      price: 'Rs. 550,000/-',
    },
    {
      title: 'Per insured per disability',
      price: 'Rs. 550,000/-',
    },
  ];

  return {
    states: {
      data,
    },
  };
};

export default useBenefitsViewModel;
