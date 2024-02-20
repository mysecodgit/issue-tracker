"use client";

import { Skeleton } from "@/app/components";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="border-b px-5 py-5 ">
      <Container>
        <Flex justify="between">
          <div className="flex items-center">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </div>
          <AuthStatus />
        </Flex>
      </Container>
    </div>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <ul className="flex items-center gap-4 ml-10">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classnames({
              "my-nav-link": true,
              "!text-zinc-900": link.href == currentPath,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated")
    return (
      <Link href="/api/auth/signin" className="my-nav-link">
        Login
      </Link>
    );

  return (
    <Box className="ml-4">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Flex align="center" gap="2" className="cursor-pointer">
            <Avatar
              src={session!.user!.image!}
              fallback="Avatar"
              radius="full"
              size="2"
              referrerPolicy="no-referrer"
            />
            <Text className="hidden md:flex">{session!.user?.name}</Text>
          </Flex>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="mt-2">
          <DropdownMenu.Label>{session!.user?.email}</DropdownMenu.Label>
          <Link href="/api/auth/signout">
            <DropdownMenu.Item className="cursor-pointer">
              Logout
            </DropdownMenu.Item>
          </Link>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default Navbar;
