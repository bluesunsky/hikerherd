import type { FC } from "react";

import { useContext } from "react";

import { useColorModeValue } from "@chakra-ui/react";
import { Box, Heading, Container, HStack } from "@chakra-ui/layout";

import EditorHtml from "app/components/editor/components/editor-html";
import useEditorHtml from "app/components/editor/hooks/use-editor-html";
import UserTag from "app/components/user-tag";

import packContext from "../contexts/pack-context";

const PackNotes: FC = () => {
  const { user, pack } = useContext(packContext);

  const html = useEditorHtml(pack.notes || "", {
    image: true,
    blockquote: true,
    heading: true,
    horizontalRule: true,
  });

  return (
    <Box>
      <HStack
        py={4}
        borderBottom="1px solid"
        borderTop="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.600")}
      >
        <Container maxW="600px">
          <HStack maxW="600px" justifyContent="space-between">
            <Heading size="md"></Heading>
            {user && <UserTag user={user} />}
          </HStack>
        </Container>
      </HStack>

      {pack.notes && (
        <Container maxW="600px" py={8}>
          <EditorHtml
            fontSize="md"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </Container>
      )}
    </Box>
  );
};

export default PackNotes;
