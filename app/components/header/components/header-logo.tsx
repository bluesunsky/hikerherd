import type { FC } from "react";

import { Link, Routes } from "blitz";

import { HStack, Heading } from "@chakra-ui/layout";

import LogoIcon from "app/icons/logo";

const HeaderLogo: FC = () => {
  return (
    <Link href={Routes.HomePage()} passHref>
      <HStack as="a">
        <LogoIcon w={8} h={8} />
        <Heading size="md" display={{ base: "none", md: "block" }}>
          Pack your pack
        </Heading>
      </HStack>
    </Link>
  );
};

export default HeaderLogo;
