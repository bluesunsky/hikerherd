import type { FC } from "react";

import { Link, Routes, useMutation } from "blitz";
import { Suspense } from "react";

import { useTranslation } from "react-i18next";
import { Button } from "@chakra-ui/button";
import { Avatar } from "@chakra-ui/avatar";
import { Fade } from "@chakra-ui/transition";
import { Menu, MenuList, MenuItem, MenuButton } from "@chakra-ui/menu";
import Icon from "@chakra-ui/icon";
import { SkeletonCircle } from "@chakra-ui/skeleton";
import { FaChevronDown, FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useToast } from "@chakra-ui/react";

import useCurrentUser from "app/apps/users/hooks/use-current-user";
import logoutMutation from "app/apps/auth/mutations/logout-mutation";
import getAvatarUrl from "app/apps/users/helpers/get-avatar-url";

const UserMenuLoader: FC = () => (
  <Button
    size="sm"
    variant="ghost"
    px={1}
    rightIcon={<Icon pr={1} as={FaChevronDown} />}
  >
    <SkeletonCircle size="6" />
  </Button>
);

const UserMenuButton: FC = () => {
  const user = useCurrentUser();

  return (
    <Fade in>
      <MenuButton
        as={Button}
        size="sm"
        variant="ghost"
        px={1}
        rightIcon={<Icon pr={1} as={FaChevronDown} />}
      >
        <Avatar size="xs" src={getAvatarUrl(user, 100)} />
      </MenuButton>
    </Fade>
  );
};

const HeaderUserMenu: FC = () => {
  const [logout] = useMutation(logoutMutation);
  const user = useCurrentUser({ suspense: false });
  const { t } = useTranslation();
  const toast = useToast();

  return (
    <Suspense fallback={<UserMenuLoader />}>
      <Menu>
        <UserMenuButton />

        <MenuList>
          {user && (
            <Link
              href={Routes.ProfilePage({ username: user.username })}
              passHref
            >
              <MenuItem as="a" icon={<FaUser />}>
                {t("Profile", "My profile")}
              </MenuItem>
            </Link>
          )}
          <Link href={Routes.PreferencesPage()} passHref>
            <MenuItem as="a" icon={<FaCog />}>
              {t("Preferences", "My preferences")}
            </MenuItem>
          </Link>
          <MenuItem
            as="button"
            onClick={() =>
              logout().then(() =>
                toast({
                  title: t("LogoutSuccess", "You have been logged out"),
                  status: "success",
                })
              )
            }
            icon={<FaSignOutAlt />}
          >
            {t("Logout", "Logout")}
          </MenuItem>
        </MenuList>
      </Menu>
    </Suspense>
  );
};

export default HeaderUserMenu;
