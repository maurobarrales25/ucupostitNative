import React, { useState } from 'react';
import {View,Text,TextInput,TouchableOpacity,
        StyleSheet, ScrollView,Alert, ActionSheetIOS, KeyboardAvoidingView,TouchableWithoutFeedback,Keyboard, Platform,
} from 'react-native';
import { CreatePostService} from '../../axios/PostService';

export default function CreatePost  (){
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('General');
    const [content, setContent] = useState('');

    const categories = [
        'General',
        'Sistemas',
        'Comunicación',
        'Psicología',
        'Cancelar',
    ];

    const showCategoryPicker = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: categories,
                cancelButtonIndex: categories.length - 1,
            },
            (buttonIndex) => {
                if (buttonIndex !== categories.length - 1) {
                    setCategory(categories[buttonIndex]);
                }
            }
        );
    };


    const handleSubmit = async () => {
        if (!title || !content) {
            Alert.alert('Error', 'Por favor, completa todos los campos');
            return;
        }
        
        const postData = {
            user: {
                auth0id: 'google-oauth2116624442099130403644', 
            },
            title: title,
            content: content,  
            category: category  
        };

        try {
            const response = await CreatePostService(postData);

            console.log('Respuesta del servidor:', response);
            
            Alert.alert('Post creado', 'El post se ha creado correctamente');
            
            setTitle('');
            setContent('');
            setCategory('General');
        } catch (error) {
            console.error('Error al crear el post:', error);
            Alert.alert('Error', 'Ha ocurrido un error al crear el post');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.formContainer}>
                        <Text style={styles.label}>Título:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Escribe el título..."
                            placeholderTextColor="black"
                            value={title}
                            onChangeText={setTitle}
                        />

                        <Text style={styles.label}>Selecciona la Categoría:</Text>
                        <TouchableOpacity
                            style={styles.pickerButton}
                            onPress={showCategoryPicker}
                        >
                            <Text>{category}</Text>
                        </TouchableOpacity>

                        <TextInput
                            style={[styles.input, styles.contentInput]}
                            placeholder="Escribe el contenido aquí..."
                            value={content}
                            onChangeText={setContent}
                            multiline
                            numberOfLines={10}
                        />

                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Crear Post</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
    },
    input: {
        backgroundColor: 'white',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        fontSize: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: 'white',
    },
    pickerButton: {
        backgroundColor: 'white',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    contentInput: {
        height: 200,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

