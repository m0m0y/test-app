import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, TouchableOpacity, } from 'react-native';
import { ThemedView } from '../ThemedView';
import { ThemedText } from '../ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { ColorsWithOpacity, CustomColors } from '@/constants/ColorScheme';
import { useColorScheme } from '@/hooks/useColorScheme';
// import { Colors } from 'react-native/Libraries/NewAppScreen';

import ErrorMessage from '../ErrorMessage';

import * as DocumentPicker from 'expo-document-picker';

// interface SelectedFile {
//   uri: string;
//   name: string;
//   size: number;
//   mimeType: string;
// }

interface FileUploadProps {
    // onUploadComplete?: (response: any) => void;
    // uploadUrl: string;
    selectedFile: string | null;
    // setSelectedFile: (file: SelectedFile | null) => void;
    onPressPickDocument: () => void;
    onPressRemoveFile: () => void;
    errorMesage?: string;
}

export default function FileUpload({ 
    selectedFile, 
    // setSelectedFile,
    onPressPickDocument,
    onPressRemoveFile,
    errorMesage,
}: FileUploadProps) {
    const colorScheme = useColorScheme();
    // const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
    // const [uploading, setUploading] = useState(false);

    // const pickDocument = async () => {
    //     try {
    //         const result = await DocumentPicker.getDocumentAsync({
    //             type: 'application/pdf', // Allow all file types
    //             copyToCacheDirectory: true,
    //         });

    //         if (!result.canceled && result.assets && result.assets.length > 0) {
    //             const file = result.assets[0];
    //             setSelectedFile({
    //                 uri: file.uri,
    //                 name: file.name,
    //                 size: file.size || 0,
    //                 mimeType: file.mimeType || 'application/octet-stream',
    //             });
    //         }
    //     } catch (error) {
    //         console.error('Error picking document:', error);
    //         Alert.alert('Error', 'Failed to pick document');
    //     }
    // };

    // const removeFile = () => {
    //     setSelectedFile(null);
    // }

    // const uploadFile = async () => {
    //     if (!selectedFile) {
    //     Alert.alert('Error', 'Please select a file first');
    //     return;
    //     }

    //     setUploading(true);

    //     try {
    //     // Method 1: Using FileSystem.uploadAsync (Recommended for Expo)
    //     const uploadResult = await FileSystem.uploadAsync(uploadUrl, selectedFile.uri, {
    //         fieldName: 'file',
    //         httpMethod: 'POST',
    //         uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    //         headers: {
    //         'Content-Type': 'multipart/form-data',
    //         },
    //     });

    //     console.log('Upload result:', uploadResult);
        
    //     if (uploadResult.status === 200) {
    //         Alert.alert('Success', 'File uploaded successfully');
    //         onUploadComplete?.(JSON.parse(uploadResult.body));
    //         setSelectedFile(null);
    //     } else {
    //         throw new Error(`Upload failed with status: ${uploadResult.status}`);
    //     }
    //     } catch (error) {
    //     console.error('Upload error:', error);
    //     Alert.alert('Error', 'Failed to upload file');
    //     } finally {
    //     setUploading(false);
    //     }
    // };

    return (
        <ThemedView style={styles.uploadContainer}>
            <ThemedText type="label">
                Upload File
            </ThemedText>

            <ThemedView style={styles.warningMessageWrapper}>
                <ThemedText style={styles.textWarningMessage}>
                    PDF format only
                </ThemedText>

                <ThemedText style={styles.textWarningMessage}>
                    Proof of Appointment or Designation or Oath of Office
                </ThemedText>
            </ThemedView>

            <ThemedView style={styles.uploadWrapper}>
                {selectedFile ? (
                    <ThemedView style={styles.fileInfoWrapper}>
                        <ThemedText type='description'>
                            File: {selectedFile}
                        </ThemedText>

                        <TouchableOpacity>
                            <ThemedText 
                                type='small' 
                                style={{ color: CustomColors.danger }}
                                onPress={onPressRemoveFile}
                            >
                                Remove
                            </ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                ) : ( 
                    <ThemedView style={styles.noFileWrapper}>
                        <ThemedText type='default'>
                            No current file
                        </ThemedText>
                    </ThemedView>
                )}

                <ThemedView style={styles.fileUploadButtonContainer}>
                    <Pressable 
                        style={[
                            styles.uploadButton,
                            { 
                                borderColor: colorScheme === 'dark' ?
                                ColorsWithOpacity(CustomColors.secondary, 0.70) :
                                CustomColors.secondary
                            }
                        ]}
                        onPress={onPressPickDocument}
                    >
                        <Ionicons 
                            name="add"
                            size={30}
                            color={CustomColors.secondary}
                        />
                    </Pressable>
                </ThemedView>

                {/* {selectedFile && (
                    <TouchableOpacity
                        style={[styles.button, styles.uploadButton, uploading && styles.disabledButton]}
                        onPress={uploadFile}
                        disabled={uploading}
                    >
                        <Text style={styles.buttonText}>
                            {uploading ? 'Uploading...' : 'Upload File'}
                        </Text>
                    </TouchableOpacity>
                )} */}
            </ThemedView>

            {errorMesage && (
                <ErrorMessage message={errorMesage} />
            )}
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    uploadContainer: {
        marginVertical: 8
    },

    warningMessageWrapper: { 
        gap: 5,
        // padding: 2, 
        marginBottom: 5,
    },
    textWarningMessage: { 
        backgroundColor: ColorsWithOpacity(CustomColors.warning, 0.15), 
        borderColor: ColorsWithOpacity(CustomColors.warning, 0.20),
        color: CustomColors.warning,
        fontSize: 15,
        padding: 8,
        borderWidth: 1,
    },

    
    uploadWrapper: { 
        flexDirection: 'row', 
        paddingTop: 4, 
        gap: 10, 
        width: '100%',
    },

    fileInfoWrapper: {
        paddingHorizontal: 10,
        borderRadius: 2,
        width: '69%',
        borderWidth: 1,
        borderColor: ColorsWithOpacity(CustomColors.secondary, 0.14),
        backgroundColor: ColorsWithOpacity(CustomColors.secondary, 0.10),
        padding: 5,
        justifyContent: 'center',
    },
    noFileWrapper: {
        paddingHorizontal: 10,
        borderRadius: 2,
        width: '69%',
        borderWidth: 1,
        borderColor: ColorsWithOpacity(CustomColors.secondary, 0.14),
        backgroundColor: ColorsWithOpacity(CustomColors.secondary, 0.10),
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    fileUploadButtonContainer: {
        width: 'auto',
    },
    uploadButton: { 
        borderWidth: 1, 
        // borderColor: CustomColors.secondary,
        borderStyle: 'dashed',
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center', 
        borderRadius: 2,
    },

    errorWrapper: {
        flexDirection: 'row', 
        alignItems: 'center',
        gap: 5
    },
    errorText: {
        color: CustomColors.danger,
    },
})