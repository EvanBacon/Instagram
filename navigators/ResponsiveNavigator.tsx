import { Icon } from "@/navigators/icon";
import { makeIcon, TabBarIcon } from "@/navigators/TabBarIcon";
import { TabbedNavigator } from "@/navigators/TabbedSlot";
import cssStyles from "@/styles/root-layout.module.scss";
import { Pressable, StyleSheet } from "@bacons/react-views";
import { Div, H1, Header, Nav, Span } from "@expo/html-elements";
import { NavigationHelpersContext } from "@react-navigation/native";
import { Link } from "expo-router";
import React from "react";
import { Platform, useWindowDimensions, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DARK = "rgba(41, 41, 41, 1)";

function HeaderLogo() {
  const isLargeHorizontal = useWidth(1264);
  const isSmallHorizontal = useWidth(768);

  return (
    <Link
      style={[
        { paddingVertical: 20, alignItems: "flex-start" },
        Platform.select({
          default: isSmallHorizontal &&
            !isLargeHorizontal && {
              paddingTop: 0,
              minHeight: 96,
              marginTop: 12,
              paddingBottom: 23,
              height: 96,
            },
          web: cssStyles.headerLink,
        }),
      ]}
      href="/"
      asChild
    >
      <Pressable>
        {({ hovered }) => (
          <H1
            style={[
              {
                margin: 0,
                display: "flex",
                // flex: 1,
                alignItems: "center",
                padding: 12,
                marginVertical: 4,
                borderRadius: 4,
                transitionProperty: ["background-color", "box-shadow"],
                transitionDuration: "200ms",
                backgroundColor: hovered ? "rgba(0, 0, 0, 0.1)" : "transparent",
              },
            ]}
          >
            <Icon
              style={[
                Platform.select({
                  default: !isLargeHorizontal && { display: "none" },
                  web: cssStyles.wideVisible,
                }),
              ]}
              name="logo"
              fill={DARK}
            />
            <Icon
              style={[
                Platform.select({
                  default: isLargeHorizontal && { display: "none" },
                  web: cssStyles.wideHidden,
                }),
              ]}
              name="logo-small"
              fill={DARK}
            />
          </H1>
        )}
      </Pressable>
    </Link>
  );
}

function useWidth(size) {
  if (typeof window === "undefined") {
    return true;
  }
  const { width } = useWindowDimensions();
  if (Platform.OS === "ios" || Platform.OS === "android") {
    return false;
  }
  return width >= size;
}

const NAV_MEDIUM_WIDTH = 244;

const jsStyles = StyleSheet.create({
  sideBar: {
    minWidth: 72,
    width: 72,
  },
});

function SideBar({ visible }) {
  const isLarge = useWidth(1265);

  return (
    <Div
      style={[
        jsStyles.sideBar,

        ...Platform.select({
          default: [
            !visible && {
              display: "none",
            },
            isLarge && {
              minWidth: NAV_MEDIUM_WIDTH,
            },
          ],

          web: [cssStyles.largeVisible, cssStyles.sideBar],
        }),
      ]}
    >
      <Div
        style={[
          {
            position: Platform.select({ web: "fixed", default: "absolute" }),
            height: "100%",
            maxHeight: "100%",
            alignItems: "stretch",
            borderRightWidth: 1,
            borderRightColor: "rgb(230, 230, 230)",
            minWidth: 72,
            width: 72,
            paddingTop: 8,
            paddingHorizontal: 12,
            paddingBottom: 20,
          },
          ...Platform.select({
            default: [
              isLarge &&
                ({
                  width: NAV_MEDIUM_WIDTH,
                  minWidth: NAV_MEDIUM_WIDTH,
                  alignItems: "flex-start",
                } as const),
            ],
            web: [cssStyles.sideBarInner],
          }),
        ]}
      >
        <Header
          zIndex={3}
          style={[
            {
              flex: 1,
              alignItems: "stretch",
              height: "100%",
              justifyContent: "space-between",
            },
            Platform.select({
              default: !isLarge && {
                alignItems: "center",
              },
              web: cssStyles.sideBarHeader,
            }),
          ]}
        >
          <HeaderLogo />

          <Nav style={{ gap: 4, flex: 1 }}>
            <SideBarTabItem name="index" icon={makeIcon("home")}>
              Home
            </SideBarTabItem>
            <SideBarTabItem name="explore" icon={makeIcon("explore")}>
              Explore
            </SideBarTabItem>
            {/* Divider */}
          </Nav>
          <Div>
            <SideBarTabItem name="/more" icon={makeIcon("more")}>
              More
            </SideBarTabItem>
          </Div>
        </Header>
      </Div>
    </Div>
  );
}

function TabBar({ visible }) {
  return (
    <Div
      style={[
        {
          paddingBottom: useSafeAreaInsets().bottom,
        },
        Platform.select({
          default: {
            display: visible ? "flex" : "none",
          },
          web: cssStyles.smallVisible,
        }),
      ]}
    >
      <Nav
        style={{
          flexDirection: "row",
          borderTopWidth: 1,
          borderTopColor: "rgba(230, 230, 230, 1)",
          justifyContent: "space-around",
          alignItems: "center",
          height: 49,
          paddingHorizontal: 16,
        }}
      >
        {[
          { name: "index", icon: "home" },
          { name: "explore", icon: "explore" },
          { name: "/more", icon: "more" },
        ].map((tab, i) => (
          <TabBarItem key={i} name={tab.name}>
            {({ focused, pressed, hovered }) => (
              <TabBarIcon
                color="black"
                style={[
                  {
                    paddingHorizontal: 8,
                  },
                  Platform.select({
                    web: {
                      transitionDuration: "100ms",
                      transform: hovered ? [{ scale: 1.1 }] : [],
                    },
                  }),
                  pressed && {
                    transform: [{ scale: 0.9 }],
                    opacity: 0.8,
                  },
                ]}
                name={tab.icon}
                focused={focused}
              />
            )}
          </TabBarItem>
        ))}
      </Nav>
    </Div>
  );
}

function useIsTabSelected(name: string): boolean {
  const navigation = React.useContext(NavigationHelpersContext)!;

  const state = navigation.getState();
  const current = state.routes.find((route, i) => state.index === i);

  return current.name === name;
}

function TabBarItem({
  children,
  name,
  style,
}: {
  children?: any;
  name: string;
  style?: ViewStyle;
}) {
  const focused = useIsTabSelected(name);

  if (name.startsWith("/") || name.startsWith(".")) {
    return (
      <Link href={name} asChild style={style}>
        <Pressable>{(props) => children({ ...props, focused })}</Pressable>
      </Link>
    );
  }

  return (
    <TabbedNavigator.Link name={name} asChild style={style}>
      <Pressable>{(props) => children({ ...props, focused })}</Pressable>
    </TabbedNavigator.Link>
  );
}

function SideBarTabItem({
  children,
  icon,
  name,
}: {
  children: string;
  icon: (props: { focused?: boolean; color: string }) => JSX.Element;
  name: string;
}) {
  const isLarge = useWidth(1265);

  return (
    <TabBarItem
      name={name}
      accessibilityHasPopup="menu"
      style={{
        paddingVertical: 4,
        width: "100%",
      }}
    >
      {({ focused, hovered }) => (
        <Div
          style={[
            {
              padding: 12,
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 999,
              transitionProperty: ["background-color", "box-shadow"],
              transitionDuration: "200ms",
            },
            hovered && {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          ]}
        >
          <Div
            style={[
              {
                transitionTimingFunction: "cubic-bezier(0.17, 0.17, 0, 1)",
                transitionProperty: ["transform"],
                transitionDuration: "150ms",
              },
              hovered && {
                transform: [{ scale: 1.1 }],
              },
            ]}
          >
            {icon({
              focused,
              color: "#000",
            })}
          </Div>

          <Span
            style={[
              {
                color: "#000",
                fontSize: 16,
                marginLeft: 16,
                marginRight: 16,
                lineHeight: 24,
              },
              Platform.select({
                default: {
                  display: isLarge ? "flex" : "none",
                },
                web: cssStyles.sideBarTabItemText,
              }),
              focused && {
                fontWeight: "bold",
              },
            ]}
          >
            {children}
          </Span>
        </Div>
      )}
    </TabBarItem>
  );
}

export function ResponsiveNavigator() {
  const isRowLayout = useWidth(768);

  return (
    <TabbedNavigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: "black",
      }}
    >
      <Div
        style={[
          {
            flex: 1,
          },
          Platform.select({
            default: {
              flexDirection: isRowLayout ? "row" : "column",
            },
            web: cssStyles.container,
          }),
        ]}
      >
        <SideBar visible={isRowLayout} />
        <AppHeader visible={!isRowLayout} />
        <TabbedNavigator.Slot />
        <TabBar visible={!isRowLayout} />
      </Div>
    </TabbedNavigator>
  );
}

function AppHeader({ visible }) {
  const { top } = useSafeAreaInsets();
  const height = 60 + top;
  return (
    <>
      <Div style={{ height }} />
      <Header
        style={[
          Platform.select({
            default: !visible && {
              display: "none",
            },
            web: cssStyles.smallVisible,
          }),
          {
            paddingTop: top,
            zIndex: 10,
            backgroundColor: "white",
            position: Platform.select({ web: "fixed", default: "absolute" }),
            top: 0,
            left: 0,
            right: 0,
            height: height,
            paddingHorizontal: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: "rgb(230, 230, 230)",
          },
        ]}
      >
        <Icon name="logo" fill={DARK} />
      </Header>
    </>
  );
}
