import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import Theme from '../core/theme';
import { IconButton } from 'react-native-paper';

function SoundCard({ title, onSelect, deletable = false, onDelete }) {
    const { colors } = Theme;
    const { width, height } = Dimensions.get('window');

    const styles = StyleSheet.create({
        container: {
            marginHorizontal: 7.5,
            flexDirection: 'row'
        },
        box: {
            flex: 1,
            borderRadius: 10,
            backgroundColor: colors.primary,
            marginHorizontal: 7.5,
            marginVertical: 7.5,
            height: (width - 15) / 4
        },
        title: {
            fontSize: 25,
            position: 'absolute',
            bottom: 0,
            margin: 10,
            color: '#fff',
            fontFamily: 'Comic Sans MS Bold',
            width: 240
        },
        icon: {
            alignSelf: 'flex-end',
            margin: 10
        },
        delete: {
            position: 'absolute'
        }
    });

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onSelect}>
            <View style={styles.container}>
                <View style={styles.box}>
                    {deletable ? (
                        <IconButton icon="delete" style={styles.delete} color='#E47A79' size={26} onPress={onDelete} />
                    ) : null}

                    <Image style={styles.icon} source={require('../assets/images/musical-note.png')} />
                    <Text style={styles.title}>{title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default SoundCard;