import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Animated } from "react-native"
import {styles} from './styles';
import { updateUser } from '../../services/UserService';

const DescriptionProfile = ({ userUid,userDescription }) => {
  console.log("🚀 ~ DescriptionProfile ~ userDescription:", userDescription , userUid)
  const [description, setDescription] = useState("");

  console.log("🚀 ~ DescriptionProfile ~ description:", description)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [tempDescription, setTempDescription] = useState("")

  const MAX_CHARS = 250

  useEffect(()=>{
    setDescription(userDescription)
  },[userDescription])
  

  const handleEdit = () => {
    setIsEditing(true)
    setTempDescription(description)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setDescription(tempDescription)
  }

  const handleSave = async () => {
    setIsSaving(true);
  
    const user = {
      uid:userUid,
      description,
    };
  
    try {
      await updateUser(user);
    } finally {
      setIsSaving(false); 
      setIsEditing(false)
     }

  };

  const handleTextChange = (text) => {
    if (text.length <= MAX_CHARS) {
      setDescription(text)
    }
  }

  
  
 

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Descripción</Text>

        {!isEditing ? (
          <TouchableOpacity style={styles.editButton} onPress={handleEdit} activeOpacity={0.7}>
            {/* <Feather name="edit-2" size={16} color="#4A80F0" /> */}
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel} disabled={isSaving}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  {/* <MaterialIcons name="save" size={16} color="#FFFFFF" /> */}
                  <Text style={styles.saveButtonText}>Guardar</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={[styles.descriptionContainer, isEditing && styles.descriptionContainerActive]}>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholderTextColor="#9EA0A4"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={description}
          onChangeText={handleTextChange}
          editable={isEditing}
        />

        {description?.length === 0 && !isEditing && (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>Añade una descripción para que los reclutadores te conozcan mejor</Text>
          </View>
        )}
      </View>

      <View style={styles.helperContainer}>
        {isEditing && (
          <>
            <Text style={styles.helperText}>Tu descripción ayudará a conocerte mejor</Text>
            <Text style={[styles.charCount, description?.length > MAX_CHARS * 0.8 && styles.charCountWarning]}>
              {description?.length}/{MAX_CHARS}
            </Text>
          </>
        )}
      </View>
    </View>
  )
}



export default DescriptionProfile

