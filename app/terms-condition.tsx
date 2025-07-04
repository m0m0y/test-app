import { View, ScrollView } from 'react-native';
import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

import termsStyle from '@/styles/terms-style';

export default function TermsCondition() {
  return (
    <ScrollView endFillColor='#f9f9f9' style={termsStyle.container}>
      <ThemedView style={termsStyle.contentContainer}>

        <View style={termsStyle.textContainer}>
          <ThemedText type='subtitle'>Data Privacy and Policy</ThemedText>
          <ThemedText type='default'>We at the National Youth Commission (NYC), are committed to provide comprehensive and coordinated program on youth development, pursuant to Republic Act 8044, while implementing safeguards to protect your privacy and keep your personal data safe and secure.</ThemedText>
        </View>

        <View style={termsStyle.textContainer}>
          <ThemedText type='subtitle'>Processing of Personal Data</ThemedText>
          <ThemedText type='default'>The personal information being collected which may include your name, contact numbers, email address, home and office address, photos, and the like, may be used for (1) event or program registration, (2) scholarship grants (including graduate studies), (3) evaluation of the proposals; and (3) sending notifications/updates; and (4) other similar activities, that the Data Subject may have with NYC. Said information will be kept by NYC for a specific period for the purpose of informing and/or inviting the data subject to any other events, promotions, proposals, and other activities of NYC. Further, said information will be shared within and used by NYC for statistics purposes.</ThemedText>
        </View>

        <View style={termsStyle.textContainer}>
          <ThemedText type='subtitle'>Data Protection</ThemedText>
          <ThemedText type='default'>We shall implement reasonable and appropriate organizational, physical, and technical security measures for the protection of personal information which we collected. Only authorized personnel are permitted and have access to the collected information who will treat any confidential information under strict confidentiality. In case of breach, NYC shall notify you and inform the National Privacy Commission (NPC) in accordance to the NPC Circular 16- 03 or Personal Data Breach Management. Personal information collected are stored and later on disposed of via shredding and permanently deleted in our electronic files in accordance to R.A. No. 9470 otherwise known as National Archives of the Philippines Act of 2007.</ThemedText>
        </View>

        <View style={termsStyle.textContainer}>
          <ThemedText type='subtitle'>Rights of Data Subject</ThemedText>
          <ThemedText type='default'>As the Data Subject, you have the right to be informed of the personal information being collected, processed, and stored by NYC as well as to access, object, rectify, and block the same. For questions or concerns, you may contact our Data Protection Officer through the following details:
          </ThemedText>
        </View>

        <View style={termsStyle.textContainer}>
          <ThemedText type='defaultSemiBold' style={{ marginTop: 5 }}>Direct lines:</ThemedText>
          <ThemedText type='default'>(02) 4268475, (02) 4268899, (02) 4268733</ThemedText>
        
          <ThemedText type='defaultSemiBold' style={{ marginTop: 5 }}>Email:</ThemedText>
          <ThemedText type='default'>dpo.nationalyouth@gmail.com, it@nyc.gov.ph, info@nyc.gov.ph</ThemedText>
      

          <ThemedText type='default' style={{ marginVertical: 15 }}>I have read this form, understood its contents, and consent to the processing of my personal data. I understand that my consent does not preclude the existence of other criteria for lawful processing of personal data, and does not waive any of my rights under the Data Privacy Act of 2012 and other applicable laws.</ThemedText>
        </View>
      </ThemedView>
    </ScrollView>
  )
}