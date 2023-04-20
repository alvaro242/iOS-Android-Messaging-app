import {
  Alert,
  VStack,
  HStack,
  IconButton,
  CloseIcon,
  Text,
  Center,
  Stack,
} from "native-base";

export function informativeAlert(message) {
  return (
    <Center>
      <Stack space={3} w="80%" maxW="400">
        <Alert w="100%" status="info">
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <HStack space={2} flexShrink={1}>
                <Alert.Icon mt="1" />
                <Text fontSize="md" color="coolGray.800">
                  {message}
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </Alert>
      </Stack>
    </Center>
  );
}

export function errorAlert(message) {
  return (
    <Center>
      <Stack space={3} w="80%" maxW="400">
        <Alert w="100%" status="error">
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <HStack space={2} flexShrink={1}>
                <Alert.Icon mt="1" />
                <Text fontSize="md" color="coolGray.800">
                  {message}
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </Alert>
      </Stack>
    </Center>
  );
}

export function successAlert(message) {
  return (
    <Center>
      <Stack space={3} w="80%" maxW="400">
        <Alert w="100%" status="success">
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <HStack space={2} flexShrink={1}>
                <Alert.Icon mt="1" />
                <Text fontSize="md" color="coolGray.800">
                  {message}
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </Alert>
      </Stack>
    </Center>
  );
}

export function warningAlert(message) {
  return (
    <Center>
      <Stack space={3} w="80%" maxW="400">
        <Alert w="100%" status="warning">
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <HStack space={2} flexShrink={1}>
                <Alert.Icon mt="1" />
                <Text fontSize="md" color="coolGray.800">
                  {message}
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </Alert>
      </Stack>
    </Center>
  );
}
