import React from 'react'
import { View } from 'react-native'
import styles from '../styles'
import { AileronBold, AileronSemiBold } from '../../../components'
import { HotlineCity, HotlineEmail } from '../../../viewmodels/useHelplineViewModel'

const SingleHelplineView = ({ cities, emails, website }: {
  cities: HotlineCity[];
  emails: HotlineEmail[];
  website: string;
}) => {
  return (
    <View style={styles.box}>
      <AileronSemiBold style={styles.title} name="24/7 Medical Hotlines" />
      {cities?.map((item, index) => (
        <View key={index} style={{ marginBottom: 8 }}>
          <AileronSemiBold style={styles.subtitle} name={item?.city} />
          <AileronSemiBold style={styles.subtitle} name={`Mobile: ${item?.mobile}`} />
        </View>
      ))}
      <AileronBold style={styles.subtitle} name={'Email:'} />
      {emails?.map((email, i) => (
        <View key={i} style={{ marginBottom: 4 }}>
          <AileronSemiBold style={styles.label} name={email?.label} />
          <AileronSemiBold style={styles.email} name={email?.email} />
        </View>
      ))}
      <AileronSemiBold style={styles.subtitle} name={'Website'} />
      <AileronSemiBold style={styles.email} name={website} />
    </View>
  )
}

export default SingleHelplineView