import React, { useState } from 'react';
import { datasource } from './Data';
import { TextInput, View, Text, Button, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Add = ({ navigation }) => {
    const [module, setModule] = useState('');
    const [grade, setGrade] = useState('D');
    const [type, setType] = useState('on');

    const handleSubmit = () => {

        const newItem = { module: module.trim(), grade: grade };
        const sectionIndex = type === 'on' ? 1 : 0;

        datasource[sectionIndex].data.push(newItem);

        Alert.alert('Done!', 'Added.');
        navigation.navigate('Home');
    };

    return (
        <View style={{ padding: 10 }}>
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Module:</Text>
                <TextInput
                    style={{ borderWidth: 1, padding: 5, marginBottom: 10 }}
                    placeholder="Enter module name"
                    onChangeText={(text) => setModule(text)}
                />
            </View>

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Grade:</Text>
                <RNPickerSelect
                    value={grade}
                    onValueChange={(value) => setGrade(value)}
                    items={[
                        { label: 'A', value: 'A' },
                        { label: 'B', value: 'B' },
                        { label: 'C', value: 'C' },
                        { label: 'D', value: 'D' },
                    ]}
                />
            </View>

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Calculate:</Text>
                <RNPickerSelect
                    value={type}
                    onValueChange={(value) => setType(value)}
                    items={[
                        { label: 'Calculate', value: 'on' },
                        { label: 'Ignore', value: 'off' },
                    ]}
                />
            </View>

            <Button title="SUBMIT" onPress={handleSubmit} />
        </View>
    );
};

export default Add;
