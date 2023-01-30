import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface ISignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareModal({ isOpen, onClose }: ISignInModalProps) {
  const currentUrl = window.location.href;
  const toast = useToast();
  const onURLButtonClick = () => {
    toast({
      title: "URL copied!",
      description: "Share it!",
      status: "success",
      isClosable: true,
    });
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign in</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack py={"40px"}>
            <Text fontSize={"30px"} fontWeight={"bold"}>
              Share
            </Text>
            <HStack>
              <FacebookShareButton url={currentUrl}>
                <FacebookIcon
                  size={48}
                  round={true}
                  borderRadius={24}
                ></FacebookIcon>
              </FacebookShareButton>
              <TwitterShareButton url={currentUrl}>
                <TwitterIcon
                  size={48}
                  round={true}
                  borderRadius={24}
                ></TwitterIcon>
              </TwitterShareButton>
              <CopyToClipboard text={currentUrl}>
                <Button
                  w={"50px"}
                  h={"50px"}
                  borderRadius={"full"}
                  colorScheme={"gray"}
                  onClick={onURLButtonClick}
                >
                  URL
                </Button>
              </CopyToClipboard>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
