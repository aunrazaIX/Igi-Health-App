
const useLodgeClaimViewModel=()=> {
  const steps=[
    {label:'Personal Details',key:'personalDetails',data:[]},
    {label:'Claim',key:'claim',data:[]},
    {label:'Upload Doc',key:'uploadDoc',data:[]},
  ]
  return {
    states:{steps},
    functions:{}
    }
}

export default useLodgeClaimViewModel
