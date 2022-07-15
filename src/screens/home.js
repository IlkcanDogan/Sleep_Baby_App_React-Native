import React, { useState, useCallback } from 'react';
import { View, Alert, Share } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar } from 'react-native-paper';
import { APPSTORE_APP_URL, PLAY_STORE_APP_URL, ADMOB_BANNER_ID, RAW_DATA } from '../core/constants';
import Theme from '../core/theme';
import EncryptedStorage from 'react-native-encrypted-storage';
import { AdMobBanner } from 'react-native-admob';

//components
import SoundCard from '../components/SoundCard';
import Player from '../components/Player';

function HomeScreen({ navigation }) {
    const { colors } = Theme;

    const initSound = { title: '', name: '', path: '', timing: 0 }
    const [sound, setSound] = useState({ title: '', name: '', path: '', timing: 0 })
    const [records, setRecords] = useState([]);

    useFocusEffect(useCallback(() => {
        EncryptedStorage.getItem('sound').then((data) => {
            let soundJSON = JSON.parse(data);

            if (soundJSON) {
                setRecords(soundJSON);
            }
        })
    }, []));

    const handleShare = () => {
        Share.share({ message: Platform.OS == 'ios' ? APPSTORE_APP_URL : PLAY_STORE_APP_URL }).finally(() => { })
    }

    const handleRecordDelete = (path) => {
        Alert.alert('Uyarı', 'Ses kaydını silmek istediğinize emin misiniz?', [
            { text: "İptal", onPress: () => { } },
            {
                text: "Evet", onPress: () => {
                    //#region Delete 
                    let tmp = records.filter(item => item.path !== path);

                    EncryptedStorage.setItem('sound', JSON.stringify(tmp)).then(() => {
                        setRecords(tmp)
                        if (path === sound.path) {
                            setSound(initSound)
                        }
                    })
                    //#endregion
                }
            }
        ]);
    }

    return (
        <React.Fragment>
            <Appbar.Header>
                <Appbar.Action icon="share-variant" size={30} onPress={handleShare} />
                <Appbar.Content title="Uyu Bebeğim" style={{ justifyContent: 'center', alignItems: 'center' }} />
                <Appbar.Action icon="microphone-plus" size={30} onPress={() => navigation.navigate('CustomSounds')} />
            </Appbar.Header>
            <View style={{ flex: 1, backgroundColor: colors.background }}>
                <ScrollView>
                    {records.map((item, index) => {
                        return (
                            <SoundCard key={index} title={item.title} onSelect={() => setSound({ ...sound, title: item.title, name: item.path, path: item.path, play: true })} deletable={true} onDelete={() => handleRecordDelete(item.path)} />
                        )
                    })}

                    {RAW_DATA.map((item, index) => {
                        return (
                            <SoundCard key={index} title={item.title} onSelect={() => setSound({ ...sound, title: item.title, name: item.name, play: true })} />
                        )
                    })}
                </ScrollView>
                <Player
                    title={sound.title}
                    fileName={sound.name}
                    timing={sound.timing}
                    onTiming={(time) => setSound({ ...sound, timing: time })}
                    onClose={() => setSound(initSound)}
                />
                <AdMobBanner
                    adSize="fullBanner"
                    adUnitID={ADMOB_BANNER_ID}
                    testDevices={[AdMobBanner.simulatorId]}
                    onAdFailedToLoad={error => console.error(error)}
                />
            </View>
        </React.Fragment>
    )
}

export default HomeScreen;