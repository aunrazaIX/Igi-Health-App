import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {
  AileronBold,
  AileronRegular,
  CurvedView,
  TopView,
} from '../../components';
import {icons} from '../../assets';
import {styles} from './style';
import {vh, vw} from '../../assets/theme/dimension';

const TermsAndConditionsView = () => {
  return (
    <>
      <TopView title="Privacy" />
      <CurvedView>
        <ScrollView>
          <View style={styles.termsAndConditionContainer}>
            <View style={styles.policyInformation}>
              <AileronBold
                style={styles.termsAndConditionsHeading}
                name="Policy Information:"
              />

              <View style={styles.termsAndConditionsPoints}>
                <AileronBold style={styles.bullet} name="•" />
                <AileronRegular
                  style={styles.pointsText}
                  name="Policy Number: A unique identifier for the insurance policy."
                />
              </View>

              <View style={styles.termsAndConditionsPoints}>
                <AileronBold style={styles.bullet} name="•" />
                <AileronRegular
                  style={styles.pointsText}
                  name="Policy Number: A unique identifier for the insurance policy."
                />
              </View>
              <View style={styles.termsAndConditionsPoints}>
                <AileronBold style={styles.bullet} name="•" />
                <AileronRegular
                  style={styles.pointsText}
                  name="Policyholder: The person who owns the policy."
                />
              </View>
              <View style={styles.termsAndConditionsPoints}>
                <AileronBold style={styles.bullet} name="•" />
                <AileronRegular
                  style={styles.pointsText}
                  name="Insured: The person whose life is covered by the policy"
                />
              </View>

              <View style={styles.termsAndConditionsPoints}>
                <AileronBold style={styles.bullet} name="•" />
                <AileronRegular
                  style={styles.pointsText}
                  name="Beneficiary: The individual or entity who will receive the death benefit upon the insured's death"
                />
              </View>
            </View>

            <View>
              <AileronBold
                style={styles.termsAndConditionsHeading}
                name="Coverage Details:"
              />

              <View style={styles.termsAndConditionsPoints}>
                <AileronBold style={styles.bullet} name="•" />
                <AileronRegular
                  style={styles.pointsText}
                  name="Death Benefit: The amount paid to the beneficiary upon the death of the insured."
                />
              </View>

              <View style={styles.termsAndConditionsPoints}>
                <AileronBold style={styles.bullet} name="•" />
                <AileronRegular
                  style={styles.pointsText}
                  name="Policy Term: The duration for which the policy provides coverage."
                />
              </View>
              <View style={styles.termsAndConditionsPoints}>
                <AileronBold style={styles.bullet} name="•" />
                <AileronRegular
                  style={styles.pointsText}
                  name="Premiums: The periodic payments made by the policyholder to keep the policy in force."
                />
              </View>
            </View>

            <View>
              <AileronBold
                style={styles.termsAndConditionsHeading}
                name="Premium Payments:"
              />

              <View style={styles.termsAndConditions}>
                <AileronRegular
                  style={styles.termsAndConditionsText}
                  name="Frequency: Specifies how often premium payments are due (e.g., monthly, quarterly, annually)."
                />
              </View>

              <View style={styles.termsAndConditions}>
                <AileronRegular
                  style={styles.termsAndConditionsText}
                  name="Grace Period: A period after the due date during which the policy remains in force despite non-payment"
                />
              </View>
            </View>

            <View>
              <AileronBold
                style={styles.termsAndConditionsHeading}
                name="


                Exclusions:"
              />

              <View style={styles.termsAndConditions}>
                <AileronBold style={styles.bullet} name="•" />
                <AileronRegular
                  style={styles.termsAndConditionsText}
                  name="Conditions or circumstances under which the insurance company may deny a claim (e.g., suicide within the first two years of the policy)"
                />
              </View>
            </View>

            <View>
              <AileronBold
                style={styles.termsAndConditionsHeading}
                name="
Riders and Options:"
              />

              <View style={styles.termsAndConditions}>
                <AileronBold style={styles.bullet} name="•" />
                <AileronRegular
                  style={styles.termsAndConditionsText}
                  name="Additional features or options that can be added to the policy for an extra cost (e.g., accidental death rider, critical illness rider)"
                />
              </View>
            </View>

            <View>
              <AileronBold
                style={styles.termsAndConditionsHeading}
                name="
Policy Loans:"
              />

              <View style={styles.termsAndConditions}>
                <AileronBold style={styles.bullet} name="•" />
                <AileronRegular
                  style={styles.termsAndConditionsText}
                  name="Provision allowing the policyholder to borrow against the cash value of the policy"
                />
              </View>
            </View>

            <View>
              <AileronBold
                style={styles.termsAndConditionsHeading}
                name="
Cash Value:"
              />

              <View style={styles.termsAndConditions}>
                <AileronBold style={styles.bullet} name="•" />
                <AileronRegular
                  style={styles.termsAndConditionsText}
                  name="For permanent life insurance policies, a portion of the premium may accumulate as a cash value that can be accessed or used to pay premiums."
                />
              </View>
            </View>

            <View>
              <AileronBold
                style={styles.termsAndConditionsHeading}
                name="
Surrender and Lapse:"
              />

              <View style={styles.termsAndConditions}>
                <AileronBold style={styles.bullet} name="•" />
                <AileronRegular
                  style={styles.termsAndConditionsText}
                  name="Conditions under which the policyholder can surrender the policy for its cash value or allow it to lapse."
                />
              </View>
            </View>

            <View>
              <AileronBold
                style={styles.termsAndConditionsHeading}
                name="
Contestability Period:"
              />

              <View style={styles.termsAndConditions}>
                <AileronBold style={styles.bullet} name="•" />
                <AileronRegular
                  style={styles.termsAndConditionsText}
                  name="A period during which the insurance company can contest the validity of the policy based on misrepresented information in the application."
                />
              </View>
            </View>

            <View>
              <AileronBold
                style={styles.termsAndConditionsHeading}
                name="
Policy Termination:"
              />

              <View style={styles.termsAndConditions}>
                <AileronBold style={styles.bullet} name="•" />
                <AileronRegular
                  style={styles.termsAndConditionsText}
                  name="Circumstances under which the policy may be terminated, such as non-payment of premiums."
                />
              </View>
            </View>

            <View>
              <AileronBold
                style={styles.termsAndConditionsHeading}
                name="
Policy Renewal and Convertibility:"
              />

              <View style={styles.termsAndConditions}>
                <AileronBold style={styles.bullet} name="•" />
                <AileronRegular
                  style={styles.termsAndConditionsText}
                  name="Terms related to the renewal of term policies or the ability to convert a term policy to a permanent policy."
                />
              </View>
            </View>

            <View>
              <AileronBold
                style={styles.termsAndConditionsHeading}
                name="
Grace Period:"
              />

              <View style={styles.termsAndConditions}>
                <AileronBold style={styles.bullet} name="•" />

                <AileronRegular
                  style={styles.termsAndConditionsText}
                  name="A specified period after the premium due date during which the policy remains in force."
                />
              </View>
            </View>

            <View>
              <AileronBold
                style={styles.termsAndConditionsHeading}
                name="
Policyholder's Responsibilities:"
              />

              <View style={styles.termsAndConditionsPoints}>
                <AileronBold style={styles.bullet} name="•" />
                <AileronRegular
                  style={styles.pointsText}
                  name="Requirements and obligations of the policyholder, such as providing accurate information and notifying the insurance company of any changes."
                />
              </View>

              <View style={styles.termsAndConditionsPoints}>
                <AileronBold style={styles.bullet} name="•" />
                <AileronRegular
                  style={styles.pointsText}
                  name="This is a very high-level overview, and the actual policy document will contain much more detail and legal language. It's crucial to thoroughly review the policy and consult with an insurance professional to ensure you understand the terms and conditions specific to the policy you are considering."
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </CurvedView>
    </>
  );
};

export default TermsAndConditionsView;
