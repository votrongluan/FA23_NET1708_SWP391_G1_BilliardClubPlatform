import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    useDisclosure
} from "@chakra-ui/react";
import {useRef} from "react";

export default function ConfirmationDialog({onConfirm, title, color}) {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const cancelRef = useRef()

    return (
        <>
            <Button colorScheme={color ? color : 'red'} onClick={onOpen}>{title}</Button>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay/>

                <AlertDialogContent>
                    <AlertDialogHeader>Xác nhận</AlertDialogHeader>
                    <AlertDialogCloseButton/>
                    <AlertDialogBody>
                        Bạn có chắc chắn muốn thực hiện thao tác này?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Không
                        </Button>
                        <Button colorScheme='telegram' ml={3} onClick={onConfirm}>
                            Có
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}