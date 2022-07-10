import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Modal } from "react-native";
import { popupStyles } from "../../css/components/popup/Popup";
import { appRouting } from "../../exports/navigation/app.routing";
import { NotificationService } from "../../services/notifications/Notification.service";
import { StorageService } from "../../services/storage/Storage.service";
import Loader from "../../components/Loader";
import PopupComponent from "../../components/popup/Popup";

const SignoutScreen = ({ navigation }: any) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [load, setLoad] = useState<boolean>(false);

    const hidePopup = () => {
        setModalVisible(!modalVisible);
        navigateTo(appRouting.accueil);
    };
    const signout = () => {
        setLoad(true);
        setModalVisible(false);
        StorageService.deleteUserFromStorage("userInformations")
            .then(() => {
                setLoad(false);
                navigateTo(appRouting.signin);
            })
            .catch(() => {
                NotificationService.failed("error", "Déconnexion", "Déconnexion échouée...");
                setTimeout(() => {
                    navigateTo(appRouting.home);
                }, 2000);
            });
    };

    const navigateTo = (url: string) => {
        navigation.navigate(url);
    };

    useEffect(() => {
        setModalVisible(true);
    }, [modalVisible]);

    return (
        <>
            {load ? (
                <Loader />
            ) : (
                <PopupComponent
                    sentence={"Voulez-vous vraiment vous déconnecter ?"}
                    modalVisible={modalVisible}
                    customFunction={signout}
                    hideModal={hidePopup}
                    actionButtonContent={"Déconnexion"}
                />
                // <Modal animationType="slide" transparent={true} visible={modalVisible}>
                //     <View style={popupStyles.modalContainer}>
                //         <View style={popupStyles.modalView}>
                //             <Text style={popupStyles.modalTitle}>Voulez-vous vraiment vous déconnecter ?</Text>
                //             <View style={popupStyles.modalButtonsContainer}>
                //                 <TouchableOpacity
                //                     onPress={() => {
                //                         onLogOut();
                //                     }}
                //                     style={popupStyles.sendModalButton}
                //                 >
                //                     <Text style={popupStyles.modalButtonContent}>Déconnexion</Text>
                //                 </TouchableOpacity>
                //                 <TouchableOpacity onPress={hidePopup} style={popupStyles.cancelModalButton}>
                //                     <Text style={popupStyles.modalButtonContent}>Annuler</Text>
                //                 </TouchableOpacity>
                //             </View>
                //         </View>
                //     </View>
                // </Modal>
            )}
        </>
    );
};
export default SignoutScreen;
