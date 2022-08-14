import type { FC } from "react";

import { Link, Routes } from "blitz";

import { HStack, Heading } from "@chakra-ui/layout";

import LogoIcon from "app/icons/logo";
import LogoIcon2 from "app/icons/logo2";

const HeaderLogo: FC = () => {
  return (
    <Link href={Routes.HomePage()} passHref>
      <HStack as="a">
        <LogoIcon w={8} h={8} />
        <Heading size="md" display={{ base: "none", md: "block" }}>
          Pack your pack
        </Heading>
        <LogoIcon2 w={8} h={8} />
      </HStack>
    </Link>
  );
};

export default HeaderLogo;
