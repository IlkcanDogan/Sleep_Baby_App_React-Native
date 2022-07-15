import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Button, Dialog, Portal, RadioButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Sound from 'react-native-sound';

function Player({ title, fileName, timing, onTiming, onClose }) {
    const { height } = Dimensions.get('window');
    const [modal, setModal] = useState({ open: false, time: -1 });
    const [_sound, _setSound] = useState(null);
    const [isPlay, setIsPlay] = useState(true);

    const styles = StyleSheet.create({
        container: {
            backgroundColor: "#CE1170",
            height: height / 8,
            flexDirection: 'row',
            alignItems: 'center'
        },
        box: {
            flex: 1,
            marginHorizontal: 15
        },
        title: {
            color: '#fff',
            textAlign: 'center',
            fontSize: 30,
            fontFamily: 'Comic Sans MS Bold'
        },
        timeTitle: {
            fontFamily: 'Comic Sans MS',
            color: '#000',
            fontSize: 18,
            marginTop: 6
        }
    });

    useEffect(() => {
        if (_sound) {
            _sound.stop();
        }

        var sound = new Sound(fileName, null, (error) => {
            if (error) {
                //
            }
            else {
                sound.play((success) => {
                    if (success) {
                        //
                    }
                })
                _setSound(sound);
                setIsPlay(true);

            }
            sound.setVolume(1);
            sound.setNumberOfLoops(-1)
        })
    }, [title])

    const handleControl = () => {
        if (_sound) {
            if (_sound.isPlaying()) {
                _sound.pause();
                setIsPlay(false);
            }
            else {
                _sound.play();
                setIsPlay(true);
            }
            _setSound(_sound)
        }
    }

    useEffect(() => {
        if (modal.time === -1) {
            if (_sound) {
                _sound.setNumberOfLoops(-1);
            }
        }
        else {
            setTimeout(function () {
                onClose();
                _sound.stop();

            }, modal.time * 60000);
        }
    }, [modal.time])

    return (
        title ? (
            <React.Fragment>
                <View style={styles.container}>
                    <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: 15 }}>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => setModal({ ...modal, open: true })}>
                            <Icon name='clock-outline' size={40} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 3 }}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 15 }}>
                        <TouchableOpacity activeOpacity={0.5} onPress={handleControl}>
                            <Icon name={isPlay ? 'pause-circle-outline' : 'play-circle-outline'} size={40} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
                <Portal>
                    <Dialog visible={modal.open} onDismiss={() => setModal({ ...modal, open: false })}>
                        <Dialog.Title>Çalma Süresi</Dialog.Title>
                        <Dialog.Content>
                            <RadioButton.Group onValueChange={newValue => setModal({ ...modal, time: newValue })} value={modal.time}>
                                <RadioButton.Item label="5 Dakika" value={5} />
                                <RadioButton.Item label="15 Dakika" value={15} />
                                <RadioButton.Item label="30 Dakika" value={30} />
                                <RadioButton.Item label="1 Saat" value={60} />
                                <RadioButton.Item label="Sınırsız" value={-1} />
                            </RadioButton.Group>
                        </Dialog.Content>
                        <Dialog.Actions style={{ paddingHorizontal: 20, marginBottom: 5 }}>
                            <Button onPress={() => setModal({ ...modal, open: false })} labelStyle={{ fontFamily: 'Comic Sans MS Bold' }}>Tamam</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>
            </React.Fragment>
        ) : null
    )
}

export default Player;