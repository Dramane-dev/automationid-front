import React from "react";
import { Text, View, TouchableOpacity, Modal } from "react-native";
import { popupStyles } from "../../css/components/popup/Popup";

const PopupComponent = ({
    navigation,
    modalVisible,
    sentence,
    customFunction,
    hideModal,
    actionButtonContent,
}: any) => {
    return (
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
            <View style={popupStyles.modalContainer}>
                <View style={popupStyles.modalView}>
                    <Text style={popupStyles.modalTitle}>{sentence}</Text>
                    <View style={popupStyles.modalButtonsContainer}>
                        <TouchableOpacity
                            onPress={() => {
                                customFunction();
                            }}
                            style={popupStyles.sendModalButton}
                        >
                            <Text style={popupStyles.modalButtonContent}>{actionButtonContent}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={hideModal} style={popupStyles.cancelModalButton}>
                            <Text style={popupStyles.modalButtonContent}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
export default PopupComponent;
