{/* <Button onClick={onOpen}>Contact Us</Button>
            <Drawer isOpen={isOpen} onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Contact Us</DrawerHeader>
                <DrawerBody>
                  <Stack spacing={4}>
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Enter your name"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <Input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your email"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Contact Method</FormLabel>
                      <Select
                        value={contactMethod}
                        onChange={e => setContactMethod(e.target.value)}

                        placeholder="Select a contact method"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Message</FormLabel>
                      <Textarea
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Enter your message"
                      />
                      <FormHelperText>
                        We will do our best to respond within 24 hours.
                      </FormHelperText>
                    </FormControl>
                    <Button onClick={() => {
                      toast({
                        title: "Message sent.",
                        description: "Thank you for contacting us. We will respond to your message as soon as possible.",
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                      });
                      onClose();
                    }}>
                      Send Message
                    </Button>
                  </Stack>
                </DrawerBody>
              </DrawerContent>
            </Drawer> */}

const teste = () => {
  return (
    <div></div>
  )
}