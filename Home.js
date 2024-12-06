import React from 'react';
import { StatusBar, Button, Text, View, TouchableOpacity, Alert } from 'react-native';
import { datasource } from './Data';
import { calculateGPA, calculateBetterGPA } from './Calculate';

const Home = ({ navigation }) => {
    const flattenedData = datasource
        .flatMap((section, sectionIndex) =>
            section.data.map((item, itemIndex) => ({
                ...item,
                bgColor: section.bgColor,
                sectionIndex,
                itemIndex,
            }))
        )
        .sort((a, b) => a.module.localeCompare(b.module));

    const renderItem = (item) => (
        <TouchableOpacity
            key={`${item.sectionIndex}-${item.itemIndex}`}
            style={{
                borderWidth: 1,
                padding: 10,
                alignItems: 'center',
                backgroundColor: item.bgColor,
            }}
            onPress={() =>
                navigation.navigate('Edit', {
                    sectionIndex: item.sectionIndex,
                    itemIndex: item.itemIndex,
                })
            }
        >
            <Text style={{ fontSize: 15, color: '#fff', textAlign: 'center' }}>
                Module: {item.module} - Grade: {item.grade}
            </Text>
        </TouchableOpacity>
    );

    const handleCalculateGPA = () => {
        const gpa = calculateGPA(flattenedData);

        if (gpa === null) {
            Alert.alert('Zero', 'No GPA selected.');
        } else {
            Alert.alert('GPA Calculated', `Your GPA is: ${gpa.toFixed(2)}`);
        }
    };

    const handleCalculateBetterGPA = () => {
        const gpa = calculateBetterGPA(flattenedData);

        if (gpa === null) {
            Alert.alert('Zero', 'No GPA selected.');
        } else {
            Alert.alert('Selected GPA Calculated', `Your GPA is: ${gpa.toFixed(2)}`);
        }
    };


    return (
        <View style={{ flex: 1, padding: 10 }}>
            <StatusBar />

            <View style={{ flexDirection: 'column', marginBottom: 10 }}>
                {flattenedData.map((item) => renderItem(item))}
            </View>

            <View style={{ paddingVertical: 10 }}>
                <Button title="ADD NEW MODULE" onPress={() => navigation.navigate('Add')} />
            </View>
            <View style={{ paddingVertical: 10 }}>
                <Button title="CALCULATE GPA" onPress={handleCalculateGPA} />
            </View>
            <View style={{ paddingVertical: 10 }}>
                <Button title="CALCULATE GPA ONLY IF SELECTED" onPress={handleCalculateBetterGPA} />
            </View>
        </View>
    );
};

export default Home;
