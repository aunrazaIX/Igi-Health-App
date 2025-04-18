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
      <TopView title="Terms & Conditions" />
      <CurvedView>
        <ScrollView>
          <View style={styles.termsAndConditionContainer}>
            <View style={styles.policyInformation}>
              <AileronBold
                style={styles.termsAndConditionsHeading}
                name="Policy Information:"></AileronBold>

              <View style={styles.termsAndConditionsPoints}>
                <AileronBold style={styles.bullet} name="•">
                  {' '}
                </AileronBold>
                <AileronRegular
                  style={styles.pointsText}
                  name=" Policy Number: A unique identifier for the insurance policy."></AileronRegular>
              </View>

              <View style={styles.termsAndConditionsPoints}>
                <AileronBold style={styles.bullet} name="•">
                  {' '}
                </AileronBold>
                <AileronRegular
                  style={styles.pointsText}
                  name=" Policy Number: A unique identifier for the insurance policy."></AileronRegular>
              </View>
              <View style={styles.termsAndConditionsPoints}>
                <AileronBold style={styles.bullet} name="•">
                  {' '}
                </AileronBold>
                <AileronRegular
                  style={styles.pointsText}
                  name="Policyholder: The person who owns the policy."></AileronRegular>
              </View>
              <View style={styles.termsAndConditionsPoints}>
                <AileronBold style={styles.bullet} name="•">
                  {' '}
                </AileronBold>
                <AileronRegular
                  style={styles.pointsText}
                  name="Insured: The person whose life is covered by the policy"></AileronRegular>
              </View>

              <View style={styles.termsAndConditionsPoints}>
                <AileronBold style={styles.bullet} name="•">
                  {' '}
                </AileronBold>
                <AileronRegular
                  style={styles.pointsText}
                  name="Beneficiary: The individual or entity who will receive the death benefit upon the insured's death"></AileronRegular>
              </View>
            </View>

            <View>
              <AileronBold
                style={styles.termsAndConditionsHeading}
                name="Coverage Details:"></AileronBold>

              <View style={styles.termsAndConditionsPoints}>
                <AileronBold style={styles.bullet} name="•">
                  {' '}
                </AileronBold>
                <AileronRegular
                  style={styles.pointsText}
                  numberOfLines={2}
                  name="Death Benefit: The amount paid to the beneficiary upon the death of the insured."></AileronRegular>
              </View>

              <View style={styles.termsAndConditionsPoints}>
                <AileronBold style={styles.bullet} name="•">
                  {' '}
                </AileronBold>
                <AileronRegular
                  style={styles.pointsText}
                  name="Policy Term: The duration for which the policy provides coverage."></AileronRegular>
              </View>
              <View style={styles.termsAndConditionsPoints}>
                <AileronBold style={styles.bullet} name="•">
                  {' '}
                </AileronBold>
                <AileronRegular
                  style={styles.pointsText}
                  name="Premiums: The periodic payments made by the policyholder to keep the policy in force."></AileronRegular>
              </View>
            </View>

            <View>
              <AileronBold
                style={styles.termsAndConditionsHeading}
                name="Premium Payments:"></AileronBold>

              <View style={styles.termsAndConditions}>
                <AileronRegular
                  style={styles.termsAndConditionsText}
                  name="Frequency: Specifies how often premium payments are due (e.g., monthly, quarterly, annually).">
                  {' '}
                </AileronRegular>
              </View>

              <View style={styles.termsAndConditions}>
                <AileronRegular
                  style={styles.termsAndConditionsText}
                  name="Grace Period: A period after the due date during which the policy remains in force despite non-payment">
                  {' '}
                </AileronRegular>
              </View>
            </View>

            <View>
              <AileronBold
                style={styles.termsAndConditionsHeading}
                name="


                Exclusions::"></AileronBold>

              <View style={styles.termsAndConditions}>
                <AileronBold style={styles.bullet} name="•">
                  {' '}
                </AileronBold>
                <AileronRegular
                  style={styles.termsAndConditionsText}
                  name="Conditions or circumstances under which the insurance company may deny a claim (e.g., suicide within the first two years of the policy)">
                  {' '}
                </AileronRegular>
              </View>
            </View>

            <View>
              <AileronBold
                style={styles.termsAndConditionsHeading}
                name="
Riders and Options:"></AileronBold>

              <View style={styles.termsAndConditions}>
                <AileronBold style={styles.bullet} name="•">
                  {' '}
                </AileronBold>
                <AileronRegular
                  style={styles.termsAndConditionsText}
                  name="Additional features or options that can be added to the policy for an extra cost (e.g., accidental death rider, critical illness rider)">
                  {' '}
                </AileronRegular>
              </View>
            </View>

            <View>
              <AileronBold
                style={styles.termsAndConditionsHeading}
                name="
Policy Loans:"></AileronBold>

              <View style={styles.termsAndConditions}>
                <AileronBold style={styles.bullet} name="•">
                  {' '}
                </AileronBold>
                <AileronRegular
                  style={styles.termsAndConditionsText}
                  name="Provision allowing the policyholder to borrow against the cash value of the policy">
                  {' '}
                </AileronRegular>
              </View>
            </View>

            <View>
              <AileronBold
                style={styles.termsAndConditionsHeading}
                name="
Cash Value:"></AileronBold>

              <View style={styles.termsAndConditions}>
                <AileronBold style={styles.bullet} name="•">
                  {' '}
                </AileronBold>
                <AileronRegular
                  style={styles.termsAndConditionsText}
                  name="For permanent life insurance policies, a portion of the premium may accumulate as a cash value that can be accessed or used to pay premiums.">
                  {' '}
                </AileronRegular>
              </View>
            </View>

            <View>
              <AileronBold
                style={styles.termsAndConditionsHeading}
                name="
Surrender and Lapse:"></AileronBold>

              <View style={styles.termsAndConditions}>
                <AileronBold style={styles.bullet} name="•">
                  {' '}
                </AileronBold>
                <AileronRegular
                  style={styles.termsAndConditionsText}
                  name="Conditions under which the policyholder can surrender the policy for its cash value or allow it to lapse.">
                  {' '}
                </AileronRegular>
              </View>
            </View>

            <View>
              <AileronBold
                style={styles.termsAndConditionsHeading}
                name="
Contestability Period:"></AileronBold>

              <View style={styles.termsAndConditions}>
                <AileronBold style={styles.bullet} name="•">
                  {' '}
                </AileronBold>
                <AileronRegular
                  style={styles.termsAndConditionsText}
                  name="A period during which the insurance company can contest the validity of the policy based on misrepresented information in the application.">
                  {' '}
                </AileronRegular>
              </View>
            </View>

            <View>
              <AileronBold
                style={styles.termsAndConditionsHeading}
                name="
Policy Termination:"></AileronBold>

              <View style={styles.termsAndConditions}>
                <AileronBold style={styles.bullet} name="•">
                  {' '}
                </AileronBold>
                <AileronRegular
                  style={styles.termsAndConditionsText}
                  name="Circumstances under which the policy may be terminated, such as non-payment of premiums.">
                  {' '}
                </AileronRegular>
              </View>
            </View>

            <View>
              <AileronBold
                style={styles.termsAndConditionsHeading}
                name="
Policy Renewal and Convertibility:"></AileronBold>

              <View style={styles.termsAndConditions}>
                <AileronBold style={styles.bullet} name="•">
                  {' '}
                </AileronBold>
                <AileronRegular
                  style={styles.termsAndConditionsText}
                  name="Terms related to the renewal of term policies or the ability to convert a term policy to a permanent policy.">
                  {' '}
                </AileronRegular>
              </View>
            </View>

            <View>
              <AileronBold
                style={styles.termsAndConditionsHeading}
                name="
Grace Period:"></AileronBold>

              <View style={styles.termsAndConditions}>
                <AileronBold style={styles.bullet} name="•">
                  {' '}
                </AileronBold>

                <AileronRegular
                  style={styles.termsAndConditionsText}
                  name="A specified period after the premium due date during which the policy remains in force.
">
                  {' '}
                </AileronRegular>
              </View>
            </View>

            <View>
              <AileronBold
                style={styles.termsAndConditionsHeading}
                name="
Policyholder's Responsibilities:"></AileronBold>

              <View style={styles.termsAndConditionsPoints}>
                <AileronBold style={styles.bullet} name="•">
                  {' '}
                </AileronBold>
                <AileronRegular
                  style={styles.pointsText}
                  numberOfLines={2}
                  name="Requirements and obligations of the policyholder, such as providing accurate information and notifying the insurance company of any changes."></AileronRegular>
              </View>

              <View style={styles.termsAndConditionsPoints}>
                <AileronBold style={styles.bullet} name="•">
                  {' '}
                </AileronBold>
                <AileronRegular
                  style={styles.pointsText}
                  name="This is a very high-level overview, and the actual policy document will contain much more detail and legal language. It's crucial to thoroughly review the policy and consult with an insurance professional to ensure you understand the terms and conditions specific to the policy you are considering."></AileronRegular>
              </View>
            </View>
          </View>
        </ScrollView>
      </CurvedView>
    </>
  );
};

export default TermsAndConditionsView;
