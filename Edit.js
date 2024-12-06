import React, { useState } from 'react';
import { datasource } from './Data';
import { View, Text, Button, Alert, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Edit = ({ navigation, route }) => {
    const { sectionIndex, itemIndex } = route.params;
    const currentItem = datasource[sectionIndex]?.data[itemIndex];


    const [module, setModule] = useState(currentItem.module);
    const [grade, setGrade] = useState(currentItem.grade);
    const [type, setType] = useState(sectionIndex === 1 ? 'on' : 'off');

    const handleSave = () => {


        const newSectionIndex = type === 'on' ? 1 : 0;
        const updatedItem = { module: module.trim(), grade: grade };

        datasource[sectionIndex].data.splice(itemIndex, 1);

        datasource[newSectionIndex].data.push(updatedItem);

        Alert.alert('Done!', 'Changed.');
        navigation.navigate('Home');
    };

    const handleDelete = () => {
        Alert.alert('Confirm Deletion', 'Are you sure you want to delete this item?', [
            {
                text: 'Yes',
                onPress: () => {
                    datasource[sectionIndex].data.splice(itemIndex, 1);
                    Alert.alert('Success', 'Module deleted successfully.');
                    navigation.navigate('Home');
                },
            },
            { text: 'No' },
        ]);
    };

    return (
        <View style={{ padding: 10 }}>
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Module:</Text>
                <TextInput
                    style={{ borderWidth: 1, padding: 5, marginBottom: 10 }}
                    value={module}
                    onChangeText={(text) => setModule(text)}
                />
            </View>

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Grade:</Text>
                <RNPickerSelect
                    style={{
                        inputAndroid: { borderWidth: 1, padding: 5, marginBottom: 10 },
                    }}
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
                    style={{
                        inputAndroid: { borderWidth: 1, padding: 5, marginBottom: 10 },
                    }}
                    value={type}
                    onValueChange={(value) => setType(value)}
                    items={[
                        { label: 'Calculate', value: 'on' },
                        { label: 'Ignore', value: 'off' },
                    ]}
                />
            </View>

            <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ margin: 10, flex: 1 }}>
                    <Button title="SAVE" onPress={handleSave} />
                </View>
                <View style={{ margin: 10, flex: 1 }}>
                    <Button title="DELETE" onPress={handleDelete} />
                </View>
            </View>
        </View>
    );
};

export default Edit;
