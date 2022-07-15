import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, PermissionsAndroid, Alert } from 'react-native';
import { Appbar } from 'react-native-paper';
import Theme from '../core/theme';
import AudioRecord from 'react-native-audio-record';
import EncryptedStorage from 'react-native-encrypted-storage';

function CustomSounds({ navigation }) {
    const { colors } = Theme;
    const { width, height } = Dimensions.get('window');
    

    const [record, setRecord] = useState({
        start: false,
        config: {
            sampleRate: 16000,  // default 44100
            channels: 1,        // 1 or 2, default 1
            bitsPerSample: 16,  // 8 or 16, default 16
            audioSource: 6,     // android only (see below)
            wavFile: Date.now() + '.wav' // default 'audio.wav'
        }
    });

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            backgroundColor: colors.background

        },
        circleButton: {
            backgroundColor: colors.primary,
            height: width / 2,
            width: width / 2,
            borderRadius: 1000,
            alignItems: 'center',
            justifyContent: 'center'
        },
        circleButtonTitle: {
            color: '#fff',
            fontSize: 25,
            fontFamily: 'Comic Sans MS Bold'
        }
    });


    const handleRecord = () => {
        if (record.start) {
            setRecord({ ...record, start: false });

            AudioRecord.stop().then((audioFile) => {

                EncryptedStorage.getItem('sound').then((data) => {
                    let soundJSON = JSON.parse(data);

                    let tmp = [];

                    if (soundJSON) {
                        tmp = [...soundJSON, {
                            title: 'Ses ' + (soundJSON.length + 1),
                            path: audioFile
                        }]
                    }
                    else {
                        tmp = [{
                            title: 'Ses 1',
                            path: audioFile
                        }]
                    }

                    EncryptedStorage.setItem('sound', JSON.stringify(tmp)).then(() => {
                        Alert.alert('Bilgi', 'Ses kaydı başarı ile kaydedildi!', [
                            { text: "Tamam", onPress: () => { navigation.goBack() }, }
                        ]);
                    })
                })
            })

        }
        else {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO).then((granted) => {
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                    setRecord({ ...record, start: true });

                    AudioRecord.init(record.config);
                    AudioRecord.start();

                } else {
                    Alert.alert('Uyarı', 'Ses kaydı için uygulama ayarlarından izin verin.', [
                        { text: "Tamam", onPress: () => { }, }
                    ]);
                }
            });
        }
    }

    return (
        <React.Fragment>
            <Appbar.Header>
                <Appbar.BackAction size={30} onPress={() => navigation.goBack()} />
                <Appbar.Content title="Ses Kaydedici" style={{ justifyContent: 'center', alignItems: 'center' }} />
                <Appbar.Action size={30} />
            </Appbar.Header>
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.7} onPress={handleRecord}>
                    <View style={styles.circleButton}>
                        <Text style={styles.circleButtonTitle}>
                            {record.start ? 'Kaydediliyor...' : 'Başlat'}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </React.Fragment>
    )
}

export default CustomSounds;